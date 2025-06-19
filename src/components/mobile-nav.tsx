"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Moon, Sun, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { Logo } from "./Logo";
import { handleAnchorClick } from "@/lib/smooth-scroll";

const NAV_ITEMS = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/#contact" },
];

const menuVariants = {
  closed: {
    x: "-100%",
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const navItemVariants = {
  closed: { opacity: 0, x: -20 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1 + i * 0.05,
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" && window.location.hash === href;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className="md:hidden">
      {/* Mobile menu button */}
      <button
        onClick={toggleMenu}
        className="inline-flex items-center justify-center p-2 rounded-md text-foreground/70 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Menu className="h-6 w-6" aria-hidden="true" />
        )}
      </button>

      {/* Mobile menu overlay and panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
              onClick={toggleMenu}
            />
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-background shadow-2xl overflow-y-auto"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex flex-col h-full p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <Logo 
                    href="/" 
                    size="md" 
                    onClick={(e) => {
                      if (pathname === "/") {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setIsOpen(false);
                      }
                    }}
                  />
                  <button
                    onClick={toggleMenu}
                    className="p-2 -mr-2 rounded-md text-foreground/70 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
                  >
                    <X className="h-6 w-6" aria-hidden="true" />
                    <span className="sr-only">Close menu</span>
                  </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1">
                  <ul className="space-y-6 py-4">
                    {NAV_ITEMS.map((item, i) => {
                      const active = isActive(item.href);
                      return (
                        <motion.li 
                          key={item.name}
                          custom={i}
                          variants={navItemVariants}
                          initial="closed"
                          animate="open"
                        >
                          <Link
                            href={item.href}
                            onClick={(e) => {
                              if (item.href.startsWith('#')) {
                                handleAnchorClick(e);
                              }
                              setIsOpen(false);
                            }}
                            className={cn(
                              "block py-3 text-xl font-medium transition-colors",
                              active
                                ? "text-accent"
                                : "text-foreground/80 hover:text-foreground"
                            )}
                          >
                            <div className="flex items-center">
                              <span className="relative">
                                {item.name}
                                <span 
                                  className={cn(
                                    "absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300",
                                    active ? "w-full" : "group-hover/nav-link:w-full"
                                  )}
                                />
                              </span>
                            </div>
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Footer */}
                <div className="pt-8 mt-auto border-t border-border/40">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/70">Theme</span>
                    <ThemeToggle variant="outline" size="sm" />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
