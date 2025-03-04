// lib/analytics.js
import { track as vercelTrack } from '@vercel/analytics';

// Google Analytics Measurement ID
export const GA_MEASUREMENT_ID = 'G-SPNHCEG4HS';

// Log page views
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Log specific events - with both GA and Vercel Analytics
export const event = ({ action, category, label, value, properties = {} }) => {
  // Google Analytics event tracking
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
  
  // Vercel Analytics event tracking with more detailed properties
  vercelTrack(action, {
    category,
    label,
    value,
    ...properties,  // Additional custom properties
  });
};