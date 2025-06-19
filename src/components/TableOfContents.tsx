"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;

    const headingElements = Array.from(
      article.querySelectorAll<HTMLHeadingElement>("h2, h3"),
    );

    const headingsData = headingElements.map((heading) => ({
      id: heading.id,
      text: heading.textContent || "",
      level: parseInt(heading.tagName.substring(1)),
    }));

    setHeadings(headingsData);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0% 0% -80% 0%",
        threshold: 0.1,
      },
    );

    headingElements.forEach((heading) => {
      observer.observe(heading);
    });

    return () => {
      headingElements.forEach((heading) => {
        observer.unobserve(heading);
      });
    };
  }, []);

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className={cn("sticky top-24", className)}>
      <div className="mb-4 text-sm font-medium text-muted-foreground">
        On this page
      </div>
      <nav className="space-y-2">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={cn(
              "block text-sm transition-colors hover:text-foreground",
              heading.level === 3 ? "ml-4" : "",
              activeId === heading.id
                ? "text-primary font-medium"
                : "text-muted-foreground",
            )}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(heading.id)?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
