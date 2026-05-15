import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ cookies }) => {
  return {
    theme: cookies.get('portfolio-theme') ?? 'dark',
    accent: cookies.get('portfolio-accent') ?? 'cyan'
  };
};
