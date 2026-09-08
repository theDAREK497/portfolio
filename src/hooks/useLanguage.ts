import { useCallback, useEffect, useRef, useState } from 'react';
import type { Lang } from '../content';
import { articleFile, homeFile, isArticlePage } from '../lib/routes';
import {
  captureLanguageLayout,
  type LanguageLayoutSnapshot,
} from '../lib/languageLayoutTransition';

const STORAGE_KEY = 'portfolio-language';

const readInitialLanguage = (): Lang => {
  try {
    if (/\/(?:index|demiurge-ai-chat)-ru\.html$/.test(window.location.pathname))
      return 'ru';
    if (/\/(?:index|demiurge-ai-chat)\.html$/.test(window.location.pathname))
      return 'en';
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
    // Keep a shareable language-specific URL without reloading the animation.
    const nextUrl = new URL(
      isArticlePage() ? articleFile(nextLang) : homeFile(nextLang),
      window.location.href,
    );
    nextUrl.hash = window.location.hash;
    window.history.replaceState(null, '', nextUrl);
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
