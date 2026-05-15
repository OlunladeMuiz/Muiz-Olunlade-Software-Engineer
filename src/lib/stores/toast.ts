import { writable } from 'svelte/store';

export interface Toast {
  id: number;
  title: string;
  description?: string;
  tone?: 'default' | 'success' | 'danger';
}

const DEFAULT_DURATION = 3500;

const store = writable<Toast[]>([]);
let nextId = 1;

function removeToast(id: number) {
  store.update((items) => items.filter((item) => item.id !== id));
}

export const toasts = {
  subscribe: store.subscribe
};

export function toast(title: string, description?: string, tone: Toast['tone'] = 'default') {
  const id = nextId++;
  store.update((items) => [
    ...items,
    {
      id,
      title,
      ...(description ? { description } : {}),
      tone
    }
  ]);
  window.setTimeout(() => removeToast(id), DEFAULT_DURATION);
}

export function dismissToast(id: number) {
  removeToast(id);
}
