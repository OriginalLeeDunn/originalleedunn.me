import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface RelatedPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags?: string[];
}

interface RelatedPostsProps {
  posts: RelatedPost[];
  currentPostSlug: string;
  className?: string;
}

export function RelatedPosts({
  posts,
  currentPostSlug,
  className,
}: RelatedPostsProps) {
  // Filter out the current post and get up to 3 related posts
  const relatedPosts = posts
    .filter((post) => post.slug !== currentPostSlug)
    .slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className={cn("mt-16 pt-8 border-t border-border", className)}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Related Posts</h2>
        <Button variant="ghost" asChild>
          <Link href="/blog" className="group flex items-center gap-1">
            View all posts
            <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => (
          <article
            key={post.slug}
            className="group relative p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
                {post.tags && post.tags.length > 0 && (
                  <span className="text-muted-foreground">•</span>
                )}
                {post.tags && post.tags.length > 0 && (
                  <span className="text-sm text-muted-foreground">
                    {post.tags[0]}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold leading-snug group-hover:text-primary transition-colors">
                <Link
                  href={`/blog/${post.slug}`}
                  className="absolute inset-0 z-10"
                >
                  <span className="sr-only">{post.title}</span>
                </Link>
                {post.title}
              </h3>
              <p className="text-muted-foreground line-clamp-2 text-sm">
                {post.excerpt}
              </p>
              <div className="flex items-center text-sm font-medium text-primary">
                Read more
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
