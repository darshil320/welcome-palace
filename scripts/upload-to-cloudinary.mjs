// One-off asset migration: uploads public/images and public/videos to Cloudinary,
// preserving relative paths as public_ids so lib/cloudinary.ts can build URLs
// deterministically without a lookup table. Run: node scripts/upload-to-cloudinary.mjs
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
  throw new Error("Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET first.");
}

const PUBLIC_DIR = path.join(import.meta.dirname, "..", "public");

async function listFilesRecursive(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(dir, entry.name);
      return entry.isDirectory() ? listFilesRecursive(fullPath) : [fullPath];
    }),
  );
  return files.flat();
}

function sign(params) {
  const toSign = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  return createHash("sha1").update(toSign + API_SECRET).digest("hex");
}

async function uploadFile(filePath, resourceType, publicId) {
  const timestamp = Math.floor(Date.now() / 1000);
  const paramsToSign = { overwrite: "true", public_id: publicId, timestamp: String(timestamp) };
  const signature = sign(paramsToSign);

  const buffer = await readFile(filePath);
  const form = new FormData();
  form.set("file", new Blob([buffer]), path.basename(filePath));
  form.set("public_id", publicId);
  form.set("overwrite", "true");
  form.set("timestamp", String(timestamp));
  form.set("api_key", API_KEY);
  form.set("signature", signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`, {
    method: "POST",
    body: form,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`Upload failed for ${filePath}: ${data.error?.message ?? response.statusText}`);
  }
  return data.secure_url;
}

async function migrateFolder(subfolder, resourceType) {
  const dir = path.join(PUBLIC_DIR, subfolder);
  const files = await listFilesRecursive(dir);
  const results = [];

  for (const filePath of files) {
    const relPath = path.relative(dir, filePath);
    const withoutExt = relPath.replace(/\.[^./]+$/, "");
    const publicId = `welcome-palace/${subfolder}/${withoutExt}`.split(path.sep).join("/");
    const url = await uploadFile(filePath, resourceType, publicId);
    console.log(`${resourceType.padEnd(6)} ${relPath} -> ${url}`);
    results.push({ localPath: `/${subfolder}/${relPath}`, publicId, url });
  }

  return results;
}

const images = await migrateFolder("images", "image");
const videos = await migrateFolder("videos", "video");

console.log(`\nUploaded ${images.length} images and ${videos.length} videos.`);
