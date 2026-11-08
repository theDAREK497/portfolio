import type { LocalizedList, LocalizedText } from './types';

export interface CaseStudy {
  id: string;
  title: LocalizedText;
  kind: LocalizedText;
  summary: LocalizedText;
  task: LocalizedText;
  constraints: LocalizedText;
  role: LocalizedText;
  solution: LocalizedList;
  results: LocalizedList;
  limitations: LocalizedText;
  takeaway: LocalizedText;
  serviceIds: string[];
  projectId?: string;
  article?: boolean;
  image?: { src: string; width: number; height: number; alt: LocalizedText };
  evidence: Array<{
    src: string;
    width: number;
    height: number;
    caption: LocalizedText;
  }>;
  links: Array<{ href: string; label: LocalizedText }>;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'astrocode-launch',
    title: {
      ru: 'Один продукт — веб, Telegram и Android',
      en: 'One product across web, Telegram and Android',
    },
    kind: {
      ru: 'Собственный продукт · запущен',
      en: 'Independent product · live',
    },
    summary: {
      ru: 'AstroCode: полный цикл разработки, платежи, единый доступ и выпуск в магазинах приложений.',
      en: 'AstroCode: end-to-end development, payments, shared access and app-store delivery.',
    },
    task: {
      ru: 'Разработать и выпустить продукт с персональными расчётами и подпиской, доступный в браузере, Telegram и на Android.',
      en: 'Build and launch a personalised calculation and subscription product for the browser, Telegram and Android.',
    },
    constraints: {
      ru: 'Разные среды авторизации и оплаты, согласованное состояние подписки между платформами, самостоятельная разработка и сопровождение.',
      en: 'Different authentication and payment environments, consistent subscription state across platforms, independent development and maintenance.',
    },
    role: {
      ru: 'Автор продукта и full-stack разработчик: требования, интерфейс, backend, аккаунты, платежи, релизы и развитие.',
      en: 'Product owner and full-stack developer: requirements, interface, backend, accounts, payments, releases and iteration.',
    },
    solution: {
      ru: [
        'Собрал интерфейс и backend, сценарии авторизации и управления доступом.',
        'Интегрировал ЮKassa, серверные уведомления об оплате и активацию Premium; согласовал доступ между платформами.',
        'Выпустил веб-приложение, Telegram Mini App и Android. Организовал публикацию в RuStore и Google Play.',
        'Добавил продуктовую аналитику с отдельным учётом сессий, аккаунтов и серверных операций; подготовил поисковые страницы и инструкции.',
      ],
      en: [
        'Built the interface and backend, authentication flows and access management.',
        'Integrated YooKassa, server payment notifications and Premium activation; aligned access across platforms.',
        'Released the web application, Telegram Mini App and Android app, with publishing through RuStore and Google Play.',
        'Added product analytics separating sessions, accounts and server operations; prepared search-facing pages and guides.',
      ],
    },
    results: {
      ru: [
        '126 установок в RuStore за всё время по состоянию на 8 ноября 2026 года. Статистика магазина может задерживаться до трёх дней.',
        'Google Play подтверждает production-релиз от 4 ноября 2026 года с развёртыванием на 100%.',
        '37 аккаунтов Web/APK и 15 аккаунтов Telegram в админ-панели на 8 ноября 2026 года. Один человек может иметь аккаунты в обеих группах.',
        'Google Search Console: 43 клика, 2,22 тыс. показов, CTR 1,9% и средняя позиция 7,6 за 10 октября — 6 ноября 2026 года.',
      ],
      en: [
        '126 all-time RuStore installs as observed on 8 November 2026. Store reporting may lag by up to three days.',
        'Google Play confirms a production release dated 4 November 2026 with a 100% rollout.',
        '37 Web/APK accounts and 15 Telegram accounts in the admin panel on 8 November 2026. A person may have accounts in both groups.',
        'Google Search Console: 43 clicks, 2.22K impressions, 1.9% CTR and average position 7.6 for 10 October–6 November 2026.',
      ],
    },
    limitations: {
      ru: 'Это ранний продукт и датированный срез. Установки не равны активным пользователям; аккаунты не равны уникальным людям. Данные поиска не доказывают влияние конкретного изменения или рост конверсии в оплату. Premium-доступ не равен числу покупок.',
      en: 'This is an early product and a dated snapshot. Installs are not active users; accounts are not unique people. Search data does not establish the effect of a particular change or an increase in purchase conversion. Premium access is not a purchase count.',
    },
    takeaway: {
      ru: 'Могу взять на себя задачу целиком: связать интерфейс, сервер, внешние сервисы и выпуск, а затем наблюдать рабочие сценарии.',
      en: 'I can own a complete task: connect interface, server, external services and delivery, then observe real workflows.',
    },
    serviceIds: ['product-development', 'integrations-automation'],
    projectId: 'astrocode',
    image: {
      src: './images/projects/astrocode-dashboard.png',
      width: 1500,
      height: 1206,
      alt: { ru: 'Интерфейс AstroCode', en: 'AstroCode interface' },
    },
    evidence: [
      {
        src: './images/cases/astrocode-rustore-2026-11-08.jpg',
        width: 1890,
        height: 620,
        caption: {
          ru: 'RuStore · все установки · за всё время до 08.11.2026 · 126. Снимок консоли от 08.11.2026.',
          en: 'RuStore · all installs · all time to 8 November 2026 · 126. Console captured on 8 November 2026.',
        },
      },
      {
        src: './images/cases/astrocode-play-release-2026-11-08.jpg',
        width: 1606,
        height: 432,
        caption: {
          ru: 'Google Play · production-релиз от 04.11.2026 · rollout 100%. Снимок от 08.11.2026; показатели установки относятся к релизу.',
          en: 'Google Play · production release dated 4 November 2026 · 100% rollout. Captured on 8 November 2026; install figures refer to the release.',
        },
      },
      {
        src: './images/cases/astrocode-search-2026-11-08.jpg',
        width: 2144,
        height: 635,
        caption: {
          ru: 'Google Search Console · веб-поиск · 10.10–06.11.2026. Снимок от 08.11.2026. Это показатели поиска, а не конверсия в покупку.',
          en: 'Google Search Console · web search · 10 October–6 November 2026. Captured on 8 November 2026. Search metrics, not purchase conversion.',
        },
      },
      {
        src: './images/cases/astrocode-operations-2026-11-08.jpg',
        width: 2512,
        height: 870,
        caption: {
          ru: 'Админ-панель AstroCode · снимок от 08.11.2026. Состояние аккаунтов и аналитика за 30 дней показаны раздельно; сессии собираются с согласия, серверные операции учитываются отдельно.',
          en: 'AstroCode admin panel · captured on 8 November 2026. Account state and 30-day analytics are separate; sessions require consent and server operations are counted separately.',
        },
      },
    ],
    links: [
      {
        href: 'https://astrocode-app.ru/',
        label: { ru: 'Открыть AstroCode', en: 'Visit AstroCode' },
      },
      {
        href: 'https://play.google.com/store/apps/details?id=com.dixtalescat.astrocode',
        label: { ru: 'Google Play', en: 'Google Play' },
      },
      {
        href: 'https://www.rustore.ru/catalog/app/com.dixtalescat.astrocode',
        label: { ru: 'RuStore', en: 'RuStore' },
      },
    ],
  },
  {
    id: 'booking-automation',
    title: {
      ru: 'Бронирование вместо ручных согласований',
      en: 'Booking without a manual approval chain',
    },
    kind: {
      ru: 'Коммерческая работа в компании',
      en: 'Commercial work within an employer',
    },
    summary: {
      ru: 'Внутренний сервис для организации с 3000+ сотрудниками. От требований до сопровождения.',
      en: 'An internal service for an organisation of 3,000+ employees, from requirements to support.',
    },
    task: {
      ru: 'Заменить ручную цепочку согласования бронирования переговорных внутренним веб-сервисом.',
      en: 'Replace a manual meeting-room booking approval chain with an internal web service.',
    },
    constraints: {
      ru: 'Корпоративное окружение, существующие процессы и требования внутренних заказчиков. Внутренние интерфейсы и данные не публикуются.',
      en: 'An enterprise environment, existing processes and internal stakeholder requirements. Internal interfaces and data are not published.',
    },
    role: {
      ru: 'Full-stack разработчик в ООО «Газпром информ». Уточнение требований, разработка с нуля, выпуск и сопровождение.',
      en: 'Full-stack developer at Gazprom Inform LLC. Requirement clarification, development from scratch, release and maintenance.',
    },
    solution: {
      ru: [
        'Перевёл ручной процесс бронирования в веб-сервис.',
        'Работал напрямую с внутренними заказчиками: декомпозировал задачу, согласовывал требования и выпускал решение.',
        'Сопровождал сервис в составе корпоративной системы.',
      ],
      en: [
        'Moved the manual booking process into a web service.',
        'Worked directly with internal stakeholders to decompose the task, agree on requirements and release the solution.',
        'Supported the service within the enterprise environment.',
      ],
    },
    results: {
      ru: [
        'Разработан сервис бронирования для организации с 3000+ сотрудниками.',
        'По оценке, указанной в опыте работы, экономия составляет около 17,5 человеко-часа в неделю.',
      ],
      en: [
        'Built a booking service for an organisation of 3,000+ employees.',
        'The estimate recorded in my work experience is approximately 17.5 employee-hours saved per week.',
      ],
    },
    limitations: {
      ru: 'Описание основано на моём опыте работы. Исходный расчёт экономии и внутренние отчёты не опубликованы; 17,5 часа — оценка, а 3000+ — численность организации, не число активных пользователей. Это работа у работодателя, а не отдельный аутсорс-заказ.',
      en: 'The description is based on my work experience. The original savings calculation and internal reports are not public; 17.5 hours is an estimate, and 3,000+ is the organisation size, not active users. This was employment work, not an independent outsourcing engagement.',
    },
    takeaway: {
      ru: 'Автоматизацию начинаю с реального процесса и довожу до сервиса, который можно сопровождать.',
      en: 'I start automation with the actual workflow and take it through to a maintainable service.',
    },
    serviceIds: ['integrations-automation', 'product-development'],
    evidence: [],
    links: [],
  },
  {
    id: 'reviewable-ai',
    title: {
      ru: 'AI предлагает — человек подтверждает',
      en: 'AI proposes. A person approves.',
    },
    kind: {
      ru: 'Собственный проект · MVP в разработке',
      en: 'Independent project · MVP in development',
    },
    summary: {
      ru: 'Demiurge Assistant: генерация и поиск по знаниям с проверкой изменений до записи в базу.',
      en: 'Demiurge Assistant: knowledge retrieval and generation with review before changes reach storage.',
    },
    task: {
      ru: 'Сохранить структурированные знания вымышленного мира и использовать LLM, не смешивая подтверждённые факты с предложениями модели.',
      en: 'Preserve structured knowledge for a fictional world while using an LLM without mixing confirmed facts and model suggestions.',
    },
    constraints: {
      ru: 'Нужны постоянные сущности и связи, поддержка локальных моделей и возможность проверить результат перед сохранением.',
      en: 'Persistent entities and relationships, support for local models and review before saving are required.',
    },
    role: {
      ru: 'Автор проекта, архитектура, full-stack разработка и AI-интеграция.',
      en: 'Project creator, architecture, full-stack development and AI integration.',
    },
    solution: {
      ru: [
        'Разделил постоянное состояние мира и сгенерированные предложения.',
        'Связал FastAPI, React, структурированные сущности и семантический поиск.',
        'Добавил черновик изменений и проверку человеком до публикации в базу знаний.',
        'Поддержал локальные OpenAI-совместимые модели и внешних провайдеров.',
      ],
      en: [
        'Separated persistent world state from generated proposals.',
        'Connected FastAPI, React, structured entities and semantic retrieval.',
        'Added a change draft and human review before publication to the knowledge base.',
        'Supported local OpenAI-compatible models and external providers.',
      ],
    },
    results: {
      ru: [
        'Рабочий MVP с постоянными сущностями, связями, retrieval и проверяемым сохранением AI-изменений.',
        'Публичный репозиторий и техническая статья с интерфейсами и разбором решений.',
      ],
      en: [
        'A working MVP with persistent entities, relationships, retrieval and reviewable AI write-back.',
        'A public repository and technical article with interface examples and design decisions.',
      ],
    },
    limitations: {
      ru: 'Это собственный MVP, а не внедрение у корпоративного заказчика. Не заявляю измеренную точность модели, экономию рабочего времени или готовность к любому промышленному сценарию.',
      en: 'This is an independent MVP, not an enterprise client deployment. I do not claim measured model accuracy, labour savings or readiness for every production workflow.',
    },
    takeaway: {
      ru: 'AI-интеграция включает управление данными, проверку результата и понятные границы автоматизации.',
      en: 'AI integration includes data management, output review and clear limits on automation.',
    },
    serviceIds: ['integrations-automation'],
    projectId: 'demiurge',
    article: true,
    image: {
      src: './images/articles/demiurge-ai-chat/demiurge-human-review.png',
      width: 1517,
      height: 643,
      alt: {
        ru: 'Проверка AI-предложений в Demiurge Assistant',
        en: 'Reviewing AI proposals in Demiurge Assistant',
      },
    },
    evidence: [
      {
        src: './images/articles/demiurge-ai-chat/demiurge-human-review.png',
        width: 1517,
        height: 643,
        caption: {
          ru: 'Черновик изменений перед публикацией в мир. Скриншот интерфейса проекта.',
          en: 'A draft of changes before publication to the world. Project interface screenshot.',
        },
      },
    ],
    links: [
      {
        href: 'https://github.com/theDAREK497/demiurge-assistant',
        label: { ru: 'Исходный код Demiurge', en: 'Demiurge source code' },
      },
    ],
  },
  {
    id: 'legacy-performance',
    title: {
      ru: 'Поиск узких мест в существующих сайтах',
      en: 'Finding bottlenecks in existing websites',
    },
    kind: {
      ru: 'Коммерческий опыт · инженерный разбор',
      en: 'Commercial experience · engineering account',
    },
    summary: {
      ru: 'Работа в Onpeak Digital: загрузка страниц, JavaScript, API, SQL и кеширование.',
      en: 'Work at Onpeak Digital: page loading, JavaScript, APIs, SQL and caching.',
    },
    task: {
      ru: 'Разобраться в причинах медленной работы существующих e-commerce и корпоративных сайтов.',
      en: 'Investigate slow existing e-commerce and corporate websites.',
    },
    constraints: {
      ru: 'Legacy-код и несколько слоёв системы: PHP, JavaScript, API и MySQL. Старые профили и сопоставимые замеры не сохранились для публикации.',
      en: 'Legacy code across PHP, JavaScript, APIs and MySQL. Historical profiles and comparable measurements are not available for publication.',
    },
    role: {
      ru: 'Full-stack веб-разработчик в Onpeak Digital, март 2021 — сентябрь 2022.',
      en: 'Full-stack web developer at Onpeak Digital, March 2021–September 2022.',
    },
    solution: {
      ru: [
        'Использовал Chrome DevTools, Lighthouse и PageSpeed Insights для диагностики.',
        'Применял lazy loading и оптимизацию изображений, кеширование и «Композитный сайт» Битрикс.',
        'Разбирал JavaScript/API и запросы MySQL; устранял проблемы на соответствующем слое.',
      ],
      en: [
        'Used Chrome DevTools, Lighthouse and PageSpeed Insights for diagnosis.',
        'Applied lazy loading, image optimisation, caching and Bitrix Composite Site.',
        'Investigated JavaScript/APIs and MySQL queries, fixing issues at the relevant layer.',
      ],
    },
    results: {
      ru: [
        'Практический опыт диагностики и оптимизации frontend, backend и базы данных на клиентских проектах.',
        'Более 10 веб-проектов в рамках работы в Onpeak; это объём портфеля, не число измеренных экспериментов.',
      ],
      en: [
        'Practical frontend, backend and database diagnosis and optimisation on client projects.',
        'Worked across 10+ web projects at Onpeak; this is portfolio scope, not a count of measured experiments.',
      ],
    },
    limitations: {
      ru: 'Это обобщение коммерческого опыта, а не один воспроизводимый эксперимент. Без исходных замеров не привожу проценты ускорения, баллы Lighthouse или влияние на продажи.',
      en: 'This summarises commercial experience rather than a single reproducible experiment. Without baseline measurements, I do not quote speed-up percentages, Lighthouse scores or sales impact.',
    },
    takeaway: {
      ru: 'В новой задаче сначала фиксирую сценарий и условия измерения, затем выбираю механизм оптимизации и повторяю проверку.',
      en: 'For a new task, I first establish the scenario and measurement conditions, then choose an optimisation and repeat the check.',
    },
    serviceIds: ['performance'],
    evidence: [],
    links: [],
  },
];
