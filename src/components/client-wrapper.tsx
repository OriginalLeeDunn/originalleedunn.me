"use client";

import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  // Enable smooth scrolling
  useSmoothScroll(80);

  return <>{children}</>;
}
