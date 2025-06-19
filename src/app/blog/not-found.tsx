import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-gradient-to-b from-background to-muted/50">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-semibold">Blog Not Found</h2>
        <p className="text-muted-foreground">
          The blog post you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="pt-6">
          <Button asChild>
            <Link href="/" className="text-sm font-medium">
              Return Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
