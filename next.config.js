/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React's concurrent features
  reactStrictMode: true,

  // Use SWC minification (faster than Terser)
  swcMinify: true,

  // Optimize font loading
  optimizeFonts: true,

  // Enable gzip and brotli compression
  compress: true,

  // Enable static page generation for 404 page
  generateEtags: true,

  // Enable cross-origin for fonts
  crossOrigin: "anonymous",

  // Configure headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // Configure image optimization
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
    // Remove console.log in production
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "source.unsplash.com",
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Experimental features
  experimental: {
    // Enable server actions
    serverActions: {
      bodySizeLimit: "2mb",
    },
    // Optimize package imports
    optimizePackageImports: ["@radix-ui/react-dialog", "lucide-react"],
  },
  // Webpack configuration
  webpack: (config, { isServer, dev }) => {
    // SVG handling with SVGR
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "removeViewBox",
                  active: false,
                },
                {
                  name: "removeDimensions",
                  active: true,
                },
              ],
            },
          },
        },
      ],
    });

    // Source maps in development
    if (!isServer && !dev) {
      // Enable source maps in production
      config.devtool = "source-map";
    }

    return config;
  },
  // Environment variables
  env: {
    SITE_URL: process.env.SITE_URL || "http://localhost:3000",
  },
  // Improve build performance
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
