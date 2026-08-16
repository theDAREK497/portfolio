import type { ProjectItem } from './types';

export const projects: ProjectItem[] = [
  {
    id: 'demiurge',
    name: 'Demiurge Assistant',
    featured: true,
    category: 'ai',
    status: 'active-development',
    image: './images/projects/demiurge-graph.png',
    imageWidth: 2190,
    imageHeight: 910,
    imagePosition: 'center',
    imageAlt: {
      en: 'Demiurge Assistant relationship graph connecting world entities',
      ru: 'Граф связей Demiurge Assistant между сущностями игрового мира',
    },
    gallery: [
      {
        src: './images/projects/demiurge-graph.png',
        width: 2190,
        height: 910,
        alt: {
          en: 'Demiurge Assistant relationship graph connecting world entities',
          ru: 'Граф связей Demiurge Assistant между сущностями игрового мира',
        },
        caption: {
          en: 'Interactive relationship graph',
          ru: 'Интерактивный граф связей',
        },
      },
      {
        src: './images/projects/demiurge-entity.png',
        width: 1209,
        height: 753,
        alt: {
          en: 'Demiurge Assistant structured character page with description and metadata',
          ru: 'Страница структурированной сущности персонажа в Demiurge Assistant',
        },
        caption: {
          en: 'Structured knowledge entity',
          ru: 'Структурированная сущность знаний',
        },
      },
      {
        src: './images/projects/demiurge-review.png',
        width: 1800,
        height: 799,
        alt: {
          en: 'Demiurge Assistant review queue for approving extracted knowledge',
          ru: 'Очередь проверки извлечённых знаний в Demiurge Assistant',
        },
        caption: {
          en: 'Human approval workflow',
          ru: 'Проверка и подтверждение человеком',
        },
      },
    ],
    accent: 'green',
    github: 'https://github.com/theDAREK497/demiurge-assistant',
    role: {
      en: 'Product Designer · Software Architect · Full-Stack Engineer',
      ru: 'Продуктовый дизайнер · Архитектор ПО · Full-Stack инженер',
    },
    summary: {
      en: 'A local-first knowledge platform that transforms unstructured LLM conversations into a controlled, reviewable and persistent knowledge base.',
      ru: 'Локальная платформа знаний, которая превращает неструктурированные LLM-диалоги в контролируемую, проверяемую и постоянную базу знаний.',
    },
    capabilities: {
      en: [
        'Persistent structured knowledge',
        'Human approval workflows',
        'Local and external LLM support',
        'Entity relationships',
      ],
      ru: [
        'Постоянные структурированные знания',
        'Подтверждение изменений человеком',
        'Локальные и внешние LLM',
        'Связи сущностей',
      ],
    },
    details: [
      {
        label: { en: 'Problem', ru: 'Проблема' },
        value: {
          en: 'Long-running AI chats mix facts and assumptions, lose context and make generated changes hard to review.',
          ru: 'В долгих AI-диалогах смешиваются факты и предположения, теряется контекст, а созданные изменения сложно проверять.',
        },
      },
      {
        label: { en: 'Knowledge model', ru: 'Модель знаний' },
        value: {
          en: 'Persistent entities and relationships keep confirmed information separate from AI suggestions.',
          ru: 'Постоянные сущности и связи отделяют подтверждённую информацию от предложений AI.',
        },
      },
      {
        label: { en: 'Human approval', ru: 'Подтверждение человеком' },
        value: {
          en: 'AI actions remain reviewable before they become part of the durable knowledge base.',
          ru: 'Действия AI можно проверить до того, как они станут частью постоянной базы знаний.',
        },
      },
      {
        label: { en: 'Local-first approach', ru: 'Локальный подход' },
        value: {
          en: 'Provider abstraction supports local and external LLMs while keeping the user in control of persistent data.',
          ru: 'Абстракция провайдеров поддерживает локальные и внешние LLM, сохраняя контроль пользователя над постоянными данными.',
        },
      },
      {
        label: { en: 'Trade-offs', ru: 'Компромиссы' },
        value: {
          en: 'The product prioritises reviewability and user control over fully autonomous AI updates.',
          ru: 'Продукт ставит проверяемость и контроль пользователя выше полностью автономных обновлений AI.',
        },
      },
    ],
    results: {
      en: [
        'Designed a controlled path from conversation to persistent knowledge.',
        'Built for Game Masters, world builders and writers managing complex fictional knowledge.',
      ],
      ru: [
        'Спроектирован контролируемый путь от диалога к постоянным знаниям.',
        'Продукт ориентирован на мастеров игр, создателей миров и авторов сложных вымышленных вселенных.',
      ],
    },
    tech: [
      'React',
      'FastAPI',
      'SQLite',
      'Local LLM',
      'RAG',
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
      en: 'Independent Product Engineer',
      ru: 'Независимый продуктовый инженер',
    },
    summary: {
      en: 'A cross-platform subscription product for personalized calculations, compatibility analysis and AI-generated reports.',
      ru: 'Кроссплатформенный подписочный продукт для персональных расчётов, анализа совместимости и отчётов, создаваемых с помощью AI.',
    },
    capabilities: {
      en: [
        'Web, Telegram and Android delivery',
        'Payments and subscriptions',
        'Account and access flows',
        'Store publishing',
      ],
      ru: [
        'Веб, Telegram и Android',
        'Платежи и подписки',
        'Аккаунты и управление доступом',
        'Публикация в магазинах',
      ],
    },
    details: [
      {
        label: { en: 'My role', ru: 'Моя роль' },
        value: {
          en: 'Owned product concept, requirements, frontend, backend, authentication, subscriptions, publishing and iteration.',
          ru: 'Отвечал за концепцию, требования, frontend, backend, авторизацию, подписки, публикацию и развитие продукта.',
        },
      },
      {
        label: { en: 'Platforms', ru: 'Платформы' },
        value: {
          en: 'Web application, Telegram Mini App, Android, RuStore and Huawei AppGallery.',
          ru: 'Веб-приложение, Telegram Mini App, Android, RuStore и Huawei AppGallery.',
        },
      },
      {
        label: { en: 'Payment flow', ru: 'Платёжный поток' },
        value: {
          en: 'Connected YooKassa payments, webhooks and subscription access across product surfaces.',
          ru: 'Связал платежи YooKassa, вебхуки и подписочный доступ между продуктовыми платформами.',
        },
      },
      {
        label: {
          en: 'Cross-platform challenge',
          ru: 'Кроссплатформенная задача',
        },
        value: {
          en: 'Aligned account, access and subscription state between web, Telegram and Android releases.',
          ru: 'Согласовал состояние аккаунта, доступа и подписки между вебом, Telegram и Android-релизами.',
        },
      },
    ],
    results: {
      en: [
        'Publicly launched across web, Telegram and Android.',
        '804 store page views, 11 installs and 1 paid monthly subscription from 01 June 2026 to 13 July 2026.',
        'The measured period had no active advertising campaign. No installation conversion is claimed.',
      ],
      ru: [
        'Публично запущен в вебе, Telegram и Android.',
        '804 просмотра страницы магазина, 11 установок и 1 платная месячная подписка за период с 1 июня по 13 июля 2026 года.',
        'В измеряемый период активная рекламная кампания не проводилась. Конверсия установок не заявляется.',
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
    image: './images/projects/archive-assistant-intro.jpg',
    imageWidth: 1152,
    imageHeight: 2286,
    imagePosition: 'center top',
    imageAlt: {
      en: 'Telegram conversation with Archive Assistant and source references',
      ru: 'Диалог с Archive Assistant в Telegram со ссылками на источники',
    },
    gallery: [
      {
        src: './images/projects/archive-assistant-intro.jpg',
        width: 1152,
        height: 2286,
        alt: {
          en: 'Archive Assistant Telegram bot introduction and example questions',
          ru: 'Приветствие Archive Assistant в Telegram и примеры вопросов',
        },
        caption: {
          en: 'Telegram onboarding and suggested questions',
          ru: 'Знакомство с ботом и примеры запросов',
        },
      },
      {
        src: './images/projects/archive-assistant-answer.jpg',
        width: 1152,
        height: 785,
        alt: {
          en: 'Archive Assistant answer with numbered source references',
          ru: 'Ответ Archive Assistant с пронумерованными ссылками на источники',
        },
        caption: {
          en: 'Source-linked answer from the private archive',
          ru: 'Ответ по частному архиву со ссылками на источники',
        },
      },
    ],
    accent: 'coral',
    github: 'https://github.com/theDAREK497/archive-assistant-bot',
    role: {
      en: 'RAG Prototype · Telegram Interface',
      ru: 'RAG-прототип · Telegram-интерфейс',
    },
    summary: {
      en: 'A Telegram assistant that retrieves information from a private documentation archive through a local RAG pipeline and returns source-linked answers.',
      ru: 'Telegram-ассистент, который ищет информацию в частном архиве документации через локальный RAG-пайплайн и возвращает ответы со ссылками на источники.',
    },
    capabilities: {
      en: [
        'Document parsing',
        'Semantic retrieval',
        'Local generation',
        'Source-linked answers',
      ],
      ru: [
        'Разбор документов',
        'Семантический поиск',
        'Локальная генерация',
        'Ссылки на источники',
      ],
    },
    details: [
      {
        label: { en: 'Pipeline', ru: 'Пайплайн' },
        value: {
          en: 'Document collection, parsing, semantic chunking, embeddings, FAISS retrieval and local generation.',
          ru: 'Сбор и разбор документов, семантический чанкинг, эмбеддинги, поиск FAISS и локальная генерация.',
        },
      },
      {
        label: { en: 'Privacy', ru: 'Приватность' },
        value: {
          en: 'Private documentation can be processed locally with a Qwen model through LM Studio.',
          ru: 'Частная документация может обрабатываться локально моделью Qwen через LM Studio.',
        },
      },
      {
        label: { en: 'Answer design', ru: 'Формат ответа' },
        value: {
          en: 'Responses include references back to the retrieved source material.',
          ru: 'Ответы содержат ссылки на найденные исходные материалы.',
        },
      },
    ],
    results: {
      en: [
        'Built and tested the complete local RAG workflow for Russian-language documentation.',
      ],
      ru: [
        'Собран и протестирован полный локальный RAG-процесс для русскоязычной документации.',
      ],
    },
    tech: ['Python', 'FAISS', 'Qwen', 'LM Studio', 'Telegram', 'RAG'],
  },
];
