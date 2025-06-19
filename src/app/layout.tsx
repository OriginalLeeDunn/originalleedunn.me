import type { Metadata, Viewport } from "next";
import { Inter, Orbitron, Rajdhani, Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import WebVitals from "@/components/WebVitals";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ClientWrapper } from "@/components/client-wrapper";
import Script from "next/script";

// Google Analytics measurement ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// Load fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const rajdhani = Rajdhani({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rajdhani",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

// Viewport and metadata are now imported from ./metadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${orbitron.variable} ${rajdhani.variable} ${firaCode.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* Favicons */}
        <link rel="icon" href="/optimized/favicon-16x16.webp" sizes="16x16" type="image/webp" />
        <link rel="icon" href="/optimized/favicon-32x32.webp" sizes="32x32" type="image/webp" />
        <link rel="apple-touch-icon" href="/optimized/apple-touch-icon.webp" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Google Analytics */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Web Vitals */}
        <WebVitals />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClientWrapper>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <ScrollToTop />
            </div>
            <Toaster
              position="top-center"
              richColors
              closeButton
              toastOptions={{
                className: "font-sans",
              }}
            />
          </ClientWrapper>
        </ThemeProvider>
      </body>
      
    </html>
  );
}
