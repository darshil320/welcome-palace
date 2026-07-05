const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

// Cloudinary normalises .jpeg uploads to .jpg on delivery.
function deliveryExtension(ext: string) {
  return ext === "jpeg" ? "jpg" : ext;
}

function cldUrl(
  resourceType: "image" | "video",
  relPath: string,
  transforms?: string
) {
  const match = relPath.match(/^(.*)\.([^./]+)$/);
  if (!match) throw new Error(`Asset path must include an extension: ${relPath}`);
  const [, withoutExt, ext] = match;
  const transformsPath = transforms ? `${transforms}/` : "";
  return `https://res.cloudinary.com/${CLOUD_NAME}/${resourceType}/upload/${transformsPath}welcome-palace/${resourceType === "image" ? "images" : "videos"}/${withoutExt}.${deliveryExtension(ext)}`;
}

/** relPath is the filename (and subfolder, for videos) as it lived under public/images. */
export function cldImage(relPath: string, transforms?: string) {
  return cldUrl("image", relPath, transforms);
}

/** relPath is the filename (and subfolder) as it lived under public/videos. */
export function cldVideo(relPath: string, transforms?: string) {
  return cldUrl("video", relPath, transforms);
}
