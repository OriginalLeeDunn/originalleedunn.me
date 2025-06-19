"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="p-6 space-y-4 max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 text-destructive">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold">Something went wrong!</h2>
        <p className="text-muted-foreground">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <div className="flex justify-center pt-4">
          <Button onClick={() => reset()} className="group">
            <RefreshCw className="w-4 h-4 mr-2 transition-transform group-hover:rotate-180" />
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
