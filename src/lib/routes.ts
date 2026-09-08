import type { Lang } from '../content/types';

export const articleHash = '#/writing/why-ai-chat-was-not-enough';
export const homeFile = (lang: Lang) =>
  lang === 'ru' ? 'index-ru.html' : 'index.html';
export const articleFile = (lang: Lang) =>
  lang === 'ru' ? 'demiurge-ai-chat-ru.html' : 'demiurge-ai-chat.html';
export const isArticlePage = () =>
  /\/demiurge-ai-chat(?:-ru)?\.html$/.test(window.location.pathname);
export const isArticleRoute = () =>
  isArticlePage() || window.location.hash === articleHash;
