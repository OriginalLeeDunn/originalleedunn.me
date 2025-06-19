import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OriginalLeeDunn - Full-Stack Developer & Creative Technologist",
  description:
    "Portfolio of Lee Dunn, a Full-Stack Developer and Creative Technologist specializing in AI/ML, Web Development, and Game Development.",
  icons: {
    icon: [
      {
        url: "/optimized/favicon-16x16.webp",
        sizes: "16x16",
        type: "image/webp",
      },
      {
        url: "/optimized/favicon-32x32.webp",
        sizes: "32x32",
        type: "image/webp",
      },
    ],
    apple: [
      {
        url: "/optimized/apple-touch-icon.webp",
        sizes: "180x180",
        type: "image/webp",
      },
    ],
  },
  manifest: "/site.webmanifest",
  themeColor: "#B7410E", // Rust orange
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://originalleedunn.me",
    title: "OriginalLeeDunn - Full-Stack Developer & Creative Technologist",
    description:
      "Portfolio of Lee Dunn, a Full-Stack Developer and Creative Technologist.",
    siteName: "OriginalLeeDunn",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "OriginalLeeDunn Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OriginalLeeDunn - Full-Stack Developer & Creative Technologist",
    description:
      "Portfolio of Lee Dunn, a Full-Stack Developer and Creative Technologist.",
    images: ["/og-image.jpg"],
    creator: "@OriginalLeeDunn",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#B7410E" },
    { media: "(prefers-color-scheme: dark)", color: "#39FF14" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default metadata;
