import type { Action } from 'svelte/action';
import { prefersReducedMotion } from '$lib/utils/animations';

interface TypewriterOptions {
  words: string[];
  typingSpeed?: number;
  pause?: number;
}

export const typewriter: Action<HTMLElement, TypewriterOptions> = (node, options) => {
  const words = options.words;
  const typingSpeed = options.typingSpeed ?? 48;
  const pause = options.pause ?? 1300;

  if (!words.length) {
    return {};
  }

  if (prefersReducedMotion()) {
    node.textContent = words[0];
    return {};
  }

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let timer: number | undefined;

  const tick = () => {
    const current = words[wordIndex] ?? '';

    if (!isDeleting) {
      charIndex += 1;
      node.textContent = current.slice(0, charIndex);

      if (charIndex >= current.length) {
        isDeleting = true;
        timer = window.setTimeout(tick, pause);
        return;
      }
    } else {
      charIndex -= 1;
      node.textContent = current.slice(0, Math.max(charIndex, 0));

      if (charIndex <= 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    timer = window.setTimeout(tick, isDeleting ? typingSpeed * 0.55 : typingSpeed);
  };

  timer = window.setTimeout(tick, 500);

  return {
    destroy() {
      if (timer) {
        window.clearTimeout(timer);
      }
    }
  };
};
