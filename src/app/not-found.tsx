import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | OriginalLeeDunn",
  description: "The page you are looking for does not exist or has been moved.",
  robots: "noindex, nofollow",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 text-center">
      <div className="max-w-2xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-8xl font-bold text-primary">404</h1>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has
            been moved.
          </p>
        </div>
        <div className="pt-2">
          <Button asChild size="lg" className="group">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
