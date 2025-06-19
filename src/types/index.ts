export type ProjectType = 'ai' | 'game' | 'web' | 'mobile' | 'all';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  image: string;
  link?: string;
  repo?: string;
  type: ProjectType[];
  featured: boolean;
}

export interface ProjectTypeOption {
  id: ProjectType;
  label: string;
  icon: React.ReactNode;
}
