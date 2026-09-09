export const profile = {
  name: 'Ilya Gurikov',
  localizedName: { en: 'Ilya Gurikov', ru: 'Илья Гуриков' },
  title: 'Full-Stack & AI Integration Engineer',
  statement: {
    en: 'I build web products, connect business systems and turn AI ideas into working tools.',
    ru: 'Создаю веб-продукты, связываю бизнес-системы и превращаю идеи с ИИ в работающие инструменты.',
  },
  summary: {
    en: 'About 6 years in commercial development and QA. Alongside my day job, I take my own products from the first prototype to launch — including APIs, payments and LLM integrations.',
    ru: 'Около 6 лет в коммерческой разработке и тестировании. Параллельно довожу свои продукты от первого прототипа до запуска: с API, платежами и интеграцией языковых моделей.',
  },
  availability: {
    en: 'Open to remote or hybrid roles',
    ru: 'Рассматриваю удалённую и гибридную работу',
  },
  language: {
    en: 'Russian: native. English: B1 (intermediate).',
    ru: 'Русский — родной. Английский — B1 (средний уровень).',
  },
  direction:
    'Integration Engineer → AI Solutions Engineer → Solutions Architect',
} as const;

export const about = {
  title: {
    en: 'I like building the whole thing.',
    ru: 'Мне интересно собирать продукт целиком.',
  },
  paragraphs: {
    en: [
      'I started by combining QA with PHP, SQL and web integrations in IP telephony. I then moved into e-commerce and corporate services. Today, I take business requirements through implementation, integration and production support.',
      'My own projects give me room to work through the whole product: what it should do, how the parts fit together, how payments work and what happens after launch.',
      'I am now focusing on Python, FastAPI, API integrations and practical uses of language models. I want AI features to fit into a clear workflow, with control over the data and the result.',
      'I enjoy the point where an idea becomes concrete: asking questions, choosing a manageable first version, building it and learning from how people actually use it.',
    ],
    ru: [
      'Я начинал с сочетания QA, PHP, SQL и веб-интеграций в IP-телефонии. Затем работал с интернет-магазинами и корпоративными сервисами. Сейчас довожу бизнес-требования до реализации, интеграции и сопровождения в эксплуатации.',
      'Собственные проекты позволяют пройти весь путь: понять, зачем нужен продукт, продумать его устройство, подключить оплату и разобраться, что происходит после запуска.',
      'Сейчас углубляюсь в Python, FastAPI, API-интеграции и практическое применение языковых моделей. Мне важно, чтобы ИИ был частью понятного процесса, в котором можно контролировать данные и результат.',
      'Больше всего мне нравится момент, когда идея становится конкретной: задать вопросы, выбрать посильную первую версию, собрать её и понять, как люди пользуются результатом.',
    ],
  },
} as const;
