import Projects from "@/components/Projects";
import SpaceBackground from "@/components/ui/SpaceBackground";

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen">
      <SpaceBackground />
      <div className="relative z-10">
        <main className="container mx-auto px-4 py-16">
          <Projects />
        </main>
      </div>
    </div>
  );
}
