import {
  Github,
  Linkedin,
  Twitter,
  Twitch,
  Mail,
  Youtube,
  MessageCircle,
  MessageSquare,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import React from "react";

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactElement;
  color: string;
}

interface ContactInfo {
  email: string;
  location: string;
  availability: string;
  services: string[];
}

// Create icon component with proper typing
const createIcon = (Icon: LucideIcon): React.ReactElement => {
  return (
    <span className="inline-block w-5 h-5">
      <Icon size={20} className="inline-block" />
    </span>
  );
};

// Social links data
export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/OriginalLeeDunn",
    icon: createIcon(Github),
    color: "hover:text-purple-500",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/OriginalLeeDunn",
    icon: createIcon(Linkedin),
    color: "hover:text-blue-600",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/OriginalLeeDunn",
    icon: createIcon(Twitter),
    color: "hover:text-sky-500",
  },
  {
    name: "Twitch",
    url: "https://twitch.tv/OriginalLeeDunn",
    icon: createIcon(Twitch),
    color: "hover:text-purple-600",
  },
  {
    name: "Email",
    url: "mailto:OriginalLeeDunn@proton.me",
    icon: createIcon(Mail),
    color: "hover:text-red-500",
  },
  {
    name: "Discord",
    url: "https://discord.gg/7AAz6tavfN",
    icon: createIcon(MessageCircle),
    color: "hover:text-indigo-500",
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@OriginalLeeDunn",
    icon: createIcon(Youtube),
    color: "hover:text-red-600",
  },
  {
    name: "TikTok",
    url: "https://tiktok.com/@OriginalLeeDunn",
    icon: createIcon(MessageSquare),
    color: "hover:text-black dark:hover:text-white",
  },
];

// Contact information
export const contactInfo: ContactInfo = {
  email: "OriginalLeeDunn@proton.me",
  location: "Sea-Tac Area, WA",
  availability: "Available for freelance work",
  services: [
    "Web Development",
    "UI/UX Design",
    "Technical Consulting",
    "Code Review",
  ],
};

export default socialLinks;
