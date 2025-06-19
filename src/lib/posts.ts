import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";

const postsDirectory = path.join(process.cwd(), "src/app/blog/posts");

export type PostMeta = {
  title: string;
  date: string;
  excerpt: string;
  description?: string;
  coverImage?: string;
  tags?: string[];
};

export type Post = {
  meta: PostMeta;
  slug: string;
  content: string;
};

export async function getPostBySlug(slug: string): Promise<Post> {
  const realSlug = slug.replace(/\.mdx$/, "");
  const filePath = path.join(postsDirectory, `${realSlug}.mdx`);

  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { content, data } = matter(fileContent);

    // Use the frontmatter from gray-matter directly
    const frontmatter = data as Partial<PostMeta>;

    // Ensure required fields have defaults
    const defaultMeta: PostMeta = {
      title: "Untitled Post",
      date: new Date().toISOString(),
      excerpt: "",
      description: "",
      ...frontmatter,
    };

    // Ensure date is properly formatted
    const meta: PostMeta = {
      ...defaultMeta,
      date: frontmatter?.date
        ? new Date(frontmatter.date).toISOString()
        : defaultMeta.date,
    };

    // Just compile the MDX content without re-parsing frontmatter
    await compileMDX({
      source: content,
      options: { parseFrontmatter: false },
    });

    return {
      meta,
      slug: realSlug,
      content,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    throw new Error(`Failed to load post: ${slug}`);
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    console.log(`Reading posts from directory: ${postsDirectory}`);
    const files = fs.readdirSync(postsDirectory);
    console.log(`Found ${files.length} files in posts directory`);

    const validPosts: Post[] = [];
    const invalidFiles: string[] = [];

    // Process files sequentially to handle errors per file
    for (const file of files) {
      if (!file.endsWith(".mdx")) {
        console.log(`Skipping non-MDX file: ${file}`);
        continue;
      }

      console.log(`Processing file: ${file}`);
      const slug = file.replace(/\.mdx$/, "");

      try {
        const post = await getPostBySlug(slug);
        console.log(`Successfully loaded post: ${slug}`, {
          title: post.meta.title,
          date: post.meta.date,
          excerpt: post.meta.excerpt?.substring(0, 50) + "...",
        });

        // Only include posts with valid titles and dates
        if (
          post.meta.title &&
          post.meta.title !== "Untitled Post" &&
          post.meta.date
        ) {
          validPosts.push(post);
        } else {
          console.warn(`Skipping post ${slug}: Missing or invalid title/date`);
          invalidFiles.push(file);
        }
      } catch (error) {
        console.error(`Error processing file ${file}:`, error);
        invalidFiles.push(file);
        // Continue with other files even if one fails
      }
    }

    console.log(`Successfully loaded ${validPosts.length} valid posts`);
    if (invalidFiles.length > 0) {
      console.warn(
        `Failed to load ${invalidFiles.length} files:`,
        invalidFiles,
      );
    }

    if (validPosts.length === 0) {
      console.warn(
        "No valid posts were loaded. Check the logs above for errors.",
      );
      return [];
    }

    // Sort posts by date in descending order
    const sortedPosts = validPosts.sort((a, b) => {
      try {
        const dateA = new Date(a.meta.date).getTime();
        const dateB = new Date(b.meta.date).getTime();
        return dateB - dateA;
      } catch (error) {
        console.error("Error sorting posts by date:", error);
        return 0;
      }
    });

    return sortedPosts;
  } catch (error) {
    console.error("Error reading posts directory:", error);
    return [];
  }
}
