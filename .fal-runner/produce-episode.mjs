import { spawn } from "node:child_process";
import { promises as fs } from "node:fs";
import {
  basename,
  dirname,
  isAbsolute,
  join,
  relative,
  resolve,
} from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";
import ffprobeStatic from "ffprobe-static";
import {
  billing,
  configureFal,
  parseEnv,
  requestJson,
  runVeoJob,
  sleep,
  veoEndpointUrl,
} from "./veo-client.mjs";

const root = process.cwd();
const runnerDir = dirname(fileURLToPath(import.meta.url));
const replicateModel = "minimax/speech-02-hd";
const replicateVersion = "b2c687e53557eee08b35b59620f88750671e97b9a91f351ea6797ac838a0773d";
const replicatePricePerThousandInputTokensUsd = 0.10;
const veoPricePerSecondUsd = 0.15;
const dryRun = process.argv.includes("--dry-run");
const manifestArg = process.argv.find((arg, index) => index > 1 && !arg.startsWith("--"));

if (!manifestArg) {
  console.error("缺少manifest路徑。用法：node produce-episode.mjs <manifest.json> [--dry-run]");
  process.exit(1);
}

const manifestPath = isAbsolute(manifestArg) ? manifestArg : join(root, manifestArg);
const manifestDir = dirname(manifestPath);

function resolveManifestPath(p) {
  if (!p) return null;
  return isAbsolute(p) ? p : join(manifestDir, p);
}

function parseDurationSeconds(value) {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) return value;
  if (typeof value === "string") {
    const match = value.trim().match(/^(\d+(?:\.\d+)?)s?$/i);
    if (match) return Number(match[1]);
  }
  return 4;
}

function quoteFilterPath(filePath) {
  return filePath.replace(/\\/g, "/").replace(/:/g, "\\:").replace(/'/g, "\\'");
}

function normalizeCaptionText(text, maxCharsPerLine) {
  if (!text) return "";
  const sourceLines = String(text).replace(/\r\n/g, "\n").split("\n");
  const lines = [];
  for (const sourceLine of sourceLines) {
    let current = "";
    for (const char of sourceLine.trim()) {
      current += char;
      if (current.length >= maxCharsPerLine) {
        lines.push(current);
        current = "";
      }
    }
    if (current) lines.push(current);
  }
  return lines.join("\n");
}

function runProcess(command, args, { cwd = root, timeoutMs = 30 * 60 * 1000 } = {}) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(command, args, { cwd, windowsHide: true });
    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      reject(new Error(`${basename(command)} timed out after ${Math.round(timeoutMs / 60000)} minutes`));
    }, timeoutMs);
    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      if (code === 0) resolvePromise({ stdout, stderr });
      else reject(new Error(`${basename(command)} exited ${code}: ${stderr || stdout}`));
    });
  });
}

async function ffprobeDuration(filePath) {
  const probePath = ffprobeStatic.path;
  const { stdout } = await runProcess(probePath, [
    "-v",
    "error",
    "-show_entries",
    "format=duration",
    "-of",
    "default=noprint_wrappers=1:nokey=1",
    filePath,
  ]);
  const value = Number(stdout.trim());
  if (!Number.isFinite(value)) throw new Error(`無法讀取音訊長度：${filePath}`);
  return value;
}

async function downloadFile(url, outputPath, token = null) {
  const response = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!response.ok) {
    throw new Error(`下載失敗 ${response.status} ${response.statusText}: ${url}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  await fs.mkdir(dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, Buffer.from(arrayBuffer));
  const stat = await fs.stat(outputPath);
  return stat.size;
}

async function createReplicatePrediction(input, token) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      return await requestJson("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Prefer: "wait=60",
        },
        body: JSON.stringify({
          version: replicateVersion,
          input,
        }),
      });
    } catch (error) {
      if (!String(error.message).startsWith("429") || attempt === 4) throw error;
      await sleep((attempt + 1) * 10000);
    }
  }
}

async function pollReplicatePrediction(prediction, token) {
  let current = prediction;
  const startedAt = Date.now();
  const timeoutMs = 12 * 60 * 1000;
  while (!["succeeded", "failed", "canceled"].includes(current.status)) {
    if (Date.now() - startedAt > timeoutMs) {
      throw new Error(`Replicate TTS timed out: ${current.id}`);
    }
    await sleep(5000);
    current = await requestJson(current.urls?.get || `https://api.replicate.com/v1/predictions/${current.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  if (current.status !== "succeeded") {
    throw new Error(`Replicate TTS ${current.status}: ${current.error || current.logs || current.id}`);
  }
  return current;
}

