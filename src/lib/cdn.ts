/** Cloudflare R2 CDN configuration for game cover images */

export const CDN_BASE_URL = "https://pub-ea93f56e93a64de8a24b1a7fcd48b703.r2.dev";

export const FALLBACK_IMAGE = `${CDN_BASE_URL}/fallback.webp`;

/**
 * Build the full CDN URL for a game cover image.
 * Image files in the bucket should be named exactly as the game name + .webp
 * e.g. "GTA V.webp", "God of War 2.webp"
 */
export const getGameCoverUrl = (gameName: string): string =>
  `${CDN_BASE_URL}/${encodeURIComponent(`${gameName}.webp`)}`;
