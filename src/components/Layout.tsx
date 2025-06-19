import { ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

// Dynamically import components with no SSR to avoid hydration issues
const Navbar = dynamic<{}>(
  () => import("./Navbar").then((mod) => mod.Navbar),
  { ssr: false }
);

const Footer = dynamic<{}>(
  () => import("./Footer").then((mod) => mod.Footer),
  { ssr: false }
);

type LayoutProps = {
  children: ReactNode;
  title?: string;
  description?: string;
};

export default function Layout({
  children,
  title = "OriginalLeeDunn",
  description = "AI & Game Developer | Full-Stack Engineer | Creative Technologist",
}: LayoutProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Handle page transitions
  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>
          {title === "OriginalLeeDunn" ? title : `${title} | OriginalLeeDunn`}
        </title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="/optimized/favicon-32x32.webp"
          type="image/webp"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://originalleedunn.me/" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/og-image.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://originalleedunn.me/" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="/og-image.jpg" />
        <meta name="twitter:creator" content="@OriginalLeeDunn" />
      </Head>

      {/* Navigation */}
      <Navbar />

      {/* Page Loading Indicator */}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 h-1 z-50">
          <div className="h-full bg-gradient-to-r from-primary via-secondary to-accent animate-progress"></div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
