export const GA_TARGET_ID = 'UA-69006507-2';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (pagePath: string): void => {
  window.gtag('config', GA_TARGET_ID, {
    page_path: pagePath,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  eventName,
  eventCategory,
  eventLabel,
  value,
}: {
  eventName: Gtag.EventNames;
  eventCategory?: string;
  eventLabel?: string;
  value: number;
}): void => {
  window.gtag('event', eventName, {
    event_category: eventCategory,
    event_label: eventLabel,
    value,
  });
};
