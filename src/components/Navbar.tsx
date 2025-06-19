"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState, useEffect } from "react";
import { Logo } from "./Logo";
import { handleAnchorClick } from "@/lib/smooth-scroll";

type NavItem = {
  name: string;
  href: string;
  external?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/#contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [isOpen, setIsOpen] = useState(false);

  // Handle scroll effect for navbar and active section
  useEffect(() => {
    const handleScroll = () => {
      // Update navbar background on scroll
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      let currentSection = activeSection;
      
      sections.forEach((section) => {
        const sectionElement = section as HTMLElement;
        const sectionTop = sectionElement.offsetTop - 100;
        const sectionHeight = sectionElement.offsetHeight;
        const sectionId = `#${section.id}`;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentSection = sectionId;
        }
      });
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    // Initial scroll check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled, activeSection]);

  const isActive = (href: string) => {
    if (href.startsWith("#")) {
      return activeSection === href;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      handleAnchorClick(e);
      setIsOpen(false);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled 
          ? "bg-background/90 backdrop-blur-md shadow-sm py-2 border-border/50" 
          : "py-4 border-transparent",
      )}
    >
      <div className="container flex items-center justify-between px-4 mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <Logo 
            href="/" 
            size="md" 
            className="group"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavLinkClick(e, item.href)}
                className={cn(
                  "relative text-sm font-medium transition-all px-3 py-2 rounded-md group/nav-link",
                  active
                    ? "text-accent"
                    : "text-foreground/80 hover:text-foreground"
                )}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
              >
                <span className="relative">
                  {item.name}
                  <span 
                    className={cn(
                      "absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300",
                      active ? "w-full" : "group-hover/nav-link:w-full"
                    )}
                  />
                </span>
              </Link>
            );
          })}
          
          <div className="ml-2">
            <ThemeToggle variant="ghost" size="sm" />
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <ThemeToggle className="mr-2" />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md text-foreground/80 hover:text-foreground focus:outline-none"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavLinkClick(e, item.href)}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                    active
                      ? "bg-accent/10 text-accent font-semibold"
                      : "text-foreground/80 hover:bg-accent/10 hover:text-foreground"
                  )}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
