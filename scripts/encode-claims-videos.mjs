import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const FFMPEG = "D:\\spotter.ai\\node_modules\\ffmpeg-static\\ffmpeg.exe";
const BASE_DIR = "D:\\spotter.ai\\public\\brand\\claimsOS-videos";
const SCRUB_DIR = path.join(BASE_DIR, "scrub");
const IMAGES_DIR = "D:\\spotter.ai\\public\\images\\claims-os";

if (!fs.existsSync(SCRUB_DIR)) {
  fs.mkdirSync(SCRUB_DIR, { recursive: true });
}

// Find input files
const files = fs.readdirSync(BASE_DIR);
const laserFile = files.find(f => f.startsWith("Laser_lines"));
const kineticFile = files.find(f => f.startsWith("Kinetic_sculpture"));

if (!laserFile || !kineticFile) {
  console.error("Missing input files!", { laserFile, kineticFile });
  process.exit(1);
}

const tasks = [
  {
    id: "claims-triage",
    inputFile: path.join(BASE_DIR, laserFile),
    outputVideo: path.join(SCRUB_DIR, "claims-triage.mp4"),
    outputPoster: path.join(SCRUB_DIR, "claims-triage.webp"),
    publicPoster: path.join(IMAGES_DIR, "claims-triage-poster.webp"),
  },
  {
    id: "liability-resolution",
    inputFile: path.join(BASE_DIR, kineticFile),
    outputVideo: path.join(SCRUB_DIR, "liability-resolution.mp4"),
    outputPoster: path.join(SCRUB_DIR, "liability-resolution.webp"),
    publicPoster: path.join(IMAGES_DIR, "liability-resolution-poster.webp"),
  },
];

for (const task of tasks) {
  console.log(`\n=== Processing ${task.id} ===`);
  console.log(`Input: ${task.inputFile}`);

  // 1. Encode video with GOP=1 (all intra), muted, faststart
  const encodeArgs = [
    "-y",
    "-i", task.inputFile,
    "-vf", "scale=-2:1080",
    "-an",
    "-c:v", "libx264",
    "-preset", "slow",
    "-crf", "20",
    "-g", "1",
    "-keyint_min", "1",
    "-sc_threshold", "0",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    task.outputVideo,
  ];

  console.log(`Running FFmpeg encode for ${task.outputVideo}...`);
  const encodeRes = spawnSync(FFMPEG, encodeArgs, { stdio: "inherit" });
  if (encodeRes.status !== 0) {
    console.error(`Failed to encode ${task.id}`);
    process.exit(1);
  }

  // 2. Extract first decoded frame as WebP poster
  const posterArgs = [
    "-y",
    "-ss", "00:00:00.000",
    "-i", task.outputVideo,
    "-vframes", "1",
    "-c:v", "libwebp",
    "-lossless", "0",
    "-q:v", "90",
    task.outputPoster,
  ];

  console.log(`Extracting first frame to ${task.outputPoster}...`);
  const posterRes = spawnSync(FFMPEG, posterArgs, { stdio: "inherit" });
  if (posterRes.status !== 0) {
    console.error(`Failed to extract poster for ${task.id}`);
    process.exit(1);
  }

  // Copy poster to images directory as well
  fs.copyFileSync(task.outputPoster, task.publicPoster);
  console.log(`Copied poster to ${task.publicPoster}`);

  const vidStat = fs.statSync(task.outputVideo);
  const posterStat = fs.statSync(task.outputPoster);
  console.log(`Video size: ${vidStat.size} bytes`);
  console.log(`Poster size: ${posterStat.size} bytes`);
}

console.log("\nAll encoding completed successfully!");
