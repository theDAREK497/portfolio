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
  proof?: LocalizedText;
  proofDate?: LocalizedText;
  metrics?: Array<{ label: LocalizedText; value: LocalizedText }>;
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
    proof: {
      ru: '126 установок RuStore · production-релиз Google Play',
      en: '126 RuStore installs · Google Play production release',
    },
    proofDate: { ru: 'Срез на 8 ноября 2026', en: 'Snapshot: 8 November 2026' },
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
    id: 'astrocode-seo',
    title: {
      ru: 'SEO AstroCode: от SPA к доступным поиску страницам',
      en: 'AstroCode SEO: from an SPA to search-accessible pages',
    },
    kind: {
      ru: 'Собственный продукт · техническое SEO',
      en: 'Independent product · technical SEO',
    },
    summary: {
      ru: 'Серверный HTML, понятная идентичность продукта и отдельные руководства. Что сделано и что видно в Google Search Console.',
      en: 'Server-rendered HTML, consistent product identity and dedicated guides. The engineering work and what Google Search Console reports.',
    },
    task: {
      ru: 'Сделать публичное содержание React-приложения доступным до запуска JavaScript и помочь поисковым системам отличать АстроКод от одноимённых продуктов.',
      en: 'Make the React application’s public content accessible before JavaScript runs and help search systems distinguish AstroCode from other products with the same name.',
    },
    constraints: {
      ru: 'Интерактивное приложение остаётся SPA. В поисковые представления нельзя включать аккаунты и персональные результаты. Период наблюдения короткий; обычная доступность URL не подтверждает его индексацию.',
      en: 'The interactive application remains an SPA. Search-facing representations must exclude accounts and personal results. The observation window is short; an accessible URL does not prove indexing.',
    },
    role: {
      ru: 'Автор продукта и full-stack разработчик: публичные маршруты, серверная отрисовка, метаданные, генерация контента и проверка отчётов Search Console.',
      en: 'Product owner and full-stack developer: public routes, server rendering, metadata, content generation and Search Console review.',
    },
    solution: {
      ru: [
        'Собрал единый источник официальной идентичности: AstroCode / АстроКод, домен, Android-пакет и ссылки на продукт. Из него генерируются согласованные JSON-LD, страница /official и llms.txt.',
        'Добавил /guides/horoscope и /guides/compatibility. Сервер формирует их HTML через React renderToStaticMarkup; заголовки, содержание и ссылки доступны без клиентского JavaScript.',
        'Связал руководства с публичными страницами и добавил их в sitemap. Сохранил canonical и отдельные title/description публичных маршрутов.',
        'Подготовил Markdown-адреса для публичного контента: например, /guides/compatibility.md и /official.md. HTML и Markdown руководств строятся из одного источника; Accept: text/markdown поддерживается с Vary: Accept и ссылкой на канонический HTML.',
        'Добавил проверки свежести метаданных и публичных HTTP-ответов. Для релиза 4 ноября зафиксированы проверки начального HTML 12 маршрутов и сценариев без JavaScript на мобильной и настольной ширине.',
      ],
      en: [
        'Established a single official identity source: AstroCode / АстроКод, domain, Android package and product links. It generates consistent JSON-LD, the /official page and llms.txt.',
        'Added /guides/horoscope and /guides/compatibility. The server generates their HTML with React renderToStaticMarkup; headings, content and links are available without client JavaScript.',
        'Linked guides from public pages and added them to the sitemap. Preserved canonical URLs and route-specific public titles and descriptions.',
        'Provided Markdown URLs for public content, including /guides/compatibility.md and /official.md. Guide HTML and Markdown share one source; Accept: text/markdown is supported with Vary: Accept and a canonical HTML link.',
        'Added metadata freshness and public HTTP-response checks. The 4 November release records initial-HTML validation for 12 routes and no-JavaScript checks at mobile and desktop widths.',
      ],
    },
    results: {
      ru: [
        'Руководство о совместимости проверено на опубликованном сайте 8 ноября 2026 года: отдельные title, H1, разделы и официальные ссылки присутствуют.',
        'Search Console, ресурс https://astrocode-app.ru/, тип поиска Web, 10 октября — 6 ноября 2026: 43 клика, 2,22 тыс. показов, CTR 1,9%, средняя позиция 7,6. Значение показов округлено самой консолью.',
        'В таблице запросов видны не только названия бренда: «натальная карта онлайн» — 11 кликов и 737 показов; «натальная карта рассчитать» — 8 кликов и 615 показов за тот же период.',
        'Работы с руководствами и Markdown объединены в PR № 10 от 4 ноября. Срез Search Console перепроверен 8 ноября; он фиксирует видимость всего ресурса, а не только новых руководств.',
      ],
      en: [
        'The compatibility guide was checked on the live site on 8 November 2026: it has its own title, H1, content sections and official links.',
        'Search Console, property https://astrocode-app.ru/, Web search, 10 October–6 November 2026: 43 clicks, 2.22K impressions, 1.9% CTR and average position 7.6. The console rounds the impressions display.',
        'The query table includes non-brand searches: “натальная карта онлайн” has 11 clicks and 737 impressions; “натальная карта рассчитать” has 8 clicks and 615 impressions for the same period.',
        'The guides and Markdown work was merged in PR #10 on 4 November. The Search Console snapshot was rechecked on 8 November; it represents the entire property, not just the new guides.',
      ],
    },
    limitations: {
      ru: 'Это датированный срез без сопоставимого контрольного периода. Он включает дни до релиза 4 ноября и всего несколько дней после него: нельзя приписать все клики новым страницам или доказать причинный эффект работ. Средняя позиция 7,6 не означает постоянное седьмое место по каждому запросу. Клики поиска не равны обращениям и покупкам; рост конверсии не измерен. Markdown и llms.txt — дополнительные представления публичного контента, не доказанный фактор ранжирования. Индексация новых руководств этим отчётом не подтверждена.',
      en: 'This is a dated snapshot without a comparable control period. It spans days before the 4 November release and only a few days afterwards: clicks cannot all be attributed to new pages or establish a causal effect. Average position 7.6 does not mean a stable seventh place for every query. Search clicks are not enquiries or purchases; conversion growth was not measured. Markdown and llms.txt are additional public-content representations, not a demonstrated ranking factor. This report does not confirm indexing of the new guides.',
    },
    takeaway: {
      ru: 'Могу подготовить публичную часть SPA к обходу поиском, связать содержание и метаданные и организовать наблюдение за показами и переходами. Следующий шаг — сравнивать одинаковые периоды и отдельно смотреть страницы и запросы.',
      en: 'I can prepare an SPA’s public content for crawling, align content and metadata, and set up observation of impressions and clicks. The next step is to compare equal periods and examine pages and queries separately.',
    },
    serviceIds: ['product-development', 'performance'],
    projectId: 'astrocode',
    proof: {
      ru: '43 клика · 2,22 тыс. показов в Google',
      en: '43 clicks · 2.22K Google impressions',
    },
    proofDate: {
      ru: '10 октября — 6 ноября 2026 · Web',
      en: '10 October–6 November 2026 · Web',
    },
    metrics: [
      { label: { ru: 'Клики', en: 'Clicks' }, value: { ru: '43', en: '43' } },
      {
        label: { ru: 'Показы', en: 'Impressions' },
        value: { ru: '2,22 тыс.', en: '2.22K' },
      },
      { label: { ru: 'CTR', en: 'CTR' }, value: { ru: '1,9%', en: '1.9%' } },
      {
        label: { ru: 'Средняя позиция', en: 'Average position' },
        value: { ru: '7,6', en: '7.6' },
      },
    ],
    image: {
      src: './images/cases/astrocode-search-2026-11-08.jpg',
      width: 2144,
      height: 635,
      alt: {
        ru: 'Срез Google Search Console AstroCode за 10 октября — 6 ноября 2026',
        en: 'AstroCode Search Console snapshot for 10 October–6 November 2026',
      },
    },
    evidence: [
      {
        src: './images/cases/astrocode-search-2026-11-08.jpg',
        width: 2144,
        height: 635,
        caption: {
          ru: 'Google Search Console · весь ресурс astrocode-app.ru · Web · 10.10–06.11.2026. Снимок от 08.11.2026; показатели перепроверены в консоли в тот же день.',
          en: 'Google Search Console · whole astrocode-app.ru property · Web · 10 October–6 November 2026. Captured and rechecked on 8 November 2026.',
        },
      },
    ],
    links: [
      {
        href: 'https://astrocode-app.ru/guides/compatibility',
        label: {
          ru: 'Руководство: натальная карта и совместимость',
          en: 'Guide: natal chart and compatibility',
        },
      },
      {
        href: 'https://astrocode-app.ru/guides/horoscope',
        label: {
          ru: 'Руководство: гороскоп на телефоне',
          en: 'Guide: horoscope on a phone',
        },
      },
      {
        href: 'https://astrocode-app.ru/official',
        label: {
          ru: 'Официальная страница продукта',
          en: 'Official product page',
        },
      },
      {
        href: 'https://github.com/theDAREK497/AstroGenesis/pull/7',
        label: {
          ru: 'PR № 7: идентичность и метаданные',
          en: 'PR #7: identity and metadata',
        },
      },
      {
        href: 'https://github.com/theDAREK497/AstroGenesis/pull/10',
        label: {
          ru: 'PR № 10: серверные руководства и Markdown',
          en: 'PR #10: server-rendered guides and Markdown',
        },
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
