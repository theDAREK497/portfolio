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
      'HTML',
      'CSS',
      '1C-Bitrix',
      'WordPress',
    ],
  },
  {
    title: {
      en: 'Integrations & Automation',
      ru: 'Интеграции и автоматизация',
    },
    items: [
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
      'RAG fundamentals',
      'Structured LLM outputs',
      'Human-in-the-loop',
    ],
  },
  {
    title: { en: 'Data & Storage', ru: 'Данные и хранение' },
    items: ['SQL', 'PostgreSQL', 'MySQL', 'SQLite', 'FAISS'],
  },
  {
    title: { en: 'Delivery & Quality', ru: 'Поставка и качество' },
    items: ['Git', 'Docker', 'GitLab CI/CD', 'Debugging', 'Manual testing'],
  },
] as const;
