export type ProjectTag = 'Fintech' | 'Full-Stack' | 'Frontend' | 'Tooling' | 'Design';

export type ProjectCategory = 'fullstack' | 'frontend' | 'backend' | 'mobile' | 'ai';

export type ProjectStatus = 'live' | 'in-progress' | 'archived';

export type TechnologyCategory = 'runtime' | 'framework' | 'language' | 'library' | 'database' | 'design' | 'devops' | 'api';

export interface ProjectLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectTechnology {
  name: string;
  category: TechnologyCategory;
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  description: string;
  longDescription: string;
  aiContext: string;
  challenges: string[];
  year: string;
  tags: ProjectTag[];
  category: ProjectCategory;
  status: ProjectStatus;
  featured: boolean;
  technologies: ProjectTechnology[];
  stack: string[];
  impact: string;
  highlights: string[];
  metrics: ProjectMetric[];
  links: ProjectLink[];
  screenshots: ProjectScreenshot[];
  openGraphDescription: string;
  liveUrl: string | null;
  repoUrl: string | null;
  accent: string;
}