function outputUrlFromReplicate(prediction) {
  const output = prediction.output;
  if (typeof output === "string") return output;
  if (Array.isArray(output)) {
    const found = output.find((item) => typeof item === "string");
    if (found) return found;
  }
  if (typeof output?.url === "string") return output.url;
  throw new Error(`Replicate結果沒有可下載音檔URL：${JSON.stringify(output)}`);
}

async function generateNarration(job, token, narrationPath) {
  const input = {
    text: job.narration.text,
    voice_id: job.narration.voice_id,
    speed: 0.95,
    language_boost: "Chinese",
    emotion: job.narration.emotion === "auto" ? "calm" : job.narration.emotion,
  };
  const created = await createReplicatePrediction(input, token);
  const prediction = await pollReplicatePrediction(created, token);
  const url = outputUrlFromReplicate(prediction);
  const bytes = await downloadFile(url, narrationPath, token);
  return {
    success: true,
    predictionId: prediction.id,
    outputUrl: url,
    outputPath: narrationPath,
    bytes,
    estimatedCostUsd: (String(job.narration.text).length / 1000) * replicatePricePerThousandInputTokensUsd,
  };
}

async function renderShot(job, paths) {
  await fs.mkdir(dirname(paths.captionZh), { recursive: true });
  await fs.writeFile(paths.captionZh, normalizeCaptionText(job.caption?.zh || "", 13), "utf8");
  await fs.writeFile(paths.captionEn, normalizeCaptionText(job.caption?.en || "", 28), "utf8");

  const clipDuration = await ffprobeDuration(job.outputPath);
  if (paths.narration) {
    const narrationDuration = await ffprobeDuration(paths.narration);
    if (narrationDuration > clipDuration + 0.2) {
      throw new Error(
        `旁白長度 ${narrationDuration.toFixed(2)}s 超過影片 ${clipDuration.toFixed(2)}s；依SOP不自動裁切，需人工決定延長畫面或精簡文案`,
      );
    }
  }

  const videoFilters = [
    `trim=duration=${clipDuration.toFixed(3)}`,
    "setpts=PTS-STARTPTS",
  ];
  if (job.caption?.zh) {
    videoFilters.push(
      `drawtext=fontfile='C\\:/Windows/Fonts/msjh.ttc':textfile='${quoteFilterPath(paths.captionZh)}':reload=0:fontsize=46:fontcolor=white:bordercolor=black@0.7:borderw=3:shadowcolor=black@0.5:shadowx=2:shadowy=2:x=(w-text_w)/2:y=h-360:line_spacing=10`,
    );
  }
  if (job.caption?.en) {
    videoFilters.push(
      `drawtext=fontfile='C\\:/Windows/Fonts/msjh.ttc':textfile='${quoteFilterPath(paths.captionEn)}':reload=0:fontsize=36:fontcolor=0xd8d8d8:bordercolor=black@0.7:borderw=2:x=(w-text_w)/2:y=h-210:line_spacing=8`,
    );
  }
  videoFilters.push("format=yuv420p");

  const args = ["-y", "-i", job.outputPath];
  let audioFilter;
  if (paths.narration) {
    args.push("-i", paths.narration);
    audioFilter = `[1:a]aformat=sample_rates=44100:channel_layouts=stereo,apad,atrim=0:${clipDuration.toFixed(3)},asetpts=N/SR/TB[a]`;
  } else {
    args.push("-f", "lavfi", "-t", clipDuration.toFixed(3), "-i", "anullsrc=channel_layout=stereo:sample_rate=44100");
    audioFilter = `[1:a]asetpts=N/SR/TB[a]`;
  }

  const filterComplex = `[0:v]${videoFilters.join(",")}[v];${audioFilter}`;
  await fs.mkdir(dirname(paths.shot), { recursive: true });
  await runProcess(ffmpegPath, [
    ...args,
    "-filter_complex",
    filterComplex,
    "-map",
    "[v]",
    "-map",
    "[a]",
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-crf",
    "18",
    "-c:a",
    "aac",
    "-b:a",
    "192k",
    "-movflags",
    "+faststart",
    paths.shot,
  ]);
  const stat = await fs.stat(paths.shot);
  return { success: true, outputPath: paths.shot, bytes: stat.size, durationSeconds: clipDuration };
}

