const PIXEL_ID = "69b2692bc0943879db0c1359";
const PIXEL_SRC = "https://cdn.utmify.com.br/scripts/pixel/pixel.js";
const UTM_SRC = "https://cdn.utmify.com.br/scripts/utms/latest.js";

const UTM_ATTRIBUTES: Record<string, string> = {
  "data-utmify-prevent-xcod-sck": "",
  "data-utmify-prevent-subids": "",
};

declare global {
  interface Window {
    pixelId?: string;
    loadAnalytics?: () => void;
    __analyticsWarmupDone?: boolean;
  }
}

const ensureScript = (src: string, attributes: Record<string, string> = {}) => {
  if (typeof document === "undefined") return;
  if (document.querySelector(`script[src="${src}"]`)) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = src;

  Object.entries(attributes).forEach(([key, value]) => {
    script.setAttribute(key, value);
  });

  document.head.appendChild(script);
};

export const warmupAnalyticsScripts = () => {
  if (typeof window === "undefined") return;
  if (window.__analyticsWarmupDone) return;

  window.__analyticsWarmupDone = true;
  window.pixelId = PIXEL_ID;

  ensureScript(PIXEL_SRC);
  ensureScript(UTM_SRC, UTM_ATTRIBUTES);

  // Prevent duplicate injections from delayed loaders.
  window.loadAnalytics = () => {
    window.pixelId = PIXEL_ID;
    ensureScript(PIXEL_SRC);
    ensureScript(UTM_SRC, UTM_ATTRIBUTES);
  };
};
