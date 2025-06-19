"use client";

import Image from "next/image";
import { format } from "date-fns";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar as CalendarIcon,
  Clock,
  Tag as TagIcon,
  Share2,
  MessageSquare,
  X,
  Link as LinkIcon,
  ArrowUp,
  ArrowLeft,
} from "lucide-react";
import { TableOfContents } from "@/components/TableOfContents";
import { CodeBlock } from "@/components/CodeBlock";
import { BackToTop } from "@/components/BackToTop";
import { ReadingProgress } from "@/components/ReadingProgress";
import { BlogMobileNav } from "@/components/BlogMobileNav";
import { calculateReadingTime } from "@/lib/utils";
import { formatDate } from "@/lib/utils"
import { cn } from "@/lib/utils"
import { useState } from "react";
import { RelatedPosts } from "@/components/RelatedPosts";
import type { Post } from "@/lib/posts";

// Temporary types for components that need proper definitions
type CodeBlockProps = {
  code: string;
  className?: string;
};

type RelatedPostsProps = {
  posts: Array<{
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    tags: string[];
    coverImage: string;
  }>;
  maxPosts?: number;
};

type TableOfContentsProps = {
  content: string;
};

type BlogMobileNavProps = {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  readingTime: number;
};

interface BlogPostContentProps {
  post: Post;
  slug: string;
  allPosts: Post[];
}

// Type for MDX components
interface MDXComponents {
  [key: string]: React.ComponentType<any>;
}

// Custom components to be used in MDX
const components: MDXComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-bold mt-8 mb-4 text-foreground" {...props} />
  ),
  h2: (
    props: React.HTMLAttributes<HTMLHeadingElement> & {
      children?: React.ReactNode;
    },
  ) => {
    const id =
      typeof props.children === "string"
        ? props.children.toLowerCase().replace(/\s+/g, "-")
        : "";

    return (
      <h2
        id={id}
        className="text-2xl font-semibold mt-8 mb-3 text-foreground pt-4 border-t border-border/40"
        {...props}
      />
    );
  },
  h3: (
    props: React.HTMLAttributes<HTMLHeadingElement> & {
      children?: React.ReactNode;
    },
  ) => {
    const id =
      typeof props.children === "string"
        ? props.children.toLowerCase().replace(/\s+/g, "-")
        : "";

    return (
      <h3
        id={id}
        className="text-xl font-semibold mt-6 mb-3 text-foreground"
        {...props}
      />
    );
  },
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-4 leading-relaxed text-foreground/90" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-primary hover:underline underline-offset-4"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-6 my-4 space-y-2" {...props} />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-6 my-4 space-y-2" {...props} />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed text-foreground/90" {...props} />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-primary/50 pl-4 py-1 my-4 text-foreground/80 italic"
      {...props}
    />
  ),
  code: (
    props: React.HTMLAttributes<HTMLElement> & {
      className?: string;
      children?: React.ReactNode;
    },
  ) => {
    const { className, children } = props;
    const language = className?.replace("language-", "");

    if (!language) {
      return (
        <code className="bg-background/50 px-1.5 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      );
    }

    return (
      <CodeBlock
        className="my-6 rounded-lg overflow-hidden"
        language={language}
      >
        {String(children).replace(/\n$/, "")}
      </CodeBlock>
    );
  },
  pre: (
    props: React.HTMLAttributes<HTMLPreElement> & {
      children?: React.ReactNode;
    },
  ) => (
    <pre
      className="bg-background/50 rounded-lg p-4 my-6 overflow-x-auto"
      {...props}
    >
      {props.children}
    </pre>
  ),
};

// Social share component
const SocialShare = ({ url, title }: { url: string; title: string }) => {
  const shareData = {
    title: title,
    text: `Check out this post: ${title}`,
    url: url,
  };

  const handleShare = async () => {
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="gap-1.5 hover:bg-primary/10 hover:text-primary transition-colors"
        onClick={handleShare}
      >
        <Share2 className="h-4 w-4" />
        <span>Share</span>
      </Button>
      <Button variant="outline" size="icon" asChild>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-blue-500/10 hover:text-blue-500 transition-colors"
          aria-label="Share on Twitter"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
        </a>
      </Button>
    </div>
  );
};