async function concatShots(shots, outputPath) {
  const inputs = [];
  const pieces = [];
  for (const [index, shot] of shots.entries()) {
    inputs.push("-i", shot.outputPath);
    pieces.push(`[${index}:v:0][${index}:a:0]`);
  }
  const filterComplex = `${pieces.join("")}concat=n=${shots.length}:v=1:a=1[v][a]`;
  await fs.mkdir(dirname(outputPath), { recursive: true });
  await runProcess(ffmpegPath, [
    "-y",
    ...inputs,
    "-filter_complex",
    filterComplex,
    "-map",
    "[v]",
    "-map",
    "[a]",
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-crf",
    "18",
    "-c:a",
    "aac",
    "-b:a",
    "192k",
    "-movflags",
    "+faststart",
    outputPath,
  ]);
  const stat = await fs.stat(outputPath);
  return { outputPath, bytes: stat.size };
}

async function mixMusic(videoPath, musicPath, outputPath, musicVolume) {
  await fs.mkdir(dirname(outputPath), { recursive: true });
  await runProcess(ffmpegPath, [
    "-y",
    "-i",
    videoPath,
    "-stream_loop",
    "-1",
    "-i",
    musicPath,
    "-filter_complex",
    `[1:a]volume=${musicVolume},afade=t=in:st=0:d=1.5[music];[music][0:a]sidechaincompress=threshold=0.03:ratio=8:attack=50:release=500[ducked];[0:a][ducked]amix=inputs=2:duration=first:dropout_transition=0[a]`,
    "-map",
    "0:v",
    "-map",
    "[a]",
    "-c:v",
    "copy",
    "-c:a",
    "aac",
    "-b:a",
    "192k",
    "-shortest",
    "-movflags",
    "+faststart",
    outputPath,
  ]);
  const stat = await fs.stat(outputPath);
  return { outputPath, bytes: stat.size };
}

function normalizeManifest(raw) {
  if (!Array.isArray(raw.jobs) || raw.jobs.length === 0) {
    throw new Error("manifest.jobs 必須是非空陣列");
  }
  const runId = raw.run_id || basename(manifestPath, ".json");
  const workDir = resolveManifestPath(raw.workDir) || join(runnerDir, "output", runId);
  const jobs = raw.jobs.map((job, index) => {
    for (const key of ["id", "label", "imagePath", "outputPath", "prompt"]) {
      if (!job[key]) throw new Error(`jobs[${index}] 缺少必要欄位：${key}`);
    }
    if (job.narration && !job.narration.text) {
      throw new Error(`jobs[${index}].narration 缺少 text`);
    }
    if (job.narration && !job.narration.voice_id) {
      throw new Error(`jobs[${index}].narration 缺少 voice_id`);
    }
    const durationSeconds = parseDurationSeconds(job.duration);
    return {
      ...job,
      imagePath: resolveManifestPath(job.imagePath),
      outputPath: resolveManifestPath(job.outputPath),
      duration: job.duration || `${durationSeconds}s`,
      durationSeconds,
    };
  });
  const finalNoMusicPath = resolveManifestPath(raw.intermediateOutputPath) || join(workDir, `${runId}_no_music.mp4`);
  const finalOutputPath = resolveManifestPath(raw.finalOutputPath || raw.outputPath) || join(workDir, `${runId}_final.mp4`);
  return {
    runId,
    jobs,
    workDir,
    music: raw.music
      ? {
          path: resolveManifestPath(raw.music.path),
          volume: typeof raw.music.volume === "number" ? raw.music.volume : 0.25,
        }
      : null,
    reportPath: resolveManifestPath(raw.reportPath) || join(root, `.fal-runner/pipeline_result_${runId}.txt`),
    finalNoMusicPath,
    finalOutputPath,
  };
}

