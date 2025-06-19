/// <reference types="vite/client" />
/// <reference types="@emotion/react/types/css-prop" />

// Image files
declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.svg" {
  import React from "react";
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}

declare module "*.gif" {
  const content: string;
  export default content;
}

declare module "*.webp" {
  const content: string;
  export default content;
}

// Font files
declare module "*.woff" {
  const content: string;
  export default content;
}

declare module "*.woff2" {
  const content: string;
  export default content;
}

declare module "*.ttf" {
  const content: string;
  export default content;
}

declare module "*.eot" {
  const content: string;
  export default content;
}

// CSS modules
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

// Environment variables
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly SITE_URL: string;
    // Add other environment variables here as needed
  }
}

// Global types
interface Window {
  gtag: (...args: any[]) => void;
  dataLayer: Record<string, any>;
}
