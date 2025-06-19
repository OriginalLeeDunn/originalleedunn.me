"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  animated?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const sizeClasses = {
  sm: "text-2xl",
  md: "text-3xl md:text-4xl",
  lg: "text-4xl md:text-5xl",
  xl: "text-5xl md:text-6xl",
};

const getLetterColor = (i: number) => ["#B7410E", "#39FF14", "#B7410E"][i % 3]; // Only use orange and green

const letterVariants = {
  initial: (i: number) => ({
    opacity: 0,
    y: 20,
    color: getLetterColor(i)
  }),
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    color: getLetterColor(i),
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
  hover: (i: number) => ({
    color: getLetterColor(i),
    scale: 1.1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  }),
};

export function Logo({ 
  className, 
  animated = true, 
  size = "md",
  href = "/",
  onClick,
  ...props 
}: LogoProps) {
  const letters = "OLD".split("");
  
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e);
    }
  };

  const logoContent = (
    <div className={cn("inline-flex items-center", className)}>
      {animated ? (
        <motion.span 
          className="inline-flex"
          initial="initial"
          animate="animate"
        >
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              whileHover="hover"
              className="inline-block"
              style={{ marginRight: i < 2 ? '0.15em' : 0 }} // Add letter spacing between characters
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>
      ) : (
        <span className="inline-flex">
          {letters.map((letter, i) => (
            <span
              key={i}
              className={cn(
                "inline-block",
                i === 0 ? "text-[#B7410E]" : 
                i === 1 ? "text-[#39FF14]" : 
                "text-[#B7410E]"
              )}
              style={{ marginRight: i < 2 ? '0.15em' : 0 }} // Add letter spacing between characters
            >
              {letter}
            </span>
          ))}
        </span>
      )}
      <span className="ml-2 hidden sm:inline text-foreground/80 group-hover:text-foreground transition-colors">
        OriginalLeeDunn
      </span>
    </div>
  );

  if (href) {
    return (
      <Link 
        href={href} 
        className="group block"
        onClick={handleClick}
        {...props}
      >
        {logoContent}
      </Link>
    );
  }

  return (
    <div 
      className={cn(
        "font-bold tracking-tight cursor-pointer select-none px-2 md:px-4", // Added horizontal padding for better spacing
        sizeClasses[size],
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {logoContent}
    </div>
  );
}