async function validateLocalInputs(manifest) {
  if (!ffmpegPath) throw new Error("找不到ffmpeg-static提供的ffmpeg執行檔");
  if (!ffprobeStatic.path) throw new Error("找不到ffprobe-static提供的ffprobe執行檔");
  await fs.access(ffmpegPath);
  await fs.access(ffprobeStatic.path);
  for (const job of manifest.jobs) await fs.access(job.imagePath);
  if (manifest.music) await fs.access(manifest.music.path);
  const envText = await fs.readFile(join(root, ".env.local"), "utf8");
  return parseEnv(envText);
}

function formatElapsed(startedAt) {
  return `${((Date.now() - startedAt) / 1000).toFixed(1)}s`;
}

async function main() {
  const raw = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  const manifest = normalizeManifest(raw);
  const env = await validateLocalInputs(manifest);
  const falApiKey = env.FAL_API_KEY || env.FAL_KEY;
  const replicateToken = env.REPLICATE_API_TOKEN;
  if (!dryRun && !falApiKey) throw new Error("Missing FAL_API_KEY / FAL_KEY in .env.local");
  if (!dryRun && manifest.jobs.some((job) => job.narration) && !replicateToken) {
    throw new Error("Missing REPLICATE_API_TOKEN in .env.local");
  }
  if (falApiKey) configureFal(falApiKey);

  const startedAt = Date.now();
  const results = [];
  const successfulShots = [];
  const errors = [];
  const before = !dryRun && falApiKey ? await billing(falApiKey) : { ok: false, balance: null, currency: "USD" };

  await fs.mkdir(manifest.workDir, { recursive: true });

  for (const job of manifest.jobs) {
    const jobStart = Date.now();
    const jobDir = join(manifest.workDir, job.id);
    const paths = {
      narration: job.narration ? join(jobDir, `${job.id}_narration.mp3`) : null,
      captionZh: join(jobDir, `${job.id}_caption_zh.txt`),
      captionEn: join(jobDir, `${job.id}_caption_en.txt`),
      shot: join(jobDir, `${job.id}_complete.mp4`),
    };
    const item = { id: job.id, label: job.label, steps: {}, success: false };
    try {
      item.steps.veo = await runVeoJob(job, { dryRun });
      if (dryRun) {
        item.steps.tts = job.narration ? { success: true, dryRun: true } : { skipped: true };
        item.steps.render = { success: true, dryRun: true, outputPath: paths.shot };
      } else {
        if (job.narration) item.steps.tts = await generateNarration(job, replicateToken, paths.narration);
        else item.steps.tts = { skipped: true };
        item.steps.render = await renderShot(job, paths);
        successfulShots.push(item.steps.render);
      }
      item.success = true;
    } catch (error) {
      item.error = error.message;
      errors.push({ label: job.label, message: error.message });
    } finally {
      item.elapsed = formatElapsed(jobStart);
      results.push(item);
    }
  }

  let finalResult = null;
  if (!dryRun && successfulShots.length > 0) {
    const concatResult = await concatShots(successfulShots, manifest.finalNoMusicPath);
    finalResult = manifest.music
      ? await mixMusic(concatResult.outputPath, manifest.music.path, manifest.finalOutputPath, manifest.music.volume)
      : concatResult;
  } else if (dryRun) {
    finalResult = { outputPath: manifest.finalOutputPath, dryRun: true };
  }

  let after = !dryRun && falApiKey ? await billing(falApiKey) : { ok: false, balance: null, currency: "USD" };
  if (!dryRun && before.ok && after.ok && before.balance === after.balance) {
    for (let i = 0; i < 8; i += 1) {
      await sleep(15000);
      after = await billing(falApiKey);
      if (after.ok && after.balance !== before.balance) break;
    }
  }

  const allSucceeded = results.every((item) => item.success);
  const generatedSeconds = results
    .filter((item) => item.steps.veo?.success && !item.steps.veo?.dryRun)
    .reduce((sum, item) => sum + (manifest.jobs.find((job) => job.id === item.id)?.durationSeconds || 0), 0);
  const estimatedVeoCost = generatedSeconds * veoPricePerSecondUsd;
  const estimatedTtsCost = results.reduce((sum, item) => sum + (item.steps.tts?.estimatedCostUsd || 0), 0);
  const balanceDelta =
    before.ok &&
    after.ok &&
    typeof before.balance === "number" &&
    typeof after.balance === "number"
      ? Number((before.balance - after.balance).toFixed(6))
      : null;

  const lines = [];
  lines.push(`一鍵出片pipeline結果${dryRun ? "（DRY RUN，未呼叫付費API）" : ""}`);
  lines.push(`run_id：${manifest.runId}`);
  lines.push(`manifest：${manifestPath}`);
  lines.push(`執行時間：${new Date().toISOString()}`);
  lines.push(`總耗時：${formatElapsed(startedAt)}`);
  lines.push(`Veo端點：POST ${veoEndpointUrl}`);
  lines.push(`TTS：Replicate ${replicateModel}`);
  lines.push("");
  lines.push(`① 各項整合是否成功：${allSucceeded && finalResult ? "成功" : "未完全成功"}`);
  for (const item of results) {
    lines.push(`- ${item.label}：${item.success ? "成功" : "失敗"}（${item.elapsed}）`);
    if (item.steps.veo?.requestId) lines.push(`  - Veo request_id：${item.steps.veo.requestId}`);
    if (item.steps.tts?.predictionId) lines.push(`  - TTS prediction_id：${item.steps.tts.predictionId}`);
    if (item.error) lines.push(`  - 錯誤：${item.error}`);
  }
  lines.push("");
  lines.push("② 端對端測試的最終影片路徑：");
  lines.push(`- ${finalResult?.outputPath || "未產生"}`);
  lines.push("");
  lines.push("③ 實際花費：");
  if (balanceDelta !== null) {
    lines.push(`- fal.ai餘額變化：${before.balance} ${before.currency} -> ${after.balance} ${after.currency}`);
    lines.push(`- fal.ai實際扣款：US$${balanceDelta.toFixed(2)}`);
  } else {
    lines.push("- fal.ai API key目前無法讀取帳戶餘額，因此不能用餘額差確認實際扣款。");
  }
  lines.push(`- 依已驗證費率估算Veo：US$${estimatedVeoCost.toFixed(2)}（${generatedSeconds}s x US$0.15/s）`);
  lines.push(`- 依Replicate官方費率估算TTS：US$${estimatedTtsCost.toFixed(4)}（US$0.10/千字元token）`);
  lines.push("");
  lines.push("④ 技術限制或需人工決定：");
  if (errors.length === 0) {
    lines.push("- 無阻斷錯誤。若旁白長於clip，腳本會依SOP停止該shot組裝並回報，不自動裁切。");
  } else {
    for (const error of errors) lines.push(`- ${error.label}：${error.message}`);
  }
  lines.push("- 配樂ducking用ffmpeg sidechaincompress實作，目標是旁白出現時把0.25配樂壓低到接近0.15；精確聽感仍需人工驗收。");
  lines.push("");
  lines.push("⑤ 新舊腳本關係：");
  lines.push("- run-veo-track-a.mjs保留為只生成Veo動態鏡頭的低階入口。");
  lines.push("- produce-episode.mjs是上層一鍵出片pipeline，透過veo-client.mjs共用同一套Veo上傳、輪詢、下載邏輯。");

  await fs.mkdir(dirname(manifest.reportPath), { recursive: true });
  await fs.writeFile(manifest.reportPath, `${lines.join("\n")}\n`, "utf8");
  console.log(lines.join("\n"));
  if (!allSucceeded || !finalResult) process.exitCode = 1;
}

main().catch(async (error) => {
  const fallbackReport = join(root, ".fal-runner", "pipeline_smoke_test_result.txt");
  const text = [
    "一鍵出片pipeline結果",
    `執行時間：${new Date().toISOString()}`,
    "",
    "① 各項整合是否成功：未成功",
    "② 端對端測試的最終影片路徑：未產生",
    "③ 實際花費：無法確認",
    `④ 錯誤訊息：${error.message}`,
    "⑤ 新舊腳本關係：produce-episode.mjs尚未完成本次執行",
    "",
  ].join("\n");
  await fs.mkdir(dirname(fallbackReport), { recursive: true });
  await fs.writeFile(fallbackReport, text, "utf8");
  console.error(error);
  process.exit(1);
});
