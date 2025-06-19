import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { projects } from '@/lib/projects';
import { Badge } from '@/components/ui/badge';

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const project = projects.find(p => p.id === params.id);
  
  if (!project) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <Link href="/">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/#projects">
            <Button variant="ghost" className="pl-0 hover:bg-transparent group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </Button>
          </Link>
        </div>
        
        <div className="space-y-12">
          {/* Project Header */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{project.title}</h1>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary"
                    className="text-xs font-mono"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Project Image */}
            <div className="relative rounded-xl overflow-hidden border border-border/50 bg-muted/30 aspect-video">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-muted-foreground/20">
                  <div className="w-24 h-24" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Project Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="prose dark:prose-invert max-w-none">
                <h2 className="text-2xl font-semibold mb-6">About the Project</h2>
                <div className="space-y-6 text-muted-foreground">
                  <p className="text-lg leading-relaxed">
                    {project.longDescription || project.description}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-6">
                {/* Project Links */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Project Links</h3>
                  <div className="space-y-2">
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors group"
                      >
                        <div className="flex items-center">
                          <ExternalLink className="w-5 h-5 mr-3 text-muted-foreground" />
                          <span>Live Project</span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    )}
                    
                    {project.repo && (
                      <a 
                        href={project.repo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors group"
                      >
                        <div className="flex items-center">
                          <Github className="w-5 h-5 mr-3 text-muted-foreground" />
                          <span>View on GitHub</span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>
                
                {/* Project Details */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Project Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
                      <p className="font-medium">
                        {project.type
                          .filter(t => t !== 'all')
                          .map(t => t.charAt(0).toUpperCase() + t.slice(1))
                          .join(', ')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Technologies</p>
                      <p className="font-medium">
                        {project.tags.join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
