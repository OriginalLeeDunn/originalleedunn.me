import { useEffect, useState } from "react";
import Image from "next/image";

type TypingTextProps = {
  text: string;
  delay?: number;
  className?: string;
};

const TypingText = ({ text, delay = 0, className = "" }: TypingTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(
        () => {
          setDisplayText((prev) => prev + text[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        },
        50 + Math.random() * 30,
      );

      return () => clearTimeout(timeout);
    } else if (currentIndex === text.length) {
      // Blinking cursor effect after typing is complete
      const cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 500);

      return () => clearInterval(cursorInterval);
    }
  }, [currentIndex, text]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      {displayText}
      <span
        className={`terminal-cursor ${
          showCursor ? "opacity-100" : "opacity-0"
        }`}
      />
    </span>
  );
};

export default function Hero() {
  const [showContent, setShowContent] = useState(false);
  const [showMonogram, setShowMonogram] = useState(false);

  useEffect(() => {
    // Initial delay for monogram animation
    const monogramTimer = setTimeout(() => {
      setShowMonogram(true);
    }, 500);

    // Show content after monogram animation starts
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 1500);

    return () => {
      clearTimeout(monogramTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden tech-grid">
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/technology-background-ui-trading-lines-blue-and-yellow-network-with-connecting-dots-polygons-ai-generated-photo.webp"
          alt="Tech background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container relative z-10 px-4 py-20 mx-auto text-center">
        <div className="flex flex-col items-center justify-center">
          {/* Monogram */}
          <div
            className={`transition-all duration-1000 transform ${
              showMonogram ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <div className="relative w-48 h-48 mx-auto mb-8 md:w-64 md:h-64">
              <Image
                src="/Technological Monogram with Retro Vibes.png"
                alt="O.L.D. Monogram"
                fill
                className="monogram object-contain"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-300 ${
              showContent
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="glow">
              <TypingText
                text="Original Lee Dunn"
                className="text-4xl md:text-6xl lg:text-7xl"
              />
            </h1>

            <div className="text-xl md:text-2xl text-muted-foreground">
              <TypingText
                text="Building AI-powered systems and indie games from the ground up."
                delay={1500}
                className="inline-block max-w-2xl"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <a
                href="#projects"
                className="btn btn-primary px-8 py-3 text-lg font-semibold"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="btn btn-outline px-8 py-3 text-lg font-semibold"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-secondary rounded-full flex justify-center">
          <div className="w-1 h-2 bg-secondary rounded-full mt-2 animate-scroll"></div>
        </div>
      </div>
    </section>
  );
}
