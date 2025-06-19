import { Metadata } from "next";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { RustExpertise } from "@/components/RustExpertise";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Me | OriginalLeeDunn",
  description:
    "Learn more about my background, skills, and experience with Rust, web development, and more",
};

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="flex flex-col items-center text-center mb-12">
            <div className="relative w-40 h-40 mb-6 rounded-full overflow-hidden border-4 border-primary/30">
              <Image
                src="/images/avatar.gif"
                alt="Lee Dunn"
                width={160}
                height={160}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>
            <h1 className="text-4xl font-bold mb-4">About Me</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Rust & Web Developer | AI Enthusiast | Creative Problem Solver
            </p>
            <div className="mt-6 flex gap-4">
              <Button asChild>
                <a href="#contact" className="group">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/blog" className="group">
                  Read My Blog
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>

          <Card className="p-8">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-3xl font-bold mb-6">Hello! I&apos;m Lee Dunn</h2>
              <p className="text-lg leading-relaxed mb-6">
                I&apos;m a passionate developer with a deep love for Rust and modern
                web technologies. My journey in software development has been
                driven by a curiosity to build fast, reliable, and secure
                applications that make a difference.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">
                My Journey with Rust
              </h3>
              <p className="mb-6">
                Rust has become my language of choice for its performance,
                safety guarantees, and expressive type system. I&apos;ve been
                actively working with the Rust ecosystem, contributing to
                open-source projects and building applications that leverage its
                strengths in systems programming, web development, and beyond.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">
                Skills & Expertise
              </h3>
              <div className="mb-8">
                <h4 className="text-lg font-medium mb-2">Rust Stack</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    "Rust",
                    "Bevy",
                    "Rocket",
                    "SurrealDB",
                    "Tauri",
                    "Yew",
                    "Actix",
                    "Tokio",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-orange-500/10 text-orange-500 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <h4 className="text-lg font-medium mb-2 mt-4">
                  Web Technologies
                </h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    "TypeScript",
                    "React",
                    "Next.js",
                    "Node.js",
                    "GraphQL",
                    "PostgreSQL",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <h4 className="text-lg font-medium mb-2 mt-4">
                  DevOps & Cloud
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Docker",
                    "Kubernetes",
                    "AWS",
                    "GitHub Actions",
                    "Terraform",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-purple-500/10 text-purple-500 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <h3 className="text-2xl font-semibold mt-8 mb-4">
                Professional Experience
              </h3>
              <div className="space-y-8">
                <div>
                  <h4 className="text-xl font-semibold">
                    Tech 1 - Application Services
                  </h4>
                  <p className="text-muted-foreground">
                    Nordstrom • Oct 2021 - Present
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li>
                      Developed and maintained internal applications using Rust
                      and TypeScript
                    </li>
                    <li>
                      Implemented CI/CD pipelines with GitLab CI for
                      automated testing and deployment
                    </li>
                    <li>
                      Optimized database queries and application performance
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-semibold">Tech 1 Contractor</h4>
                  <p className="text-muted-foreground">
                    Nordstrom • Mar 2020 - Oct 2021
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li>
                      Provided technical support and troubleshooting for
                      internal applications and devices 
                    </li>
                    <li>
                      Collaborated with development teams to improve user
                      experience
                    </li>
                    <li>
                      Documented processes and created knowledge base articles in ServiceNow && Confluence
                    </li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mt-12 mb-6">Education</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold">
                    Self-taught Programmer
                  </h4>
                  <p className="text-muted-foreground">
                    Self-taught, 2024
                  </p>
                  <p className="mt-1">
                    Focus on Systems Programming and Distributed Systems
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <RustExpertise />
    </div>
  );
}
