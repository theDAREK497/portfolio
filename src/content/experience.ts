import type { ExperienceItem } from './types';

export const experience: ExperienceItem[] = [
  {
    company: { en: 'Gazprom Inform LLC', ru: 'ООО «Газпром информ»' },
    role: { en: 'Full-Stack Developer', ru: 'Full-Stack разработчик' },
    period: { en: 'Aug 2023 — Present', ru: 'Авг 2023 — настоящее время' },
    context: {
      en: 'Building corporate portals and departmental services with web, data and business-system integrations.',
      ru: 'Разрабатываю корпоративные порталы и сервисы подразделений с веб-, data- и бизнес-интеграциями.',
    },
    points: {
      en: [
        'Built a Python and FastAPI service for analysing logs and operational metrics, helping the team identify incidents earlier.',
        'Improved API and database behaviour through query refactoring, indexing and caching.',
        'Integrated internal services through SOAP APIs and an enterprise service bus.',
      ],
      ru: [
        'Создал сервис на Python и FastAPI для анализа логов и операционных метрик, который помогает раньше выявлять инциденты.',
        'Улучшал работу API и баз данных через рефакторинг запросов, индексы и кеширование.',
        'Интегрировал внутренние сервисы через SOAP API и корпоративную сервисную шину.',
      ],
    },
    tech: ['1C-Bitrix', 'Vue.js', 'Python', 'FastAPI', 'PostgreSQL', 'SOAP'],
  },
  {
    company: { en: 'OnPeak', ru: 'OnPeak' },
    role: { en: 'Full-Stack Developer', ru: 'Full-Stack разработчик' },
    period: { en: 'Mar 2021 — Sep 2022', ru: 'Мар 2021 — сен 2022' },
    context: {
      en: 'Delivered e-commerce platforms and integrations across the full development cycle.',
      ru: 'Разрабатывал e-commerce платформы и интеграции на полном цикле.',
    },
    points: {
      en: [
        'Containerised services and contributed to automated delivery through GitLab CI/CD.',
        'Developed an adapter for synchronising orders with an external inventory system, including retry and failure-handling logic.',
        'Refactored legacy application code and improved maintainability and page performance.',
      ],
      ru: [
        'Контейнеризировал сервисы и участвовал в автоматизации поставки через GitLab CI/CD.',
        'Разработал адаптер синхронизации заказов с внешней складской системой, включая повторные попытки и обработку сбоев.',
        'Рефакторил legacy-код приложения, улучшая поддерживаемость и скорость страниц.',
      ],
    },
    tech: ['1C-Bitrix', 'PHP', 'JavaScript', 'Docker', 'REST APIs', 'MySQL'],
  },
  {
    company: { en: 'ITooLabs', ru: 'ITooLabs' },
    role: {
      en: 'Manual QA & Frontend Developer',
      ru: 'Ручное тестирование и Frontend-разработка',
    },
    period: { en: 'Sep 2018 — Mar 2020', ru: 'Сен 2018 — мар 2020' },
    context: {
      en: 'Worked on web tools for a VoIP and cloud-communications product.',
      ru: 'Работал над веб-инструментами для продукта в области VoIP и облачных коммуникаций.',
    },
    points: {
      en: [
        'Tested product flows and documented defects across web interfaces.',
        'Implemented frontend changes and supported issue investigation with the development team.',
      ],
      ru: [
        'Тестировал продуктовые сценарии и документировал дефекты веб-интерфейсов.',
        'Реализовывал frontend-изменения и помогал команде разработки исследовать проблемы.',
      ],
    },
    tech: ['Manual QA', 'JavaScript', 'HTML', 'CSS', 'Debugging'],
  },
];
