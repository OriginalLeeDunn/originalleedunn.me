"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, List, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

type BlogMobileNavProps = {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  readingTime: number;
  currentPostSlug: string;
  onTocClick?: () => void;
};

export function BlogMobileNav({ 
  isOpen, 
  onClose, 
  content, 
  readingTime, 
  currentPostSlug, 
  onTocClick 
}: BlogMobileNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(isOpen);
  }, [isOpen]);

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    if (!newState && onClose) {
      onClose();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsMenuOpen(false);
    if (onClose) {
      onClose();
    }
  };

  if (!isScrolled) return null;

  return (
    <div className="fixed bottom-6 right-4 z-40 flex flex-col items-end gap-2 md:hidden">
      <div
        className={cn(
          "flex flex-col gap-2 transition-all duration-200 ease-in-out",
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none",
        )}
      >
        <Button
          variant="primary"
          size="sm"
          className="w-full justify-start gap-2"
          onClick={onTocClick}
          aria-label="Table of contents"
        >
          <List className="h-5 w-5" />
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="h-12 w-12 rounded-full shadow-lg"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
    </div>
  );
}
