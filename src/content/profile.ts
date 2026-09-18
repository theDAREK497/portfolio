export const profile = {
  name: 'Ilya Gurikov',
  localizedName: { en: 'Ilya Gurikov', ru: 'Илья Гуриков' },
  title: 'Full-Stack & AI Integration Engineer',
  statement: {
    en: 'I build full-stack products, integrate business systems and turn AI capabilities into controlled, useful workflows.',
    ru: 'Создаю full-stack продукты, интегрирую бизнес-системы и превращаю возможности ИИ в управляемые рабочие процессы.',
  },
  summary: {
    en: 'Around 6 years of commercial experience across web development, enterprise integrations and production support. My commercial work now also includes enterprise AI/RAG automation, while my independent products extend that experience through APIs, payments and LLM integrations.',
    ru: 'Около 6 лет коммерческого опыта в веб-разработке, корпоративных интеграциях и сопровождении production-систем. Коммерческий опыт теперь также включает enterprise AI/RAG-автоматизацию, а собственные продукты расширяют его через API, платежи и интеграцию языковых моделей.',
  },
  availability: {
    en: 'Open to remote international roles',
    ru: 'Рассматриваю международную удалённую работу',
  },
  language: {
    en: 'Russian: native. English: B1 (intermediate), preparing for IELTS.',
    ru: 'Русский — родной. Английский — B1 (средний уровень), готовлюсь к IELTS.',
  },
  direction:
    'Full-Stack & Integration Engineering → Applied AI → Solutions Architecture',
} as const;

export const about = {
  title: {
    en: 'I like building the whole thing.',
    ru: 'Мне интересно собирать продукт целиком.',
  },
  paragraphs: {
    en: [
      'I started by combining QA with PHP, SQL and web integrations in IP telephony, then moved into e-commerce and enterprise services. Today, I work across requirements, implementation, integrations, delivery and production support.',
      'My commercial work is centered on full-stack development, business-process automation and system integration. I work directly with stakeholders, estimate and decompose tasks, design solutions and support them after release.',
      'My commercial work has also expanded into applied AI: an internal RAG assistant for regulatory search and document drafting reduced typical processing time from 2–5 hours to 15–20 minutes per request. My own projects extend that work into FastAPI, React, local LLMs, structured outputs and human-in-the-loop workflows.',
      'I enjoy turning unclear ideas into manageable products: clarify the problem, build a useful first version, integrate the moving parts and improve it from real usage.',
    ],
    ru: [
      'Я начинал с сочетания QA, PHP, SQL и веб-интеграций в IP-телефонии, затем перешёл к e-commerce и корпоративным сервисам. Сейчас работаю со всем циклом: требованиями, реализацией, интеграциями, выпуском и сопровождением в production.',
      'В коммерческой работе мой основной фокус — full-stack разработка, автоматизация бизнес-процессов и системные интеграции. Работаю напрямую с заказчиками, оцениваю и декомпозирую задачи, проектирую решения и сопровождаю их после запуска.',
      'Коммерческий опыт также расширился в прикладной AI: внутренний RAG-ассистент для поиска по регламентам и подготовки документов сократил типичное время обработки запроса с 2–5 часов до 15–20 минут. Собственные проекты развивают этот опыт в FastAPI, React, локальных LLM, структурированных ответах и human-in-the-loop процессах.',
      'Мне нравится превращать размытые идеи в управляемые продукты: уточнить задачу, собрать полезную первую версию, связать компоненты и улучшать результат на основе реального использования.',
    ],
  },
} as const;
