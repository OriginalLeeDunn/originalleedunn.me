"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Custom hook for smooth scrolling to sections with offset for fixed header
 * @param offset - The offset in pixels to account for fixed header (default: 80)
 */
export function useSmoothScroll(offset = 80) {
  const pathname = usePathname();

  useEffect(() => {
    // Only run on client-side and if there's a hash in the URL
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash;
      const element = document.querySelector(hash);

      if (element) {
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }

    // Handle manual anchor clicks after initial render
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;

      // Check if the clicked element is an anchor with a hash href
      if (
        target.tagName === "A" &&
        target.getAttribute("href")?.startsWith("#")
      ) {
        e.preventDefault();

        const hash = target.getAttribute("href");
        if (!hash) return;

        const element = document.querySelector(hash);
        if (!element) return;

        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Update URL without causing a page reload
        window.history.pushState(null, "", hash);
      }
    };

    // Add click event listener to the document
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [pathname, offset]);

  return null;
}
