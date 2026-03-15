/**
 * Fires UTMify SubscribedButtonClick event on checkout CTA clicks.
 * Adds a 300ms delay before navigation so UTMify has time to classify
 * the click as InitiateCheckout in production.
 *
 * Attach as onClick to all checkout <a> elements.
 */
export const trackCheckoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  try {
    if (typeof window !== "undefined" && window.dispatchEvent) {
      window.dispatchEvent(new Event("SubscribedButtonClick"));
    }
  } catch {
    // silently fail if tracking unavailable
  }

  // Delay navigation by 300ms so the pixel can process the event
  const href = e.currentTarget?.href;
  if (href) {
    e.preventDefault();
    setTimeout(() => {
      window.location.href = href;
    }, 300);
  }
};
