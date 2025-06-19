import createMDX from "@next/mdx";
import rehypeHighlight from "rehype-highlight";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx", "js", "jsx"],
  experimental: {
    mdxRs: true,
  },
};

const withMDX = createMDX({
  extension: /\\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [rehypeHighlight],
  },
});

export default withMDX(nextConfig);
