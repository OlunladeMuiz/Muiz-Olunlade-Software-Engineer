import type { Action } from 'svelte/action';
import { activeSection } from '$lib/stores/active-section';

interface SectionObserverOptions {
  id: string;
  threshold?: number;
  rootMargin?: string;
}

export const sectionObserver: Action<HTMLElement, SectionObserverOptions> = (node, options) => {
  if (typeof window === 'undefined') {
    return {};
  }

  const id = options.id;
  const threshold = options.threshold ?? 0.35;
  const rootMargin = options.rootMargin ?? '0px 0px -45% 0px';

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeSection.set(id);
        }
      }
    },
    { threshold, rootMargin }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
};
