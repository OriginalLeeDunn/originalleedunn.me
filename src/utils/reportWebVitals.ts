export const reportWebVitals = (metric: any) => {
  // Log in development
  if (process.env.NODE_ENV === "development") {
    console.log(metric);
  }

  // Send to analytics in production
  if (
    process.env.NODE_ENV === "production" &&
    typeof window.gtag === "function"
  ) {
    window.gtag("event", "web_vitals", {
      event_category: "Web Vitals",
      event_value: Math.round(metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
      metric_name: metric.name,
    });
  }
};
