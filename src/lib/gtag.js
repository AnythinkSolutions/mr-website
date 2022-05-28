//For some reason, the tracking id doesn't pull from the environment variables.
// is it because it's running client-side, not on the server
export const GA_TRACKING_ID = process.env.GA_TRACKING_ID ?? "G-ZLW8SWYFFT"

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  if(!GA_TRACKING_ID) return;
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  if(!GA_TRACKING_ID) return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};