import { useCallback, useSyncExternalStore } from 'react';
import { storage } from '@/lib/utils';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'np-theme'; // also read by the inline script in index.html
const listeners = new Set<() => void>();
let mediaQuery: MediaQueryList | null = null;

const current = (): Theme =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light';

function apply(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  listeners.forEach((listener) => listener());
}

function onSystemChange(event: MediaQueryListEvent) {
  // Follow the OS only while the visitor has not picked a theme manually.
  if (!storage.get(STORAGE_KEY)) apply(event.matches ? 'dark' : 'light');
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!mediaQuery && window.matchMedia) {
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', onSystemChange);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && mediaQuery) {
      mediaQuery.removeEventListener('change', onSystemChange);
      mediaQuery = null;
    }
  };
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, current, () => 'light' as Theme);

  const setTheme = useCallback((next: Theme) => {
    storage.set(STORAGE_KEY, next);
    apply(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(current() === 'dark' ? 'light' : 'dark');
  }, [setTheme]);

  return { theme, setTheme, toggleTheme };
}
