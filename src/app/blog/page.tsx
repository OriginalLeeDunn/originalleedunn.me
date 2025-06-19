import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/lib/posts";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import SpaceBackground from "@/components/ui/SpaceBackground";

const POSTS_PER_PAGE = 6;

export const metadata = {
  title: "Blog | OriginalLeeDunn",
  description: "Thoughts, tutorials, and insights on Rust, web development, and technology.",
};

interface BlogPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const allPosts = await getAllPosts();

  // Calculate pagination
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const posts = allPosts.slice(startIndex, endIndex);

  return (
    <div className="relative min-h-screen">
      <SpaceBackground />
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-4">
                The Void (Personal Blog)
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Thoughts, tutorials, and insights on Rust, web development, and technology.
              </p>
            </div>

            {posts.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  No posts found
                </h2>
                <p className="text-muted-foreground">
                  Check back later for new content!
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {posts.map((post) => (
                  <Card
                    key={post.slug}
                    className="group hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-primary/30 overflow-hidden"
                  >
                    {post.meta.coverImage && (
                      <div className="h-48 bg-muted/30 overflow-hidden relative">
                        <Image
                          src={post.meta.coverImage}
                          alt={post.meta.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {Array.isArray(post.meta.tags) &&
                          post.meta.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                      <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="hover:underline"
                        >
                          {post.meta.title}
                        </Link>
                      </CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground mt-2">
                        <time
                          dateTime={post.meta.date}
                          className="flex items-center"
                        >
                          <Calendar className="h-4 w-4 mr-1.5" />
                          {format(new Date(post.meta.date), "MMMM d, yyyy")}
                        </time>
                        <span className="mx-2">•</span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1.5" />
                          {Math.ceil(post.content.split(/\s+/).length / 200)} min read
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3">
                        {post.meta.description || post.meta.excerpt}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="link" className="px-0" asChild>
                        <Link href={`/blog/${post.slug}`}>
                          Read more
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center space-x-1" aria-label="Pagination">
                  <Link
                    href={{
                      pathname: "/blog",
                      query: { page: currentPage > 1 ? currentPage - 1 : 1 },
                    }}
                    className={cn(
                      "p-2 rounded-md",
                      currentPage === 1
                        ? "text-muted-foreground cursor-not-allowed"
                        : "text-foreground hover:bg-muted/50",
                    )}
                    aria-disabled={currentPage === 1}
                    tabIndex={currentPage === 1 ? -1 : undefined}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-5 w-5" />
                  </Link>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Link
                      key={page}
                      href={{
                        pathname: "/blog",
                        query: { page },
                      }}
                      className={cn(
                        "px-4 py-2 rounded-md text-sm font-medium",
                        page === currentPage
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-muted/50",
                      )}
                      aria-current={page === currentPage ? "page" : undefined}
                    >
                      {page}
                    </Link>
                  ))}

                  <Link
                    href={{
                      pathname: "/blog",
                      query: {
                        page: currentPage < totalPages ? currentPage + 1 : totalPages,
                      },
                    }}
                    className={cn(
                      "p-2 rounded-md",
                      currentPage === totalPages
                        ? "text-muted-foreground cursor-not-allowed"
                        : "text-foreground hover:bg-muted/50",
                    )}
                    aria-disabled={currentPage === totalPages}
                    tabIndex={currentPage === totalPages ? -1 : undefined}
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                </nav>
              </div>
            )}

            {/* Newsletter Signup */}
            <div className="mt-16 text-center">
              <div className="inline-flex flex-col items-center p-6 border border-border rounded-xl bg-muted/30">
                <h3 className="text-2xl font-semibold mb-4">
                  Stay updated with my latest posts
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Get notified when I publish new articles about Rust, web
                  development, and more.
                </p>
                <Button
                  asChild
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                >
                  <Link href="/#contact">Subscribe to Newsletter</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
