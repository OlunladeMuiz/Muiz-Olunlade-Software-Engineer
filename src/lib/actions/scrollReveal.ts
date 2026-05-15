import type { Action } from 'svelte/action';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export const scrollReveal: Action<HTMLElement, ScrollRevealOptions | undefined> = (node, options = {}) => {
  const { threshold = 0.2, rootMargin = '0px 0px -10% 0px', once = true } = options;

  if (typeof window === 'undefined') {
    return {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          node.dataset.visible = 'true';
          if (once) {
            observer.unobserve(node);
          }
        } else if (!once) {
          node.dataset.visible = 'false';
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
