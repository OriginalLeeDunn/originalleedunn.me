'use client';

import { useEffect } from 'react';
import type { Metric } from 'web-vitals';

export default function WebVitals() {
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    // Function to initialize web vitals
    const initWebVitals = async () => {
      try {
        // Dynamically import web-vitals
        const webVitals = await import('web-vitals');
        const { getCLS, getFID, getFCP, getLCP, getTTFB } = webVitals;
        
        const sendToAnalytics = (metric: Metric) => {
          const body = JSON.stringify(metric);
          const url = '/api/analytics';

          if (navigator.sendBeacon) {
            navigator.sendBeacon(url, body);
          } else {
            fetch(url, { body, method: 'POST', keepalive: true });
          }
        };

        // Initialize web vitals
        getCLS(sendToAnalytics);
        getFID(sendToAnalytics);
        getFCP(sendToAnalytics);
        getLCP(sendToAnalytics);
        getTTFB(sendToAnalytics);
      } catch (error) {
        console.error('Error initializing web vitals:', error);
      }
    };

    // Initialize web vitals
    initWebVitals();
  }, []);

  // No need to render anything
  return null;
}
