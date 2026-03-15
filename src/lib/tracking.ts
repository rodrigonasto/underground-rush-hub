/**
 * Fires UTMify SubscribedButtonClick event on checkout CTA clicks.
 * Forces navigation after a short delay to ensure the pixel fires
 * even if UTMify intercepts and blocks the default <a> behavior.
 */
export const trackCheckoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  try {
    if (typeof window !== "undefined" && window.dispatchEvent) {
      window.dispatchEvent(new Event("SubscribedButtonClick"));
    }
  } catch {
    // silently fail if tracking unavailable
  }

  // Grab the href from the clicked anchor
  const href = e.currentTarget?.href;
  if (href) {
    e.preventDefault();
    // Longer delay to let UTMify pixel fully process the IC event
    setTimeout(() => {
      window.location.href = href;
    }, 150);
  }
};
