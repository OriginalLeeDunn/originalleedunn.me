"use client";

import { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, Check, Loader2 } from "lucide-react";
import { Section } from "@/components/Section";
import { socialLinks, contactInfo } from "@/config/socialLinks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type FormData = {
  name: string;
  email: string;
  message: string;
};

type SocialLink = {
  name: string;
  url: string;
  icon: ReactNode;
  color: string;
};

type ContactInfo = {
  email: string;
  location: string;
  availability: string;
  services: string[];
};

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-background to-muted/5"
      containerClass="relative z-10"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]">
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {/* Left Column - Contact Form */}
        <motion.div variants={item} className="h-full">
          <Card className="h-full border-border/20 bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Send Me a Message
              </CardTitle>
              <CardDescription>
                Have a question or want to work together? Fill out the form
                below and I&apos;ll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {status === "success" ? (
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-500 flex items-center gap-3">
                  <Check className="w-5 h-5" />
                  <p>Your message has been sent successfully!</p>
                </div>
              ) : status === "error" ? (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500">
                  Something went wrong. Please try again later.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message"
                      rows={5}
                      required
                      className="w-full"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full mt-2"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column - Contact Info */}
        <motion.div variants={item} className="h-full">
          <Card className="h-full border-border/20 bg-background/50 backdrop-blur-sm flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Contact Information
              </CardTitle>
              <CardDescription>
                Feel free to reach out through any of these channels.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-muted-foreground text-sm">
                      {contactInfo.location}
                    </p>
                    <p className="text-muted-foreground/80 text-xs mt-1">
                      {contactInfo.availability}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border/20">
                <h3 className="font-medium mb-3">Services</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {contactInfo.services.map((service, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center text-muted-foreground text-sm py-1"
                      initial={{ opacity: 0, y: 5 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.05 * index }}
                    >
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></span>
                      <span className="truncate hover:text-foreground transition-colors">
                        {service}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border/20">
                <h3 className="font-medium mb-3">Connect With Me</h3>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      style={{
                        color: link.color,
                      }}
                      aria-label={link.name}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </Section>
  );
}
