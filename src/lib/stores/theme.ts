import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type ThemeMode = 'dark' | 'light';
export type AccentColor = 'cyan' | 'violet' | 'amber' | 'emerald' | 'rose';

export const accentPalette: Record<AccentColor, string> = {
  cyan: '#00C2FF',
  violet: '#7B61FF',
  amber: '#F5A623',
  emerald: '#3DBA7A',
  rose: '#E25563'
};

const themeKey = 'portfolio-theme';
const accentKey = 'portfolio-accent';
const cookieScope = '; path=/; max-age=31536000; samesite=lax';

function readCookie(name: string) {
  if (!browser) {
    return null;
  }

  const entry = document.cookie
    .split('; ')
    .find((value) => value.startsWith(`${name}=`));

  return entry ? decodeURIComponent(entry.split('=').slice(1).join('=')) : null;
}

function applyTheme(theme: ThemeMode) {
  if (!browser) {
    return;
  }

  document.documentElement.dataset.theme = theme;
  localStorage.setItem(themeKey, theme);
  document.cookie = `${themeKey}=${encodeURIComponent(theme)}${cookieScope}`;
}

function applyAccent(accent: AccentColor) {
  if (!browser) {
    return;
  }

  document.documentElement.dataset.accent = accent;
  document.documentElement.style.setProperty('--accent-primary', accentPalette[accent]);
  localStorage.setItem(accentKey, accent);
  document.cookie = `${accentKey}=${encodeURIComponent(accent)}${cookieScope}`;
}

function createThemeStore() {
  const initialTheme = browser
    ? ((localStorage.getItem(themeKey) as ThemeMode | null) ?? (readCookie(themeKey) as ThemeMode | null) ?? 'dark')
    : 'dark';
  const store = writable<ThemeMode>(initialTheme);

  if (browser) {
    applyTheme(initialTheme);
  }

  return {
    subscribe: store.subscribe,
    set(theme: ThemeMode) {
      store.set(theme);
      applyTheme(theme);
    },
    toggle() {
      store.update((current) => {
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        return next;
      });
    }
  };
}

function createAccentStore() {
  const initialAccent = browser
    ? ((localStorage.getItem(accentKey) as AccentColor | null) ?? (readCookie(accentKey) as AccentColor | null) ?? 'cyan')
    : 'cyan';
  const store = writable<AccentColor>(initialAccent);

  if (browser) {
    applyAccent(initialAccent);
  }

  return {
    subscribe: store.subscribe,
    set(accent: AccentColor) {
      store.set(accent);
      applyAccent(accent);
    }
  };
}

export const theme = createThemeStore();
export const accent = createAccentStore();
