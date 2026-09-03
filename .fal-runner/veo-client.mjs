import { fal } from "@fal-ai/client";
import { promises as fs } from "node:fs";
import { basename, dirname } from "node:path";

export const veoEndpoint = "fal-ai/veo3.1/fast/image-to-video";
export const veoEndpointUrl = "https://fal.run/fal-ai/veo3.1/fast/image-to-video";

export function parseEnv(text) {
  const env = {};
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index === -1) continue;
    const key = trimmed.slice(0, index).trim();
    let value = trimmed.slice(index + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function configureFal(apiKey) {
  process.env.FAL_KEY = apiKey;
  fal.config({ credentials: apiKey });
}

export async function requestJson(url, options = {}) {
  const response = await fetch(url, options);
  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${text}`);
  }
  return data;
}

export async function billing(apiKey) {
  try {
    const data = await requestJson(
      "https://api.fal.ai/v1/account/billing?expand=credits",
      {
        headers: { Authorization: `Key ${apiKey}` },
      },
    );
    return {
      ok: true,
      raw: data,
      balance:
        typeof data?.credits?.current_balance === "number"
          ? data.credits.current_balance
          : null,
      currency: data?.credits?.currency || "USD",
    };
  } catch (error) {
    return { ok: false, error: error.message, balance: null, currency: "USD" };
  }
}

function contentTypeFor(filePath) {
  const lower = filePath.toLowerCase();
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  return "application/octet-stream";
}

export async function uploadImage(job) {
  const bytes = await fs.readFile(job.imagePath);
  const file = new File([bytes], basename(job.imagePath), {
    type: contentTypeFor(job.imagePath),
  });
  return fal.storage.upload(file);
}

export async function runVeoJob(job, { dryRun = false, log = console.log } = {}) {
  if (dryRun) {
    await fs.access(job.imagePath);
    return {
      label: job.label,
      success: true,
      dryRun: true,
      requestId: null,
      uploadedUrl: null,
      videoUrl: null,
      outputPath: job.outputPath,
      bytes: 0,
      status: "DRY_RUN_OK",
      logs: [],
      wouldSend: {
        prompt: job.prompt,
        image_url: `(local: ${job.imagePath})`,
        duration: job.duration,
        negative_prompt: job.negative_prompt,
        aspect_ratio: "auto",
        resolution: "720p",
      },
    };
  }

  const uploadedUrl = await uploadImage(job);
  const submitted = await fal.queue.submit(veoEndpoint, {
    input: {
      prompt: job.prompt,
      image_url: uploadedUrl,
      duration: job.duration,
      negative_prompt: job.negative_prompt,
      aspect_ratio: "auto",
      resolution: "720p",
      auto_fix: false,
      safety_tolerance: "4",
    },
  });

  const requestId = submitted.request_id;
  let lastStatus = "SUBMITTED";
  let logs = [];
  const startedAt = Date.now();
  const timeoutMs = 45 * 60 * 1000;

  while (Date.now() - startedAt < timeoutMs) {
    const status = await fal.queue.status(veoEndpoint, {
      requestId,
      logs: true,
    });
    lastStatus = status.status;
    if (Array.isArray(status.logs)) {
      logs = status.logs.map((entry) => entry.message || String(entry));
    }
    log(`${job.id}: ${lastStatus}`);
    if (lastStatus === "COMPLETED") break;
    if (
      lastStatus === "FAILED" ||
      lastStatus === "CANCELLED" ||
      lastStatus === "ERROR"
    ) {
      throw new Error(`${job.label} failed: ${JSON.stringify(status)}`);
    }
    await sleep(15000);
  }

  if (lastStatus !== "COMPLETED") {
    throw new Error(`${job.label} timed out after ${Math.round(timeoutMs / 60000)} minutes`);
  }

  const result = await fal.queue.result(veoEndpoint, { requestId });
  const videoUrl = result?.data?.video?.url || result?.video?.url;
  if (!videoUrl) {
    throw new Error(`${job.label} result has no video URL: ${JSON.stringify(result)}`);
  }

  const videoResponse = await fetch(videoUrl);
  if (!videoResponse.ok) {
    throw new Error(
      `${job.label} video download failed: ${videoResponse.status} ${videoResponse.statusText}`,
    );
  }
  const arrayBuffer = await videoResponse.arrayBuffer();
  await fs.mkdir(dirname(job.outputPath), { recursive: true });
  await fs.writeFile(job.outputPath, Buffer.from(arrayBuffer));
  const stat = await fs.stat(job.outputPath);

  return {
    label: job.label,
    success: true,
    requestId,
    uploadedUrl,
    videoUrl,
    outputPath: job.outputPath,
    bytes: stat.size,
    status: lastStatus,
    logs,
    durationSeconds: job.durationSeconds,
  };
}
