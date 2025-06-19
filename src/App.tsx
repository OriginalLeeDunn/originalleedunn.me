import { useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

// Dynamically import components with no SSR to avoid hydration issues
const Layout = dynamic(() => import("./components/Layout"), { ssr: false });
const Hero = dynamic(() => import("./components/Hero"), { ssr: false });
const Projects = dynamic(() => import("./components/Projects"), { ssr: false });
const CreativeWork = dynamic(() => import("./components/CreativeWork"), {
  ssr: false,
});
const Contact = dynamic<{}>(
  () => import("./components/Contact").then((mod) => mod.Contact),
  { ssr: false }
);

export default function Home() {
  // Add smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash && target.hash.startsWith("#")) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          // Update URL without adding to history
          window.history.pushState(null, "", target.hash);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, false);
    return () =>
      document.removeEventListener("click", handleAnchorClick, false);
  }, []);

  return (
    <>
      <Head>
        <title>OriginalLeeDunn | AI & Game Developer</title>
        <meta
          name="description"
          content="AI & Game Developer | Full-Stack Engineer | Creative Technologist"
        />
      </Head>

      <Layout>
        <Hero />
        <Projects />
        <CreativeWork />
        <Contact />
      </Layout>
    </>
  );
}
