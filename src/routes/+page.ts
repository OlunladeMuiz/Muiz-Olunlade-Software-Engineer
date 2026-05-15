import { navigation } from '$lib/data/navigation';
import { projects } from '$lib/data/projects';
import { skillGroups } from '$lib/data/skills';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  return {
    navigation,
    projects,
    skillGroups
  };
};
