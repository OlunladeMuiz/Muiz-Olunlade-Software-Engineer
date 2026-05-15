import type { Action } from 'svelte/action';

interface MagneticHoverOptions {
  strength?: number;
}

export const magneticHover: Action<HTMLElement, MagneticHoverOptions> = (node, options = {}) => {
  const strength = options.strength ?? 12;

  function handleMove(event: MouseEvent) {
    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    node.style.transform = `translate3d(${x / strength}px, ${y / strength}px, 0)`;
  }

  function reset() {
    node.style.transform = 'translate3d(0, 0, 0)';
  }

  node.addEventListener('mousemove', handleMove);
  node.addEventListener('mouseleave', reset);

  return {
    destroy() {
      node.removeEventListener('mousemove', handleMove);
      node.removeEventListener('mouseleave', reset);
    }
  };
};
