# Blog Management System

This document outlines the blog management system for the OriginalLeeDunn.me website, including how to create, validate, and manage blog posts.

## Table of Contents

- [Creating a New Blog Post](#creating-a-new-blog-post)
- [Validating Blog Posts](#validating-blog-posts)
- [Generating Placeholder Images](#generating-placeholder-images)
- [Blog Post Frontmatter](#blog-post-frontmatter)
- [Image Standards](#image-standards)
- [Development Workflow](#development-workflow)

## Creating a New Blog Post

Use the `new-post` script to create a new blog post with the proper frontmatter and directory structure:

```bash
# Create a new published post with tags
npm run new-post "My Awesome Blog Post" -- --tags "web development,nextjs"

# Create a draft post
npm run new-post "Draft Post" -- --draft

# Specify a custom publish date
npm run new-post "Scheduled Post" -- --date "2025-07-01"
```

This will:

1. Create a new `.mdx` file in `src/app/blog/posts/`
2. Generate a placeholder featured image
3. Open the file in your default editor (if available)

## Validating Blog Posts

To validate all blog posts for proper frontmatter and content:

```bash
npm run blog:validate
```

This checks for:

- Required frontmatter fields
- Valid date formats
- Existing cover images
- Proper tag formatting

## Generating Placeholder Images

To generate placeholder images for all blog posts:

```bash
npm run blog:generate-images
```

This will create placeholder images for any posts that don't already have a cover image.

## Blog Post Frontmatter

Each blog post should include the following frontmatter:

```yaml
---
title: "Your Blog Post Title"
date: "2025-01-01"
description: "A short description for SEO and social sharing"
excerpt: "A brief excerpt displayed in blog listings"
coverImage: "/images/posts/your-post-slug-featured.jpg"
tags: ["tag1", "tag2", "tag3"]
draft: false
---
```

## Image Standards

- **Featured Images**: 1200×630 pixels (16:9 aspect ratio)
- **Location**: `/public/images/posts/`
- **Naming**: `{post-slug}-featured.jpg`
- **Format**: JPEG or WebP (WebP recommended for better performance)
- **Optimization**: Run `npm run optimize` to optimize all images

## Development Workflow

1. Create a new post: `npm run new-post "My Post"`
2. Write your content in the generated `.mdx` file
3. Add your featured image to `/public/images/posts/`
4. Validate the post: `npm run blog:validate`
5. Run the development server: `npm run dev`
6. Test your changes locally
7. Commit and push your changes

## Deployment

When you push to the main branch, the site will be automatically deployed. The deployment process will:

1. Install dependencies
2. Build the site
3. Optimize images
4. Deploy to production

## Troubleshooting

- **Missing Dependencies**: Run `npm install` to install all required packages
- **Image Issues**: Ensure images are in the correct directory and properly referenced in the frontmatter
- **Frontmatter Errors**: Use `npm run blog:validate` to identify and fix any issues

---

For any questions or issues, please refer to the project documentation or open an issue in the repository.
