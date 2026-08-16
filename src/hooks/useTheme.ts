import { useCallback, useLayoutEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import type { Theme } from '../content';

const STORAGE_KEY = 'portfolio-theme';

const readInitialTheme = (): Theme => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // Fall through to the system preference.
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document
      .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#07111f' : '#f5f2ea');
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Theme remains active for the current session.
    }
  }, [theme]);

  const toggleTheme = useCallback(
    (origin: HTMLElement) => {
      const nextTheme: Theme = theme === 'light' ? 'dark' : 'light';
      const reduceMotion = window.matchMedia?.(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      const root = document.documentElement;
      const rect = origin.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );

      root.style.setProperty('--theme-x', `${x}px`);
      root.style.setProperty('--theme-y', `${y}px`);
      root.style.setProperty('--theme-radius', `${radius}px`);

      const applyTheme = () => flushSync(() => setTheme(nextTheme));

      if (!document.startViewTransition || reduceMotion) {
        root.classList.add('theme-fallback-transition');
        applyTheme();
        window.setTimeout(
          () => root.classList.remove('theme-fallback-transition'),
          420,
        );
        return;
      }

      root.classList.add('theme-wave-transition');
      const transition = document.startViewTransition(applyTheme);
      transition.finished.finally(() =>
        root.classList.remove('theme-wave-transition'),
      );
    },
    [theme],
  );

  return { theme, toggleTheme };
}
