import type { ImageMetadata } from "astro";

const eagerImages = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/images/**/*.{jpeg,jpg,png,gif,webp,JPG,JPEG,PNG,GIF,WEBP}",
  { eager: true },
);

/**
 * Maps public URL paths (`/images/devildog/...`) to images under
 * `src/assets/images/devildog/...` for `astro:assets` optimization.
 * When files are missing from `src/assets`, callers should fall back to a plain `<img>`.
 */
export function getImageFromPublicPath(publicPath: string): ImageMetadata | undefined {
  if (!publicPath.startsWith("/images/")) return undefined;
  const key = `/src/assets/images${publicPath.slice("/images".length)}`;
  return eagerImages[key]?.default;
}
