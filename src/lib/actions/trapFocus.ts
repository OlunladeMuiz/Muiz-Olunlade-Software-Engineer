import type { Action } from 'svelte/action';

export const trapFocus: Action<HTMLElement> = (node) => {
  if (typeof window === 'undefined') {
    return {};
  }

  function getFocusableElements() {
    return Array.from(
      node.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((element) => !element.hasAttribute('disabled'));
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key !== 'Tab') {
      return;
    }

    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) {
      return;
    }

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  node.addEventListener('keydown', handleKeydown);

  return {
    destroy() {
      node.removeEventListener('keydown', handleKeydown);
    }
  };
};