export function BlogPostContent({
  post,
  slug,
  allPosts,
}: BlogPostContentProps) {
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Format posts for related posts component
  const relatedPostsData = allPosts
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      slug: p.slug,
      title: p.meta.title,
      excerpt: p.meta.excerpt || p.meta.description || "",
      date: p.meta.date,
      tags: Array.isArray(p.meta.tags) ? p.meta.tags : [],
      coverImage: p.meta.coverImage || "",
    }));

  // Calculate reading time
  const readingTime = calculateReadingTime(post.content);

  // Format date
  const formattedDate = new Date(post.meta.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const toggleToc = () => {
    setIsTocOpen(!isTocOpen);
  };

  // Canonical URL for the post
  const canonicalUrl = `https://originalleedunn.me/blog/${slug}`;

  // Copy URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(canonicalUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <>
      <ReadingProgress />
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="lg:flex-1">
            <div className="mb-8">
              <Button asChild variant="ghost" className="pl-0 group">
                <Link
                  href="/blog"
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to Blog
                </Link>
              </Button>
            </div>

            <article className="max-w-3xl mx-auto">
              <header className="mb-12">
                <div className="space-y-2 mb-6">
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(post.meta.tags) &&
                      post.meta.tags.slice(0, 3).map((tag) => (
                        <Link
                          key={tag}
                          href={`/blog?tag=${tag.toLowerCase()}`}
                          className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    {post.meta.title}
                  </h1>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <time
                      dateTime={post.meta.date}
                      className="flex items-center"
                    >
                      <CalendarIcon className="h-4 w-4 mr-1.5" />
                      {formattedDate}
                    </time>
                    <span className="mx-2">•</span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1.5" />
                      {readingTime} min read
                    </span>
                  </div>
                </div>

                {post.meta.coverImage && (
                  <div className="relative rounded-xl overflow-hidden mb-8 border border-border/50">
                    <div className="relative w-full aspect-video max-h-[500px]">
                      <Image
                        src={post.meta.coverImage}
                        alt={post.meta.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 border-y border-border/40">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-primary/30 flex-shrink-0">
                      <Image
                        src="/images/avatar.gif"
                        alt="Lee Dunn"
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                        unoptimized
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Lee Dunn</p>
                      <p className="text-xs text-muted-foreground">
                        Rust & Web Developer
                      </p>
                    </div>
                  </div>
                  <div className="w-full sm:w-auto">
                    <SocialShare url={canonicalUrl} title={post.meta.title} />
                  </div>
                </div>
              </header>

              <div className="prose prose-invert max-w-none">
                <MDXRemote source={post.content} components={components} />
              </div>

              <div className="mt-12 pt-8 border-t border-border/40">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                      Enjoyed this article?
                    </h2>
                    <p className="text-muted-foreground">
                      Share it with your network or save it for later!
                    </p>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      className="gap-2 flex-1 sm:flex-none"
                      onClick={copyToClipboard}
                    >
                      <LinkIcon className="h-4 w-4" />
                      {isCopied ? "Copied!" : "Copy Link"}
                    </Button>
                    <SocialShare url={canonicalUrl} title={post.meta.title} />
                  </div>
                </div>

                <div className="mt-12">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Related Posts</h2>
                    <Link
                      href="/blog"
                      className="text-sm font-medium text-primary hover:underline flex items-center"
                    >
                      View all posts{" "}
                      <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
                    </Link>
                  </div>
                  <RelatedPosts posts={relatedPostsData} currentPostSlug={post.slug} />
                </div>
              </div>
            </article>
          </div>

          {/* Table of Contents */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              <div className="bg-muted/30 rounded-lg p-6 border border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-foreground/80">
                    On this page
                  </h3>
                  <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded">
                    {readingTime} min read
                  </span>
                </div>
                <TableOfContents />
              </div>

              <div className="bg-muted/30 rounded-lg p-6 border border-border/50">
                <h3 className="text-sm font-medium text-foreground/80 mb-4">
                  Subscribe
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get the latest posts delivered to your inbox. No spam, ever.
                </p>
                <div className="flex flex-col space-y-2">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="w-full rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <Button className="w-full">Subscribe</Button>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <ArrowUp className="h-4 w-4" />
                Back to top
              </Button>
            </div>
          </div>
        </div>
      </div>

      <BlogMobileNav
        isOpen={isTocOpen}
        onClose={() => setIsTocOpen(false)}
        content={post.content}
        readingTime={readingTime}
        // @ts-ignore - Fix component props later
        currentPostSlug={post.slug}
      />
    </>
  );
}
