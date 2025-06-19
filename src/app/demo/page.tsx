import { Metadata } from "next";
import { DemoPage } from "./demo-page";

export const metadata: Metadata = {
  title: "Design System Demo | OriginalLeeDunn",
  description: "Design system and component library for OriginalLeeDunn's portfolio",
  openGraph: {
    title: "Design System Demo | OriginalLeeDunn",
    description: "Explore the design system and UI components used in OriginalLeeDunn's portfolio",
    url: "https://originalleedunn.me/demo",
    siteName: "OriginalLeeDunn",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Design System Demo | OriginalLeeDunn",
    description: "Explore the design system and UI components used in OriginalLeeDunn's portfolio",
    creator: "@OriginalLeeDunn",
  },
};

export default function DemoPageWrapper() {
  return <DemoPage />;
}
