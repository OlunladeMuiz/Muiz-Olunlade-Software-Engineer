import type { SkillGroup } from '$lib/types/skill';

export const skillGroups: SkillGroup[] = [
  {
    name: 'Frontend',
    summary: 'Interfaces, motion, and interaction design with a strong focus on usability.',
    items: [
      { name: 'SvelteKit', level: 75, note: 'Growing' },
      { name: 'React', level: 92, note: 'Strong' },
      { name: 'Next.js', level: 88, note: 'Strong' },
      { name: 'Tailwind CSS', level: 90, note: 'Strong' }
    ]
  },
  {
    name: 'Backend',
    summary: 'API design, validation, and pragmatic server-side implementation.',
    items: [
      { name: 'TypeScript', level: 88, note: 'Strong' },
      { name: 'Node.js', level: 84, note: 'Strong' },
      { name: 'FastAPI', level: 82, note: 'Strong' },
      { name: 'Zod', level: 86, note: 'Strong' }
    ]
  },
  {
    name: 'Data',
    summary: 'The persistence layer and the decisions that keep product data predictable.',
    items: [
      { name: 'PostgreSQL', level: 78, note: 'Comfortable' },
      { name: 'Prisma', level: 72, note: 'Comfortable' },
      { name: 'Schema design', level: 80, note: 'Strong' },
      { name: 'Reporting', level: 76, note: 'Comfortable' }
    ]
  },
  {
    name: 'Design',
    summary: 'Typography, layout, and visual polish that make interfaces feel intentional.',
    items: [
      { name: 'Figma', level: 90, note: 'Strong' },
      { name: 'Accessibility', level: 88, note: 'Strong' },
      { name: 'Interaction design', level: 85, note: 'Strong' },
      { name: 'Brand systems', level: 82, note: 'Comfortable' }
    ]
  }
];
