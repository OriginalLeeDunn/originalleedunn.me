import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";
import { BlogPostContent } from "@/components/BlogPostContent";
import SpaceBackground from "@/components/ui/SpaceBackground";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const title = `${post.meta.title} | OriginalLeeDunn`;
  const description = post.meta.description || post.meta.excerpt || "";
  const url = `https://originalleedunn.me/blog/${params.slug}`;
  const image = post.meta.coverImage
    ? `https://originalleedunn.me${post.meta.coverImage}`
    : "https://originalleedunn.me/og-image.jpg";

  return {
    title,
    description,
    openGraph: {
      title: post.meta.title,
      description,
      type: "article",
      publishedTime: post.meta.date,
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.meta.title,
        },
      ],
      siteName: "OriginalLeeDunn",
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description,
      images: [image],
      creator: "@leedunn",
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  const allPosts = await getAllPosts();

  if (!post) {
    notFound();
  }

  return (
    <div className="relative min-h-screen">
      <SpaceBackground />
      <div className="relative z-10">
        <BlogPostContent post={post} slug={params.slug} allPosts={allPosts} />
      </div>
    </div>
  );
}
