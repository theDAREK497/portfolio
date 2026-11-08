import type { LocalizedList, LocalizedText } from './types';

export interface ServiceItem {
  id: string;
  title: LocalizedText;
  situation: LocalizedText;
  outcome: LocalizedText;
  audience: LocalizedText;
  deliverables: LocalizedList;
  scope: LocalizedText;
  caseIds: string[];
}

export const services: ServiceItem[] = [
  {
    id: 'product-development',
    title: { ru: 'Разработка продукта', en: 'Product development' },
    situation: {
      ru: 'Нужно запустить сервис или выпустить функцию целиком.',
      en: 'You need to launch a service or ship a complete feature.',
    },
    outcome: {
      ru: 'От требований и интерфейса до backend, выпуска и проверки рабочего сценария.',
      en: 'From requirements and interface to backend, release and a verified user journey.',
    },
    audience: {
      ru: 'Небольшим продуктовым командам и компаниям, которым нужен инженер для всей задачи: личный кабинет, внутренний сервис, подписка или новая функция существующего продукта.',
      en: 'For small product teams and businesses that need an engineer to own a complete task: an account area, internal service, subscription or feature in an existing product.',
    },
    deliverables: {
      ru: [
        'Согласованные сценарии, объём первой версии и критерии приёмки.',
        'Интерфейс, API и модель данных в вашем репозитории.',
        'Проверки ключевых сценариев, выпуск и инструкция по сопровождению.',
      ],
      en: [
        'Agreed user journeys, first-release scope and acceptance criteria.',
        'Interface, API and data model in your repository.',
        'Key workflow checks, release and maintenance notes.',
      ],
    },
    scope: {
      ru: 'Сроки, стоимость, инфраструктуру и поддержку согласуем после разбора задачи. Дизайн бренда, продвижение и круглосуточное дежурство требуют отдельного объёма работ.',
      en: 'Timeline, cost, infrastructure and support are agreed after discovery. Brand design, marketing and round-the-clock on-call coverage require a separate scope.',
    },
    caseIds: ['astrocode-launch'],
  },
  {
    id: 'integrations-automation',
    title: {
      ru: 'Интеграции и автоматизация',
      en: 'Integrations & automation',
    },
    situation: {
      ru: 'Данные переносят вручную, а сервисы не связаны между собой.',
      en: 'People copy data by hand and your services do not talk to each other.',
    },
    outcome: {
      ru: 'Связанные API, CRM и рабочие процессы. Прикладной ИИ там, где результат можно проверить.',
      en: 'Connected APIs, CRMs and workflows. Applied AI where its output can be reviewed.',
    },
    audience: {
      ru: 'Командам с повторяющимися операциями: заявки, согласования, обмен данными, платежи и поиск по документам. Начинаем с процесса и требований к доступу.',
      en: 'For teams with repetitive operations: requests, approvals, data exchange, payments and document search. We start with the workflow and access requirements.',
    },
    deliverables: {
      ru: [
        'Схема процесса и правила обмена данными.',
        'Интеграция с валидацией, обработкой ошибок и понятными статусами.',
        'Проверка полного сценария; для AI — источники, ограничения и этап проверки человеком.',
      ],
      en: [
        'Workflow map and data exchange rules.',
        'Integration with validation, error handling and clear statuses.',
        'An end-to-end workflow check; for AI, sources, limitations and a human review step.',
      ],
    },
    scope: {
      ru: 'Понадобятся документация и согласованные доступы к системам. Лицензии сторонних сервисов обсуждаем отдельно. AI-сценарий сначала проверяем на ваших примерах.',
      en: 'System documentation and agreed access are needed. Third-party licences are discussed separately. An AI workflow starts with evaluation on your examples.',
    },
    caseIds: ['booking-automation', 'reviewable-ai', 'astrocode-launch'],
  },
  {
    id: 'performance',
    title: { ru: 'Диагностика и оптимизация', en: 'Diagnosis & performance' },
    situation: {
      ru: 'Сайт, API или фоновая задача работают медленно.',
      en: 'Your site, API or background job is slow.',
    },
    outcome: {
      ru: 'Измерения, найденные узкие места и исправления с повторной проверкой.',
      en: 'Measurements, identified bottlenecks and fixes followed by another measurement.',
    },
    audience: {
      ru: 'Компаниям с существующим продуктом, в котором нужно разобраться: загрузка интерфейса, лишние запросы, SQL, кеширование или нестабильный рабочий сценарий.',
      en: 'For businesses with an existing product that needs investigation: interface loading, excess requests, SQL, caching or an unreliable workflow.',
    },
    deliverables: {
      ru: [
        'Исходные замеры в согласованных сценариях и условиях.',
        'Причины задержек и список исправлений по приоритету.',
        'Отдельно согласованное внедрение и сравнение до/после при той же нагрузке.',
      ],
      en: [
        'Baseline measurements for agreed scenarios and conditions.',
        'Causes of delays and a prioritised list of fixes.',
        'Separately scoped implementation and a before/after comparison under the same load.',
      ],
    },
    scope: {
      ru: 'Диагностика — самостоятельный результат, внедрение можно согласовать следующим этапом. Цель ускорения определяем после исходных замеров. Техническая SEO-подготовка не включает обещания позиций или продаж.',
      en: 'Diagnosis is a standalone deliverable; implementation can be the next stage. Performance targets follow baseline measurements. Technical search preparation does not include promises of rankings or sales.',
    },
    caseIds: ['legacy-performance'],
  },
];

export const engagement = {
  ru: {
    eyebrow: 'Как работаем',
    title: 'Понятная задача. Проверяемый результат.',
    intro:
      'Можно начать с диагностики, заказать внедрение или договориться о дальнейшем развитии продукта.',
    steps: [
      {
        title: 'Разбираем задачу',
        text: 'Обсуждаем продукт, пользователей, ограничения и ожидаемый результат. Достаточно короткого описания и ссылки на сервис.',
      },
      {
        title: 'Согласуем этап',
        text: 'Фиксируем объём, результат, критерии приёмки, сроки и стоимость. Большую задачу делим на проверяемые этапы.',
      },
      {
        title: 'Внедряем и проверяем',
        text: 'Показываю ход работы, проверяю сценарии и выпускаю изменения. Передаю код и договорённости по сопровождению.',
      },
    ],
  },
  en: {
    eyebrow: 'Working together',
    title: 'A clear task. A result you can check.',
    intro:
      'Start with diagnosis, commission an implementation or arrange ongoing product development.',
    steps: [
      {
        title: 'Understand the task',
        text: 'We discuss the product, users, constraints and expected result. A short description and a product link are enough to start.',
      },
      {
        title: 'Agree on a stage',
        text: 'We define scope, deliverables, acceptance criteria, timeline and cost. Larger work is split into stages you can review.',
      },
      {
        title: 'Implement and verify',
        text: 'I share progress, check workflows and release the changes. You receive the code and agreed maintenance notes.',
      },
    ],
  },
} as const;
