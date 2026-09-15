export const capabilityGroups = [
  {
    title: { en: 'Backend & APIs', ru: 'Backend и API' },
    items: [
      'PHP',
      'Python',
      'FastAPI',
      'Node.js',
      'Express',
      'REST APIs',
      'SOAP',
    ],
  },
  {
    title: { en: 'Frontend', ru: 'Frontend' },
    items: [
      'JavaScript',
      'TypeScript',
      'React',
      'Vue',
      'jQuery',
      'HTML',
      'CSS',
      '1C-Bitrix',
    ],
  },
  {
    title: {
      en: 'Integrations & Automation',
      ru: 'Интеграции и автоматизация',
    },
    items: [
      'System integration',
      'Webhooks',
      'JWT',
      'YooKassa',
      'Telegram',
      'External services',
      'Requirements analysis',
    ],
  },
  {
    title: { en: 'AI Applications', ru: 'AI-приложения' },
    items: [
      'OpenAI-compatible APIs',
      'Local LLMs',
      'RAG',
      'Semantic retrieval',
      'Structured LLM outputs',
      'Human-in-the-loop',
    ],
  },
  {
    title: { en: 'Data & Storage', ru: 'Данные и хранение' },
    items: [
      'SQL',
      'PostgreSQL',
      'MySQL',
      'SQLite',
      'pgvector',
      'FAISS',
      'Pandas',
      'NumPy',
    ],
  },
  {
    title: { en: 'Delivery & Quality', ru: 'Выпуск и качество' },
    items: [
      'Git',
      'GitLab CI/CD',
      'GitHub Actions',
      'Docker',
      'Docker Compose',
      'Linux',
      'Zabbix',
      'Debugging',
      'Manual testing',
    ],
  },
] as const;

const russianSkillLabels: Record<string, string> = {
  'System integration': 'Системные интеграции',
  'External services': 'Внешние сервисы',
  'Requirements analysis': 'Анализ требований',
  'OpenAI-compatible APIs': 'OpenAI-совместимые API',
  'Local LLMs': 'Локальные языковые модели',
  RAG: 'RAG',
  'Semantic retrieval': 'Семантический поиск',
  'Structured LLM outputs': 'Структурированные ответы LLM',
  'Human-in-the-loop': 'Проверка результатов человеком',
  Debugging: 'Отладка',
  'Manual testing': 'Ручное тестирование',
};

export const skillLabel = (item: string, lang: 'ru' | 'en') =>
  lang === 'ru' ? (russianSkillLabels[item] ?? item) : item;
