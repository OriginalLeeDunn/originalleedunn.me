import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/", "/_vercel/"],
    },
    sitemap: "https://originalleedunn.me/sitemap.xml",
  };
}
