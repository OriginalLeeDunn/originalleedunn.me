#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { format, addDays } from "date-fns";
import { Command } from "commander";

const program = new Command();

program
  .name("new-post")
  .description("Create a new blog post with frontmatter")
  .argument("<title>", "Title of the blog post")
  .option("-d, --draft", "Mark post as draft", false)
  .option("-t, --tags <tags...>", "Comma-separated list of tags")
  .option("--date <date>", "Publication date (YYYY-MM-DD)")
  .action((title, options) => {
    createNewPost(title, options);
  });

program.parse(process.argv);

async function createNewPost(title: string, options: any) {
  // Format the slug from the title
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  // Set default values
  const isDraft = options.draft || false;
  const tags = options.tags || [];
  const date = options.date || format(new Date(), "yyyy-MM-dd");

  // Format the date for display
  const formattedDate = format(new Date(date), "MMMM d, yyyy");

  // Create the frontmatter
  const frontmatter = `---
title: "${title}"
date: "${date}"
description: "A detailed post about ${title}"
excerpt: "A brief summary of the ${title} post"
coverImage: "/images/posts/${slug}-featured.jpg"
tags: [${tags.map((t: string) => `"${t.trim()}"`).join(", ")}]
draft: ${isDraft}
---

# ${title}

<!-- Start writing your post here -->

## Introduction

## Main Content

## Conclusion

## References`;

  // Create the directory if it doesn't exist
  const postsDir = path.join(process.cwd(), "src/app/blog/posts");
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }

  // Create the post file
  const filePath = path.join(postsDir, `${slug}.mdx`);

  if (fs.existsSync(filePath)) {
    console.error(`Error: A post with the slug "${slug}" already exists.`);
    process.exit(1);
  }

  fs.writeFileSync(filePath, frontmatter);
  console.log(`Created new blog post: ${filePath}`);

  // Create images directory if it doesn't exist
  const imagesDir = path.join(process.cwd(), "public/images/posts");
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
    console.log(`Created images directory: ${imagesDir}`);
  }

  // Generate a placeholder image
  try {
    const { createCanvas } = await import("canvas");
    const width = 1200;
    const height = 630;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Draw background
    ctx.fillStyle = "#0F172A";
    ctx.fillRect(0, 0, width, height);

    // Add title text
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 48px Arial";
    ctx.textAlign = "center";

    // Split title into multiple lines if needed
    const words = title.split(" ");
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const testLine = currentLine + " " + word;
      const metrics = ctx.measureText(testLine);

      if (metrics.width < width - 100) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);

    // Draw lines of text
    const lineHeight = 60;
    const startY = (height - lines.length * lineHeight) / 2;

    lines.forEach((line, i) => {
      ctx.fillText(line, width / 2, startY + i * lineHeight);
    });

    // Add author and date
    ctx.font = "24px Arial";
    ctx.fillText(`by Lee Dunn • ${formattedDate}`, width / 2, height - 50);

    // Save the image
    const buffer = canvas.toBuffer("image/jpeg");
    fs.writeFileSync(path.join(imagesDir, `${slug}-featured.jpg`), buffer);
    console.log(
      `Generated placeholder image: ${imagesDir}/${slug}-featured.jpg`,
    );
  } catch (error) {
    console.warn(
      "Could not generate placeholder image. Make sure canvas is installed.",
    );
    console.warn("Run: npm install canvas");
  }

  // Open the file in the default editor
  try {
    const editor = process.env.EDITOR || "code";
    execSync(`${editor} ${filePath}`, { stdio: "inherit" });
  } catch (error) {
    console.log(`Open ${filePath} in your editor to start writing.`);
  }
}
