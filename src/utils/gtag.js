export const GA_TRACKING_ID = process.env.GA_TRACKING_ID // This is your GA Tracking ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  if (process.env.NODE_ENV === 'production') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  } else {
    console.log({
      name: 'ga_config',
      value: url
    })
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({action, category, label, value}) => {
  if (process.env.NODE_ENV === 'production') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  } else {
    console.log({
      name: 'ga_event',
      value: {
        action,
        category,
        label,
        value}
    })
  }
}
