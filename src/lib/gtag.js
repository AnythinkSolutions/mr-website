//Include a fallback in case env isn't setup. 
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID ?? "G-ZLW8SWYFFT"

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  if(!GA_TRACKING_ID) return;
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  
  console.log("gtag-event: ", action, category, label, value);
  if(!GA_TRACKING_ID || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};