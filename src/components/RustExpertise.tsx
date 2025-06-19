"use client";

import { Code, Cpu, Database, Rocket, Terminal, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const rustStack = [
  {
    name: "Bevy",
    description:
      "For building fast and reliable game engines and data-driven applications",
    icon: <Cpu className="w-6 h-6 text-orange-500" />,
  },
  {
    name: "Rocket",
    description:
      "For building fast, type-safe web applications with a focus on security",
    icon: <Rocket className="w-6 h-6 text-purple-500" />,
  },
  {
    name: "SurrealDB",
    description:
      "For scalable, distributed databases with real-time sync capabilities",
    icon: <Database className="w-6 h-6 text-blue-500" />,
  },
  {
    name: "Tauri",
    description: "For building secure, cross-platform desktop applications",
    icon: <Terminal className="w-6 h-6 text-green-500" />,
  },
  {
    name: "Yew",
    description:
      "For creating fast and reliable frontend web applications with Rust",
    icon: <Code className="w-6 h-6 text-yellow-500" />,
  },
  {
    name: "Performance",
    description:
      "Leveraging Rust's zero-cost abstractions for high-performance applications",
    icon: <Zap className="w-6 h-6 text-red-500" />,
  },
];

export function RustExpertise() {
  return (
    <section className="py-12 bg-muted/50 dark:bg-background/80">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">My Rust Journey</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            I&apos;m passionate about Rust and its ecosystem. Here are some of the
            technologies I work with:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rustStack.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                  <div className="p-2 rounded-full bg-muted">{item.icon}</div>
                  <CardTitle className="text-xl">{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Interested in Rust or want to collaborate on a project?
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Let&apos;s Build Something Amazing
          </a>
        </div>
      </div>
    </section>
  );
}
