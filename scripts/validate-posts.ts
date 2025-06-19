import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post, PostMeta } from "@/lib/posts";

const POSTS_DIR = path.join(process.cwd(), "src/app/blog/posts");
const PUBLIC_IMAGES_DIR = path.join(process.cwd(), "public/images/posts");

// Required fields for each post
const REQUIRED_FIELDS = [
  "title",
  "date",
  "excerpt",
  "description",
  "tags",
  "coverImage",
] as const;

// Validate a single post
function validatePost(filePath: string): {
  valid: boolean;
  errors: string[];
  post: Partial<Post>;
} {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  const errors: string[] = [];
  const slug = path.basename(filePath, ".mdx");

  // Check required fields
  for (const field of REQUIRED_FIELDS) {
    if (!data[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  // Validate date format
  if (data.date) {
    try {
      const date = new Date(data.date);
      if (isNaN(date.getTime())) {
        errors.push(`Invalid date format: ${data.date}. Use YYYY-MM-DD`);
      }
    } catch (e) {
      errors.push(`Error parsing date: ${data.date}`);
    }
  }

  // Validate cover image exists
  if (data.coverImage) {
    const imagePath = path.join(process.cwd(), "public", data.coverImage);
    if (!fs.existsSync(imagePath)) {
      errors.push(`Cover image not found: ${data.coverImage}`);
    }
  }

  // Validate tags are an array
  if (data.tags && !Array.isArray(data.tags)) {
    errors.push("Tags must be an array of strings");
  }

  return {
    valid: errors.length === 0,
    errors,
    post: {
      slug,
      content,
      meta: data as PostMeta,
    },
  };
}

// Validate all posts
function validateAllPosts() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.error(`Posts directory not found: ${POSTS_DIR}`);
    process.exit(1);
  }

  if (!fs.existsSync(PUBLIC_IMAGES_DIR)) {
    console.log(`Creating images directory: ${PUBLIC_IMAGES_DIR}`);
    fs.mkdirSync(PUBLIC_IMAGES_DIR, { recursive: true });
  }

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"));
  let hasErrors = false;

  console.log(`\nValidating ${files.length} posts...\n`);

  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file);
    const { valid, errors, post } = validatePost(filePath);

    if (!valid) {
      hasErrors = true;
      console.error(`❌ ${file}`);
      errors.forEach((error) => console.error(`  - ${error}`));
    } else {
      console.log(`✅ ${file}`);
      console.log(`   Title: ${post.meta?.title}`);
      console.log(`   Date: ${post.meta?.date}`);
      console.log(`   Tags: ${post.meta?.tags?.join(", ") || "None"}`);
      console.log(`   Cover: ${post.meta?.coverImage || "None"}\n`);
    }
  }

  if (hasErrors) {
    console.error(
      "\n⚠️  Some posts have validation errors. Please fix them before continuing.",
    );
    process.exit(1);
  }

  console.log("\n🎉 All posts are valid!");
}

// Run the validation
validateAllPosts();
