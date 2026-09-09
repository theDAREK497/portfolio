import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
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
  const switching = useRef(false);
  const fadeTimer = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      window.clearTimeout(fadeTimer.current);
      document.documentElement.classList.remove(
        'theme-fade-transition',
        'theme-wave-transition',
      );
    },
    [],
  );

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
      // Do not stack expensive snapshots when the toggle is tapped repeatedly.
      if (switching.current) return;
      const nextTheme: Theme = theme === 'light' ? 'dark' : 'light';
      const reduceMotion = window.matchMedia?.(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      const root = document.documentElement;
      const applyTheme = () => flushSync(() => setTheme(nextTheme));
      const compactOrTouch = window.matchMedia?.(
        '(max-width: 850px), (pointer: coarse)',
      ).matches;

      if (reduceMotion) {
        applyTheme();
        return;
      }

      const fade = () => {
        switching.current = true;
        root.classList.add('theme-fade-transition');
        applyTheme();
        fadeTimer.current = window.setTimeout(() => {
          root.classList.remove('theme-fade-transition');
          switching.current = false;
        }, 200);
      };

      // A single opacity layer avoids full-page snapshots and animated clipping
      // on phones, as well as per-element colour/shadow repainting.
      if (!document.startViewTransition || compactOrTouch) {
        fade();
        return;
      }

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

      switching.current = true;
      root.classList.add('theme-wave-transition');
      const finish = () => {
        root.classList.remove('theme-wave-transition');
        switching.current = false;
      };
      try {
        const transition = document.startViewTransition(applyTheme);
        void transition.finished.then(finish, finish);
      } catch {
        finish();
        fade();
      }
    },
    [theme],
  );

  return { theme, toggleTheme };
}
