/**
 * Fires UTMify SubscribedButtonClick event on checkout CTA clicks.
 * Attach as onClick to all checkout <a> elements.
 */
export const trackCheckoutClick = () => {
  try {
    if (typeof window !== "undefined" && window.dispatchEvent) {
      window.dispatchEvent(new Event("SubscribedButtonClick"));
    }
  } catch {
    // silently fail if tracking unavailable
  }
};
