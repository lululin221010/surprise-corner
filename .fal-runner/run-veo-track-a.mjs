import { promises as fs } from "node:fs";
import { basename, dirname, isAbsolute, join } from "node:path";
import {
  billing,
  configureFal,
  parseEnv,
  runVeoJob,
  sleep,
  veoEndpointUrl,
} from "./veo-client.mjs";

const root = process.cwd();

// Track B：manifest驅動，不再寫死jobs。用法：
//   node run-veo-track-a.mjs <manifest.json> [--dry-run]
// manifest格式：{ "run_id": "...", "jobs": [{ id, label, imagePath, outputPath, duration, prompt, negative_prompt }] }
// imagePath可絕對路徑或相對manifest檔案位置；outputPath可省略duration（預設4s）。
const manifestArg = process.argv[2];
const dryRun = process.argv.includes("--dry-run");
if (!manifestArg) {
  console.error(
    "缺少manifest路徑。用法：node run-veo-track-a.mjs <manifest.json> [--dry-run]",
  );
  process.exit(1);
}
const manifestPath = isAbsolute(manifestArg) ? manifestArg : join(root, manifestArg);
const manifestDir = dirname(manifestPath);

function resolveManifestPath(p) {
  return isAbsolute(p) ? p : join(manifestDir, p);
}

const manifestRaw = JSON.parse(await fs.readFile(manifestPath, "utf8"));
const runId = manifestRaw.run_id || basename(manifestPath, ".json");
const resultPath = join(root, `veo_generation_result_${runId}.txt`);
const jobs = manifestRaw.jobs.map((job) => ({
  ...job,
  imagePath: resolveManifestPath(job.imagePath),
  outputPath: resolveManifestPath(job.outputPath),
  duration: job.duration || "4s",
}));

async function main() {
  const envText = await fs.readFile(join(root, ".env.local"), "utf8");
  const env = parseEnv(envText);
  const apiKey = env.FAL_API_KEY || env.FAL_KEY;
  if (!apiKey) throw new Error("Missing FAL_API_KEY / FAL_KEY in .env.local");
  configureFal(apiKey);

  const before = await billing(apiKey);
  const results = [];
  const errors = [];

  for (const job of jobs) {
    try {
      results.push(await runVeoJob(job, { dryRun }));
    } catch (error) {
      errors.push({ label: job.label, message: error.message });
      results.push({
        label: job.label,
        success: false,
        outputPath: job.outputPath,
        error: error.message,
      });
    }
  }

  let after = await billing(apiKey);
  if (!dryRun && before.ok && after.ok && before.balance === after.balance) {
    for (let i = 0; i < 8; i += 1) {
      await sleep(15000);
      after = await billing(apiKey);
      if (after.ok && after.balance !== before.balance) break;
    }
  }

  const allSucceeded = results.every((item) => item.success);
  const balanceDelta =
    before.ok &&
    after.ok &&
    typeof before.balance === "number" &&
    typeof after.balance === "number"
      ? Number((before.balance - after.balance).toFixed(6))
      : null;

  const lines = [];
  lines.push(`Veo3.1 Fast image-to-video 生成結果${dryRun ? "（DRY RUN，未實際呼叫API）" : ""}`);
  lines.push(`run_id：${runId}`);
  lines.push(`manifest：${manifestPath}`);
  lines.push(`執行時間：${new Date().toISOString()}`);
  lines.push(`端點：POST ${veoEndpointUrl}`);
  lines.push("");
  lines.push(`① 全部工作是否成功：${allSucceeded ? "是" : "否"}`);
  for (const item of results) {
    lines.push(
      `- ${item.label}：${item.success ? "成功" : "失敗"}${item.requestId ? `（request_id=${item.requestId}）` : ""}`,
    );
  }
  lines.push("");
  lines.push("② 實際檔案路徑：");
  for (const item of results) {
    lines.push(
      `- ${item.label}：${item.success ? item.outputPath : `未產生；預定路徑 ${item.outputPath}`}`,
    );
  }
  lines.push("");
  lines.push("③ 這次實際花費：");
  if (balanceDelta !== null) {
    lines.push(
      `- 帳戶餘額變化：${before.balance} ${before.currency} -> ${after.balance} ${after.currency}`,
    );
    lines.push(`- 實際扣款：US$${balanceDelta.toFixed(2)}`);
  } else {
    lines.push("- 無法用帳戶餘額 API 確認。");
    if (!before.ok) lines.push(`- 生成前餘額查詢錯誤：${before.error}`);
    if (!after.ok) lines.push(`- 生成後餘額查詢錯誤：${after.error}`);
  }
  lines.push("");
  lines.push("④ 錯誤訊息：");
  if (errors.length === 0) {
    lines.push("- 無");
  } else {
    for (const error of errors) lines.push(`- ${error.label}：${error.message}`);
  }
  lines.push("");
  lines.push("補充：");
  for (const item of results) {
    if (!item.success) continue;
    lines.push(`- ${item.label} CDN 輸入：${item.uploadedUrl}`);
    lines.push(`- ${item.label} 影片 URL：${item.videoUrl}`);
    lines.push(`- ${item.label} 檔案大小：${item.bytes} bytes`);
  }

  await fs.writeFile(resultPath, `${lines.join("\n")}\n`, "utf8");
  console.log(lines.join("\n"));

  if (!allSucceeded) process.exitCode = 1;
}

main().catch(async (error) => {
  const text = [
    "Track A Veo3.1 Fast image-to-video 正式生成結果",
    `執行時間：${new Date().toISOString()}`,
    "",
    "① 兩支影片是否成功產生：否",
    "② 實際檔案路徑：未產生",
    "③ 這次實際花費：無法確認",
    `④ 錯誤訊息：${error.message}`,
    "",
  ].join("\n");
  await fs.writeFile(resultPath, text, "utf8");
  console.error(error);
  process.exit(1);
});
