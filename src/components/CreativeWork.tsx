import { useState } from "react";
import Image from "next/image";

type CreativeWork = {
  id: string;
  title: string;
  description: string;
  type: "art" | "writing" | "other";
  image: string;
  content?: string;
  tags: string[];
};

const creativeWorks: CreativeWork[] = [
  {
    id: "1",
    title: "AI-Generated Character Designs",
    description:
      "A collection of character designs created using AI tools and digital painting techniques.",
    type: "art",
    image: "/character-designs.jpg",
    tags: ["AI Art", "Character Design", "Digital Painting"],
  },
  {
    id: "2",
    title: "From Stone to Silicone",
    description:
      "Excerpts from my ongoing interactive fiction project exploring the intersection of technology and humanity.",
    type: "writing",
    image: "/stone-to-silicone-cover.jpg",
    content:
      "The city hummed with a thousand synthetic voices, each one a whisper of what it meant to be alive...",
    tags: ["Interactive Fiction", "Speculative Fiction", "AI-Assisted Writing"],
  },
  {
    id: "3",
    title: "Procedural World Building",
    description:
      "Experiments in AI-assisted world generation and procedural content creation.",
    type: "art",
    image: "/procedural-worlds.jpg",
    tags: ["Procedural Generation", "AI", "World Building"],
  },
  {
    id: "4",
    title: "One-Minute Stories",
    description:
      "Micro-fiction pieces exploring character and setting in bite-sized narratives.",
    type: "writing",
    image: "/one-minute-stories.jpg",
    content:
      "The last AI on Earth finally understood why humans had laughed at its jokes...",
    tags: ["Flash Fiction", "Creative Writing", "AI Collaboration"],
  },
];

export default function CreativeWork() {
  const [selectedWork, setSelectedWork] = useState<CreativeWork | null>(null);

  return (
    <section
      id="creative"
      className="py-20 bg-gradient-to-b from-muted/20 to-background"
    >
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-gradient bg-gradient-to-r from-accent via-secondary to-primary">
            Creative Work
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Exploring the intersection of technology and creativity through
            AI-generated art and writing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {creativeWorks.map((work) => (
            <div
              key={work.id}
              className="group relative overflow-hidden rounded-xl border border-border/20 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 cursor-pointer"
              onClick={() => setSelectedWork(work)}
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="text-xl font-bold text-white drop-shadow-md">
                    {work.title}
                  </h3>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {work.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-accent/20 text-accent-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-muted-foreground line-clamp-2">
                  {work.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {selectedWork && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedWork(null)}
          >
            <div
              className="bg-card rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-96 w-full">
                <Image
                  src={selectedWork.image}
                  alt={selectedWork.title}
                  fill
                  className="object-cover rounded-t-xl"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-bold">{selectedWork.title}</h3>
                  <button
                    onClick={() => setSelectedWork(null)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Close"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 my-4">
                  {selectedWork.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">
                  {selectedWork.description}
                </p>
                {selectedWork.content && (
                  <div className="bg-muted/30 p-4 rounded-lg mb-6">
                    <p className="italic">&quot;{selectedWork.content}&quot;</p>
                  </div>
                )}
                <div className="flex justify-end">
                  <button
                    onClick={() => setSelectedWork(null)}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
