import type { Lang } from '../content/types';

export type ArticleId = 'ai-chat' | 'knowledge-base';
export const articleHash = '#/writing/why-ai-chat-was-not-enough';
export const knowledgeArticleHash =
  '#/writing/model-response-to-knowledge-base';
export const homeFile = (lang: Lang) =>
  lang === 'ru' ? 'index-ru.html' : 'index.html';
export const articleFile = (lang: Lang, article: ArticleId = 'ai-chat') =>
  `demiurge-${article}${lang === 'ru' ? '-ru' : ''}.html`;
export const articleIdFromPath = (path: string): ArticleId | null => {
  const match = /(?:^|\/)demiurge-(ai-chat|knowledge-base)(?:-ru)?\.html$/.exec(
    path,
  );
  return (match?.[1] as ArticleId | undefined) ?? null;
};
export const projectFile = (id: string, lang: Lang) =>
  `project-${id}${lang === 'ru' ? '-ru' : ''}.html`;
export const isArticlePage = () =>
  articleIdFromPath(window.location.pathname) !== null;
export const currentArticleId = (): ArticleId | null =>
  articleIdFromPath(window.location.pathname) ??
  (window.location.hash === articleHash
    ? 'ai-chat'
    : window.location.hash === knowledgeArticleHash
      ? 'knowledge-base'
      : null);
export const isArticleRoute = () => currentArticleId() !== null;
