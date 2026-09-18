import type { ProjectItem } from './types';

export const projects: ProjectItem[] = [
  {
    id: 'demiurge',
    name: 'Demiurge Assistant',
    featured: true,
    category: 'ai',
    status: 'active-development',
    image: './images/articles/demiurge-ai-chat/demiurge-encyclopedia.png',
    imageWidth: 2238,
    imageHeight: 1273,
    imagePosition: 'center top',
    imageAlt: {
      en: 'Demiurge Assistant world encyclopedia with search, entity filters and structured cards',
      ru: 'Энциклопедия мира Demiurge Assistant с поиском, фильтрами сущностей и структурированными карточками',
    },
    gallery: [
      {
        src: './images/articles/demiurge-ai-chat/demiurge-encyclopedia.png',
        width: 2238,
        height: 1273,
        alt: {
          en: 'Demiurge Assistant world encyclopedia with search, entity filters and structured cards',
          ru: 'Энциклопедия мира Demiurge Assistant с поиском, фильтрами сущностей и структурированными карточками',
        },
        caption: {
          en: 'World encyclopedia with structured cards, search and typed entities',
          ru: 'Энциклопедия мира со структурированными карточками, поиском и типизированными сущностями',
        },
      },
      {
        src: './images/articles/demiurge-ai-chat/demiurge-human-review.png',
        width: 1517,
        height: 643,
        alt: {
          en: 'Unified draft with proposed cards, public and secret settings, and Publish to world action',
          ru: 'Единый черновик с предложенными карточками, настройками публичности и секретности и действием публикации в мир',
        },
        caption: {
          en: 'Human-in-the-loop review before AI-generated changes become canonical knowledge',
          ru: 'Проверка человеком перед тем, как сгенерированные ИИ изменения становятся канонической частью мира',
        },
      },
      {
        src: './images/articles/demiurge-ai-chat/demiurge-world-audit.png',
        width: 2211,
        height: 1179,
        alt: {
          en: 'Game Master Assistant showing a world audit report with contradictions, probable duplicates and missing links',
          ru: 'Помощник мастера с отчётом проверки мира: противоречия, возможные дубликаты и отсутствующие связи',
        },
        caption: {
          en: 'AI-assisted world audit for contradictions, duplicates and missing links',
          ru: 'ИИ-анализ мира для поиска противоречий, дубликатов и отсутствующих связей',
        },
      },
      {
        src: './images/articles/demiurge-ai-chat/demiurge-relationship-graph.png',
        width: 770,
        height: 764,
        alt: {
          en: 'Relationship graph with entity nodes, directed arrows and colour-coded connection weights',
          ru: 'Граф сущностей с направленными стрелками и весами связей, выделенными цветом',
        },
        caption: {
          en: 'Interactive relationship graph with weighted entity connections',
          ru: 'Интерактивный граф с взвешенными связями между сущностями',
        },
      },
      {
        src: './images/articles/demiurge-ai-chat/demiurge-ai-coauthor.png',
        width: 1181,
        height: 1069,
        alt: {
          en: 'AI co-author chat with generated worldbuilding content and a Save as draft action',
          ru: 'Чат с ИИ-соавтором, сгенерированным контентом для мира и действием сохранения в черновик',
        },
        caption: {
          en: 'AI co-author workflow with draft-first content generation',
          ru: 'ИИ-соавтор с генерацией контента через промежуточные черновики',
        },
      },
    ],
    accent: 'green',
    github: 'https://github.com/theDAREK497/demiurge-assistant',
    role: {
      en: 'Product Designer · Software Architect · Full-Stack & AI Engineer',
      ru: 'Продуктовый дизайнер · Архитектор ПО · Full-Stack & AI инженер',
    },
    summary: {
      en: 'A local-first AI knowledge system for complex fictional worlds. AI proposes facts and relationships; the author reviews what becomes persistent knowledge.',
      ru: 'Local-first AI-система знаний для сложных вымышленных миров. ИИ предлагает факты и связи, а автор решает, что станет постоянной частью базы знаний.',
    },
    capabilities: {
      en: [
        'Persistent structured knowledge',
        'Human-reviewed AI write-back',
        'RAG and semantic retrieval',
        'Local and cloud LLM providers',
      ],
      ru: [
        'Постоянная структурированная база знаний',
        'Проверка AI-изменений человеком',
        'RAG и семантический поиск',
        'Локальные и облачные LLM',
      ],
    },
    details: [
      {
        label: { en: 'Problem', ru: 'Проблема' },
        value: {
          en: 'Long-running AI chats mix facts, assumptions and suggestions. Demiurge keeps confirmed world state separate from generated proposals.',
          ru: 'В долгих AI-диалогах смешиваются факты, предположения и предложения. Demiurge отделяет подтверждённое состояние мира от сгенерированных изменений.',
        },
      },
      {
        label: { en: 'Architecture', ru: 'Архитектура' },
        value: {
          en: 'FastAPI backend, persistent entities and directed relationships, retrieval, structured AI actions and a React frontend.',
          ru: 'FastAPI backend, постоянные сущности и направленные связи, retrieval, структурированные AI-действия и React frontend.',
        },
      },
      {
        label: { en: 'Human approval', ru: 'Подтверждение человеком' },
        value: {
          en: 'AI-generated knowledge changes remain reviewable and can be approved or rejected before becoming canonical world data.',
          ru: 'Сгенерированные ИИ изменения можно проверить, принять или отклонить до того, как они станут каноническими знаниями мира.',
        },
      },
      {
        label: { en: 'Local-first approach', ru: 'Локальный подход' },
        value: {
          en: 'Provider abstraction supports local OpenAI-compatible models through LM Studio as well as external providers.',
          ru: 'Абстракция провайдеров поддерживает локальные OpenAI-совместимые модели через LM Studio и внешние сервисы.',
        },
      },
      {
        label: { en: 'Engineering baseline', ru: 'Инженерная база' },
        value: {
          en: 'The public milestone includes automated backend tests, frontend build validation, static analysis, security checks and CI.',
          ru: 'Публичный milestone включает backend-тесты, проверку frontend-сборки, статический анализ, security-checks и CI.',
        },
      },
    ],
    results: {
      en: [
        'Built persistent entities, relationships, semantic retrieval and reviewable AI write-back as a working backend MVP.',
        'Published a documented v0.1.0 engineering milestone with automated validation and local/cloud model support.',
      ],
      ru: [
        'Собрал рабочий backend MVP с постоянными сущностями, связями, семантическим поиском и проверяемой AI-записью изменений.',
        'Опубликовал документированный engineering milestone v0.1.0 с автоматическими проверками и поддержкой локальных/облачных моделей.',
      ],
    },
    tech: [
      'React',
      'FastAPI',
      'PostgreSQL / pgvector',
      'SQLite',
      'RAG',
      'Local LLMs',
      'Human-in-the-loop',
    ],
  },
  {
    id: 'astrocode',
    name: 'AstroCode',
    featured: true,
    category: 'product',
    status: 'live',
    image: './images/projects/astrocode-dashboard.png',
    imageWidth: 1500,
    imageHeight: 1206,
    imagePosition: 'center top',
    imageAlt: {
      en: 'AstroCode dashboard with personalized calculation modules',
      ru: 'Главный экран AstroCode с модулями персональных расчётов',
    },
    gallery: [
      {
        src: './images/projects/astrocode-dashboard.png',
        width: 1500,
        height: 1206,
        alt: {
          en: 'AstroCode dashboard with personalized calculation modules',
          ru: 'Главный экран AstroCode с модулями персональных расчётов',
        },
        caption: {
          en: 'Cross-platform product dashboard',
          ru: 'Главный экран кроссплатформенного продукта',
        },
      },
      {
        src: './images/projects/astrocode-natal-chart.png',
        width: 1501,
        height: 1180,
        alt: {
          en: 'AstroCode natal chart report with aura color and essential dignities',
          ru: 'Натальная карта AstroCode с цветом ауры и эссенциальными достоинствами',
        },
        caption: {
          en: 'Natal chart and personalized report',
          ru: 'Натальная карта и персональный отчёт',
        },
      },
      {
        src: './images/projects/astrocode-insights.png',
        width: 1500,
        height: 1200,
        alt: {
          en: 'AstroCode psychological portrait and elemental balance visualizations',
          ru: 'Психологический портрет и баланс стихий в AstroCode',
        },
        caption: {
          en: 'Visualized personal insights',
          ru: 'Визуализация персональных характеристик',
        },
      },
    ],
    accent: 'violet',
    link: 'https://astrocode-app.ru/',
    role: {
      en: 'Independent Product Engineer · Full-Stack Developer',
      ru: 'Независимый продуктовый инженер · Full-Stack разработчик',
    },
    summary: {
      en: 'A cross-platform subscription product launched on web, Telegram and Android. I built the product end to end, integrated payments and subscriptions, and converted early organic traffic into paid purchases.',
      ru: 'Кроссплатформенный продукт с подпиской для веба, Telegram и Android. Самостоятельно разработал его целиком, подключил платежи и подписки и получил первые платные покупки.',
    },
    capabilities: {
      en: [
        'Web, Telegram and Android delivery',
        'Payments and subscriptions',
        'Account and access flows',
        'Store publishing and analytics',
      ],
      ru: [
        'Веб, Telegram и Android',
        'Платежи и подписки',
        'Аккаунты и управление доступом',
        'Публикация и продуктовая аналитика',
      ],
    },
    details: [
      {
        label: { en: 'My role', ru: 'Моя роль' },
        value: {
          en: 'Owned the concept, requirements, frontend, backend, authentication, payments, subscriptions, publishing and iteration.',
          ru: 'Отвечал за концепцию, требования, frontend, backend, авторизацию, платежи, подписки, публикацию и развитие продукта.',
        },
      },
      {
        label: { en: 'Platforms', ru: 'Платформы' },
        value: {
          en: 'Web application, Telegram Mini App and Android releases through app stores.',
          ru: 'Веб-приложение, Telegram Mini App и Android-релизы через магазины приложений.',
        },
      },
      {
        label: { en: 'Payment flow', ru: 'Платёжный поток' },
        value: {
          en: 'Integrated YooKassa payments, webhooks and premium-access activation across product surfaces.',
          ru: 'Интегрировал ЮKassa, webhooks и активацию premium-доступа на разных платформах.',
        },
      },
      {
        label: {
          en: 'Cross-platform challenge',
          ru: 'Кроссплатформенная задача',
        },
        value: {
          en: 'Aligned account and subscription state between web, Telegram and Android environments.',
          ru: 'Согласовал состояние аккаунта и подписки между web, Telegram и Android.',
        },
      },
    ],
    results: {
      en: [
        'Publicly launched across web, Telegram and Android.',
        'Reached 2,158 RuStore page views, 80 installs, 33 registered accounts and 2 paid subscriptions by 16 September 2026.',
        'Continued iterating on the product across multiple Android releases based on real usage.',
      ],
      ru: [
        'Публично запущен в вебе, Telegram и Android.',
        'К 16 сентября 2026 года достиг 2 158 просмотров страницы RuStore, 80 установок, 33 зарегистрированных аккаунтов и 2 платных подписок.',
        'Продолжил развивать продукт через несколько Android-релизов на основе реального использования.',
      ],
    },
    tech: ['React', 'TypeScript', 'Node.js', 'YooKassa', 'Telegram', 'Android'],
  },
  {
    id: 'archive-assistant',
    name: 'Archive Assistant Bot',
    featured: false,
    category: 'ai',
    status: 'prototype',
    image: './images/projects/archive-assistant-answer.jpg',
    imageWidth: 1152,
    imageHeight: 785,
    imagePosition: 'center top',
    imageAlt: {
      en: 'Archive Assistant answer with source references',
      ru: 'Ответ Archive Assistant со ссылками на источники',
    },
    gallery: [
      {
        src: './images/projects/archive-assistant-answer.jpg',
        width: 1152,
        height: 785,
        alt: {
          en: 'Archive Assistant answer with numbered source references',
          ru: 'Ответ Archive Assistant с пронумерованными ссылками на источники',
        },
        caption: {
          en: 'Source-grounded answer with references',
          ru: 'Ответ по источникам со ссылками',
        },
      },
      {
        src: './images/projects/archive-assistant-intro.jpg',
        width: 1152,
        height: 2286,
        alt: {
          en: 'Archive Assistant Telegram onboarding and example questions',
          ru: 'Приветствие Archive Assistant в Telegram и примеры вопросов',
        },
        caption: {
          en: 'Telegram interface and suggested questions',
          ru: 'Telegram-интерфейс и примеры запросов',
        },
      },
    ],
    accent: 'coral',
    github: 'https://github.com/theDAREK497/archive-assistant-bot',
    role: {
      en: 'AI Integration Engineer · Backend Developer',
      ru: 'AI Integration Engineer · Backend-разработчик',
    },
    summary: {
      en: 'A local RAG assistant that retrieves information from a private documentation archive and returns source-grounded answers through Telegram.',
      ru: 'Локальный RAG-ассистент, который ищет информацию в частном архиве документов и возвращает ответы со ссылками на источники через Telegram.',
    },
    capabilities: {
      en: [
        'Document ingestion and parsing',
        'Semantic retrieval with FAISS',
        'Local LLM inference',
        'Source-grounded answers',
      ],
      ru: [
        'Загрузка и разбор документов',
        'Семантический поиск через FAISS',
        'Локальный inference LLM',
        'Ответы со ссылками на источники',
      ],
    },
    details: [
      {
        label: { en: 'Pipeline', ru: 'Пайплайн' },
        value: {
          en: 'Document collection, HTML parsing, cleaning, semantic chunking, embeddings, FAISS retrieval and local generation.',
          ru: 'Сбор документов, HTML-парсинг, очистка, семантический чанкинг, эмбеддинги, поиск FAISS и локальная генерация.',
        },
      },
      {
        label: { en: 'Privacy', ru: 'Приватность' },
        value: {
          en: 'Documents, embeddings, retrieval and language-model inference can stay on local infrastructure through LM Studio.',
          ru: 'Документы, эмбеддинги, retrieval и inference языковой модели могут оставаться на локальной инфраструктуре через LM Studio.',
        },
      },
      {
        label: { en: 'Answer design', ru: 'Формат ответа' },
        value: {
          en: 'Responses include numbered references and links back to the retrieved source material.',
          ru: 'Ответы содержат пронумерованные ссылки на найденные исходные материалы.',
        },
      },
    ],
    results: {
      en: [
        'Built and tested an end-to-end local RAG workflow for Russian-language documentation.',
        'Published a documented v0.1.0 milestone with automated tests, security checks and dependency auditing.',
      ],
      ru: [
        'Собрал и протестировал полный локальный RAG-процесс для русскоязычной документации.',
        'Опубликовал документированный milestone v0.1.0 с автоматическими тестами, security-checks и аудитом зависимостей.',
      ],
    },
    tech: ['Python', 'FAISS', 'Qwen', 'LM Studio', 'aiogram', 'RAG'],
  },
];
