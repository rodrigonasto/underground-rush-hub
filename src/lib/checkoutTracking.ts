import type { MouseEvent } from "react";

type FbqPixelState = {
  pixels?: Array<{ id?: string }>;
};

type FbqFunction = ((action: string, eventName: string, params?: Record<string, unknown>) => void) & {
  getState?: () => FbqPixelState;
};

declare global {
  interface Window {
    fbq?: FbqFunction;
  }
}

const FALLBACK_PIXEL_ID = "1256529589773554";
const CHECKOUT_REDIRECT_DELAY_MS = 900;

const getMetaPixelId = (): string | undefined => {
  const pixels = window.fbq?.getState?.()?.pixels ?? [];
  return pixels.find((pixel) => Boolean(pixel?.id))?.id;
};

const fireMetaInitiateCheckout = () => {
  try {
    window.fbq?.("track", "InitiateCheckout", {
      content_name: "Pack +100 jogos",
      source: "checkout_cta",
    });
  } catch {
    // no-op
  }

  const pixelId = getMetaPixelId() ?? FALLBACK_PIXEL_ID;
  if (!pixelId) return;

  const query = new URLSearchParams({
    id: pixelId,
    ev: "InitiateCheckout",
    dl: window.location.href,
    ts: String(Date.now()),
    noscript: "1",
  });

  const beacon = new Image();
  beacon.src = `https://www.facebook.com/tr/?${query.toString()}`;
};

export const handleTrackedCheckoutClick = (event: MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
  const url = event.currentTarget.href;

  fireMetaInitiateCheckout();

  window.setTimeout(() => {
    window.location.assign(url);
  }, CHECKOUT_REDIRECT_DELAY_MS);
};
