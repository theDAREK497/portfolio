import type { ArticleId } from '../lib/routes';
import { knowledgeArticleCopy } from './demiurgeKnowledgeArticle';

export interface WritingItem {
  en: string;
  ru: string;
  status: 'published' | 'planned';
  href?: string;
  articleId?: ArticleId;
}

export const writing: readonly WritingItem[] = [
  {
    en: 'Why a Regular AI Chat Was Not Enough for My Fictional World',
    ru: 'Почему обычного ИИ-чата оказалось недостаточно для моего вымышленного мира',
    status: 'published',
    href: '#/writing/why-ai-chat-was-not-enough',
    articleId: 'ai-chat',
  },
  {
    en: knowledgeArticleCopy.en.title,
    ru: knowledgeArticleCopy.ru.title,
    status: 'published',
    href: '#/writing/model-response-to-knowledge-base',
    articleId: 'knowledge-base',
  },
  {
    en: 'Why AI Chats Are Not Enough for Long-Term Knowledge',
    ru: 'Почему AI-чатов недостаточно для долгосрочных знаний',
    status: 'planned',
  },
  {
    en: 'Human Approval for AI-Generated Knowledge',
    ru: 'Подтверждение человеком знаний, созданных AI',
    status: 'planned',
  },
  {
    en: 'What My First Paid Product User Taught Me',
    ru: 'Чему меня научил первый платный пользователь',
    status: 'planned',
  },
  {
    en: 'From CMS Development to Integration Engineering',
    ru: 'От CMS-разработки к интеграционной инженерии',
    status: 'planned',
  },
  {
    en: 'Evaluating Technical Answers with a Local LLM',
    ru: 'Оценка технических ответов с помощью локальной LLM',
    status: 'planned',
  },
];
