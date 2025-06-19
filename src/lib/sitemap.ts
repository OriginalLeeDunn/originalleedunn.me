import fs from "fs";
import path from "path";
import { glob } from "glob";

// Import types from next
import type { MetadataRoute } from "next";

const BASE_URL = "https://originalleedunn.me";
const BLOG_DIR = path.join(process.cwd(), "src/app/blog/posts");

interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
}

type ChangeFreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  try {
    // Add blog posts
    const postFiles = await glob("**/*.mdx", { cwd: BLOG_DIR });

    for (const file of postFiles) {
      try {
        const filePath = path.join(BLOG_DIR, file);
        const stats = await fs.promises.stat(filePath);

        sitemap.push({
          url: `${BASE_URL}/blog/${file.replace(/\.mdx$/, "")}`,
          lastModified: stats.mtime,
          changeFrequency: "weekly" as const,
          priority: 0.9,
        });
      } catch (error) {
        console.error(`Error processing file ${file}:`, error);
        continue;
      }
    }
  } catch (error) {
    console.error("Error generating blog post sitemap entries:", error);
  }

  return sitemap;
}

export function generateSitemapXml(sitemap: MetadataRoute.Sitemap): string {
  const urls = sitemap
    .map((entry) => {
      const lastmod =
        entry.lastModified instanceof Date
          ? entry.lastModified.toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0];

      return `
    <url>
      <loc>${entry.url}</loc>
      <lastmod>${lastmod}</lastmod>
      ${entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : ""}
      ${entry.priority ? `<priority>${entry.priority}</priority>` : ""}
    </url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;
}
