import { useCallback, useEffect, useRef, useState } from 'react';
import type { Lang } from '../content';
import {
  captureLanguageLayout,
  type LanguageLayoutSnapshot,
} from '../lib/languageLayoutTransition';

const STORAGE_KEY = 'portfolio-language';

const readInitialLanguage = (): Lang => {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'ru' ? 'ru' : 'en';
  } catch {
    return 'en';
  }
};

export function useLanguage() {
  const [lang, setLang] = useState<Lang>(readInitialLanguage);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const layoutSnapshot = useRef<LanguageLayoutSnapshot>(new Map());

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // The selected language still works for the current session.
    }
  }, [lang]);

  const toggleLanguage = useCallback(() => {
    if (isTransitioning) return;

    const nextLang: Lang = lang === 'en' ? 'ru' : 'en';
    const reduceMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (reduceMotion) {
      setLang(nextLang);
      return;
    }

    layoutSnapshot.current = captureLanguageLayout();
    setIsTransitioning(true);
    setLang(nextLang);
  }, [isTransitioning, lang]);

  const finishLanguageTransition = useCallback(
    () => setIsTransitioning(false),
    [],
  );

  return {
    lang,
    setLang,
    isTransitioning,
    layoutSnapshot,
    toggleLanguage,
    finishLanguageTransition,
  };
}
