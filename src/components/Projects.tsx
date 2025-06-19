"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/projects";
import type { Project } from "@/types";
import { ProjectType, ProjectTypeOption } from "@/types";
import { 
  ArrowRight, 
  Code, 
  ExternalLink, 
  Github, 
  BrainCircuit, 
  Gamepad2, 
  Smartphone, 
  Globe 
} from "lucide-react";
import { ErrorBoundary } from "./ErrorBoundary";
import { LoadingSpinner } from "./LoadingSpinner";

// Project type icons mapping
const ProjectTypeIcons: Record<ProjectType, React.ReactNode> = {
  ai: <BrainCircuit className="h-4 w-4" />,
  game: <Gamepad2 className="h-4 w-4" />,
  web: <Globe className="h-4 w-4" />,
  mobile: <Smartphone className="h-4 w-4" />,
  all: <Code className="h-4 w-4" />,
};

// Project type filter options
const projectTypeFilters: ProjectTypeOption[] = [
  { id: "all", label: "All Projects", icon: <Code className="h-4 w-4" /> },
  { id: "ai", label: "AI/ML", icon: <BrainCircuit className="h-4 w-4" /> },
  { id: "game", label: "Games", icon: <Gamepad2 className="h-4 w-4" /> },
  { id: "web", label: "Web", icon: <Globe className="h-4 w-4" /> },
  { id: "mobile", label: "Mobile", icon: <Smartphone className="h-4 w-4" /> },
];

// Simulate loading delay for demo purposes
const simulateLoading = () => new Promise(resolve => setTimeout(resolve, 1000));

// Project filtering logic
function useFilteredProjects(selectedType: ProjectType | null) {
  const [isLoading, setIsLoading] = useState(false);
  const [filtered, setFiltered] = useState<Project[]>([]);

  useEffect(() => {
    const filterProjects = async () => {
      setIsLoading(true);
      await simulateLoading(); // Simulate network delay
      
      try {
        const result = selectedType && selectedType !== 'all'
          ? projects.filter((project) => project.type.includes(selectedType))
          : projects;
        
        setFiltered(result);
      } catch (error) {
        console.error('Error filtering projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    filterProjects();
  }, [selectedType]);

  return { filteredProjects: filtered, isLoading };
}

// Project card component
function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20 group">
      <Link href={`/projects/${project.id}`} className="block h-full" aria-label={`View ${project.title} project details`}>
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="w-full h-full bg-muted/50 flex items-center justify-center">
            <div className="text-muted-foreground/30">
              <Code className="w-12 h-12" />
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <div className="flex space-x-1">
              {project.type.map((type: string) => (
                <span key={type} className="text-muted-foreground" aria-hidden="true">
                  {type && ProjectTypeIcons[type as keyof typeof ProjectTypeIcons] ? (
                    ProjectTypeIcons[type as keyof typeof ProjectTypeIcons]
                  ) : null}
                </span>
              ))}
            </div>
          </div>
          <p className="text-muted-foreground/90 mb-4 line-clamp-3">
            {project.description}
          </p>
          <div className="mt-4 pt-4 border-t border-border/20">
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag: string) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs font-medium"
                >
                  {tag}
                </Badge>
              ))}
              {project.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{project.tags.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Link>
      <div className="px-6 pb-6 pt-0">
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors p-2 -ml-2 rounded-md hover:bg-accent/50"
                onClick={(e) => e.stopPropagation()}
                aria-label={`View ${project.title} source code on GitHub`}
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors p-2 -ml-2 rounded-md hover:bg-accent/50"
                onClick={(e) => e.stopPropagation()}
                aria-label={`View live demo of ${project.title}`}
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
          <Link 
            href={`/projects/${project.id}`}
            className="inline-flex items-center text-sm font-medium text-primary hover:underline group-hover:translate-x-1 transition-transform"
            aria-label={`View details about ${project.title}`}
          >
            View details
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </Card>
  );
}

export function Projects() {
  const [selectedType, setSelectedType] = useState<ProjectType | null>('all');
  const { filteredProjects, isLoading } = useFilteredProjects(selectedType);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">My Projects</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">A collection of my recent work and contributions</p>
      </div>
      <div className="bg-brand-light/80 dark:bg-muted/50">
        {/* Project Type Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {projectTypeFilters.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedType === type.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80 text-muted-foreground'
              }`}
              aria-label={`Filter by ${type.label}`}
              aria-pressed={selectedType === type.id}
            >
              <span className="mr-2">{type.icon}</span>
              {type.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <ErrorBoundary>
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <LoadingSpinner size={40} text="Loading projects..." />
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No projects found matching the selected filter.</p>
            </div>
          )}
        </ErrorBoundary>
      </div>
    </section>
  );
}

export default Projects;
