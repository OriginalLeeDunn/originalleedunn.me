"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  language?: string;
}

export function CodeBlock({
  children,
  className = "",
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const code = String(children).replace(/\n$/, "");
  const detectedLanguage = props.language || className.replace(/language-/, "") || "text";

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6">
      <div className="flex items-center justify-between bg-muted/50 border-b border-border px-4 py-2 rounded-t-lg">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground">
            {detectedLanguage}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleCopy}
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          <span className="sr-only">Copy code</span>
        </Button>
      </div>
      <pre
        className={`bg-muted/50 p-4 overflow-x-auto text-sm rounded-b-lg ${className}`}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
