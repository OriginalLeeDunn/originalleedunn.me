'use client';

import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Logo } from "./Logo";

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  // Additional footer-specific props can be added here
}

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/OriginalLeeDunn",
    icon: Github,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/OriginalLeeDunn",
    icon: Twitter,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/leedunn",
    icon: Linkedin,
  },
  {
    name: "Email",
    url: "mailto:hello@originalleedunn.me",
    icon: Mail,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const Footer = ({ className, ...props }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className={cn(
        "w-full border-t border-border/40 bg-background/80 backdrop-blur-sm mt-16",
        className
      )}
      {...(props as React.ComponentProps<typeof motion.footer>)}
    >
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-4">
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center space-x-2">
              <Logo size="sm" className="text-2xl" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                OriginalLeeDunn
              </span>
            </div>
            <p className="text-foreground/70 text-sm">
              Full-Stack Developer & Creative Technologist
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-accent transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">
              Navigation
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "/#home" },
                { name: "About", href: "/#about" },
                { name: "Projects", href: "/projects" },
                { name: "Blog", href: "/blog" },
                { name: "Contact", href: "/#contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-foreground/60 hover:text-accent transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">
              Legal
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Cookie Policy", href: "/cookies" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-foreground/60 hover:text-accent transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">
              Get in Touch
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:hello@originalleedunn.me"
                  className="text-foreground/60 hover:text-accent transition-colors text-sm flex items-center"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  hello@originalleedunn.me
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/OriginalLeeDunn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-accent transition-colors text-sm flex items-center"
                >
                  <Github className="mr-2 h-4 w-4" />
                  @OriginalLeeDunn
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          variants={itemVariants}
          className="border-t border-border/40 py-6 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-foreground/60 text-sm">
            &copy; {currentYear} OriginalLeeDunn. All rights reserved.
          </p>
          <p className="text-foreground/40 text-xs mt-2 md:mt-0">
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
