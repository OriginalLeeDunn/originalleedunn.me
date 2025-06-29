'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Github, Linkedin, Twitter, Mail } from "lucide-react";
import { GradientText } from "@/components/gradient-text";
import { CustomSection } from "@/components/CustomSection";
import Projects from "@/components/Projects";
import { ContactSection } from "@/components/ContactSection";
import { useEffect } from "react";
import SpaceBackground from "@/components/ui/SpaceBackground";

export default function Home() {
  useEffect(() => {
    // This ensures the component is mounted before any scroll operations
  }, []);

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <CustomSection 
        id="home" 
        className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-background to-secondary/5"
        containerClass="flex flex-col items-center justify-center h-full"
      >
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-30"></div>
        <SpaceBackground/>
        <div className="container relative z-10 px-4 mx-auto text-center">
          <div className="mb-1.3">
            <div className="inline-flex items-center px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-secondary/10 text-secondary border border-secondary/20">
              <span className="relative flex w-2 h-2 mr-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-secondary/80 animate-ping"></span>
                <span className="relative inline-flex w-2 h-2 rounded-full bg-secondary"></span>
              </span>
              Welcome to my portfolio
            </div>
          </div>
          
          {/* Logo */}
          <div className="relative w-32 h-32 mb-6 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto">
            <Image
              src="/images/logo-Transparent.webp"
              alt="OriginalLeeDunn Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/30 to-accent/30 rounded-xl blur-xl opacity-60 group-hover:opacity-100 transition-all duration-1000 group-hover:duration-200"></div>
            <h1 className="relative mb-2 text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl font-heading">
              <GradientText className="inline-flex items-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary">
                Original
                <Sparkles className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 ml-1 md:ml-2 text-secondary" />
                LeeDunn
              </GradientText>
            </h1>
          </div>

          <p className="max-w-2xl mx-auto mb-8 text-lg leading-relaxed text-muted-foreground/90 md:text-xl">
            AI & Game Developer crafting <span className="font-medium text-secondary">immersive experiences</span> and intelligent
            systems. I turn ideas into reality through code, creativity, and
            <span className="font-medium text-primary"> cutting-edge technology</span>.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="group bg-primary hover:bg-primary/90 text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20"
              onClick={(e) => scrollToSection(e, 'projects')}
            >
              View My Work
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>

            <Button 
              variant="outline" 
              size="lg" 
              className="group border-secondary/40 text-foreground hover:bg-secondary/5 hover:border-secondary/60 hover:text-secondary"
              onClick={(e) => scrollToSection(e, 'contact')}
            >
              Get in Touch
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="flex justify-center gap-4 mt-12">
            <a 
              href="https://github.com/OriginalLeeDunn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a 
              href="https://linkedin.com/in/originalleedunn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="https://twitter.com/OriginalLeeDunn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a 
              href="mailto:OriginalLeeDunn@proton.me" 
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </CustomSection>

      {/* About Section */}
      <CustomSection 
        id="about"
        title="About Me"
        subtitle="Get to know me better"
        className="bg-background/50"
        showDivider
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="mb-6 text-lg text-muted-foreground">
            A <span className="text-primary font-medium">Rust enthusiast</span> and <span className="text-secondary font-medium">full-stack developer</span> with a passion for building high-performance applications. I specialize in creating seamless experiences that blend cutting-edge technology with intuitive design. When I&apos;m not coding, you can find me exploring AI advancements or contributing to open-source projects.
          </p>
          <Button 
            asChild 
            variant="outline" 
            className="mt-4 border-primary/30 hover:bg-primary/10"
          >
            <Link href="/about">
              Learn More
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </CustomSection>

      {/* Projects Section */}
      <CustomSection 
        id="projects"
        title="My Projects"
        subtitle="Some of my recent work"
        className="bg-muted/50"
        showDivider
      >
        <div className="max-w-4xl mx-auto text-center mb-10">
          <p className="text-lg text-muted-foreground">
            Exploring the intersection of <span className="text-primary font-medium">Rust-powered performance</span> and <span className="text-secondary font-medium">modern web technologies</span>.
            Each project showcases my journey in building efficient, scalable solutions with a focus on clean code and user experience.
          </p>
        </div>
        
        <div className="mt-4 text-center">
          <Button 
            asChild 
            variant="outline" 
            className="mt-4 border-primary/30 hover:bg-primary/10"
          >
            <Link href="/projects">
              View All Projects
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </CustomSection>

      {/* Blog Section */}
      <CustomSection 
        id="blog"
        title="Latest Articles"
        subtitle="Thoughts and tutorials on development"
        className="bg-background/50"
        showDivider
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="mb-6 text-lg text-muted-foreground">
            Dive into my <span className="text-primary font-medium">technical writings</span> and <span className="text-secondary font-medium">tutorials</span> where I share insights on Rust, web development, AI, and system design. Each post is crafted to educate and inspire fellow developers on their coding journey.
          </p>
          <Button 
            asChild 
            variant="outline" 
            className="mt-4 border-primary/30 hover:bg-primary/10"
          >
            <Link href="/blog">
              Read the Blog
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </CustomSection>

      {/* Contact Section */}
      <CustomSection 
        id="contact"
        title="Get In Touch"
        subtitle="Let's work together"
        className="bg-muted/50"
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="mb-8 text-lg text-muted-foreground">
            Have a project in mind or want to collaborate? I&apos;m always excited to discuss new opportunities. 
            Whether it&apos;s about <span className="text-primary font-medium">Rust development</span>, 
            <span className="text-secondary font-medium"> web solutions</span>, or just to say hello, 
            I&apos;ll get back to you as soon as possible.
          </p>
          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border/50 shadow-sm">
            <ContactSection />
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Prefer a direct approach? Email me at{' '}
            <a 
              href="mailto:OriginalLeeDunn@proton.me" 
              className="text-primary hover:underline"
            >
              OriginalLeeDunn@proton.me
            </a>
          </p>
        </div>
      </CustomSection>
    </div>
  );
}
