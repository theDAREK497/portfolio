import type { ExperienceItem } from './types';

export const experience: ExperienceItem[] = [
  {
    company: { en: 'Gazprom Inform LLC', ru: 'ООО «Газпром информ»' },
    role: { en: 'Full-Stack Web Developer', ru: 'Full-Stack веб-разработчик' },
    period: { en: 'Aug 2023 — Present', ru: 'Авг 2023 — настоящее время' },
    context: {
      en: 'Develop and support internal enterprise services, from clarifying requirements to backend logic, interfaces, integrations and production support.',
      ru: 'Разрабатываю и поддерживаю внутренние корпоративные сервисы: от уточнения требований до серверной логики, интерфейсов, интеграций и сопровождения в эксплуатации.',
    },
    points: {
      en: [
        'Optimised API operations and SQL queries, improving service response times by approximately 30%.',
        'Built a meeting-room booking service from scratch, replacing a manual process and saving approximately 17.5 employee-hours per week.',
        'Integrated applications with a corporate SOAP data bus: parsed, validated and transformed large, flat datasets into hierarchical models.',
        'Develop Python scripts with Pandas and NumPy to analyse logs, metrics and operational data; investigate production issues and improve existing services.',
      ],
      ru: [
        'Оптимизировал операции API и SQL-запросы, улучшив время отклика сервисов примерно на 30%.',
        'С нуля разработал сервис бронирования переговорных: заменил ручной процесс и сэкономил сотрудникам примерно 17,5 часа в неделю.',
        'Подключал приложения к корпоративной SOAP-шине: разбирал и проверял большие наборы данных, преобразовывал плоские структуры в иерархические модели.',
        'Пишу Python-скрипты с Pandas и NumPy для анализа логов, метрик и операционных данных; разбираюсь со сбоями в эксплуатации и дорабатываю существующие сервисы.',
      ],
    },
    tech: [
      'PHP',
      '1C-Bitrix',
      'JavaScript',
      'SQL',
      'SOAP',
      'Python',
      'Pandas',
      'NumPy',
    ],
  },
  {
    company: { en: 'Onpeak Digital', ru: 'Onpeak Digital' },
    role: { en: 'Full-Stack Web Developer', ru: 'Full-Stack веб-разработчик' },
    period: { en: 'Mar 2021 — Sep 2022', ru: 'Мар 2021 — сен 2022' },
    context: {
      en: 'Delivered e-commerce platforms and integrations across the full development cycle.',
      ru: 'Разрабатывал интернет-магазины и интеграции — от постановки задачи до выпуска.',
    },
    points: {
      en: [
        'Improved commercial website performance through legacy refactoring, Bitrix Composite Site, API and JavaScript optimisation, caching and lazy loading.',
        'Introduced Docker and Docker Compose to make development environments and deployments more reproducible.',
        'Mentored two junior developers, reviewed code, broke down requirements and assigned tasks within Scrum and Kanban workflows.',
        'Developed PHP, JavaScript and MySQL e-commerce solutions; investigated bottlenecks and production defects across backend, frontend and database layers.',
      ],
      ru: [
        'Ускорял коммерческий сайт: переработал устаревший код, внедрил «Композитный сайт» Битрикс, оптимизировал API и JavaScript, добавил кеширование и отложенную загрузку.',
        'Внедрил Docker и Docker Compose, чтобы окружения разработки и развёртывание были более воспроизводимыми.',
        'Был наставником двух начинающих разработчиков: проводил ревью кода, декомпозировал требования и распределял задачи в процессах Scrum и Kanban.',
        'Разрабатывал интернет-магазины на PHP, JavaScript и MySQL; устранял узкие места и ошибки на уровне сервера, интерфейса и базы данных.',
      ],
    },
    tech: [
      '1C-Bitrix',
      'PHP',
      'JavaScript',
      'MySQL',
      'Docker',
      'Docker Compose',
    ],
  },
  {
    company: { en: 'ITooLabs', ru: 'ITooLabs' },
    role: {
      en: 'QA & Web Developer',
      ru: 'QA и веб-разработчик',
    },
    period: { en: 'Sep 2018 — Mar 2020', ru: 'Сен 2018 — мар 2020' },
    context: {
      en: 'Combined QA and web development in IP telephony and cloud communications, working part-time on backend services, databases and integrations.',
      ru: 'Совмещал тестирование и веб-разработку в сфере IP-телефонии и облачных коммуникаций. На частичной занятости работал с серверной логикой, базами данных и интеграциями.',
    },
    points: {
      en: [
        'Developed backend functionality in native PHP and SQL, including a visitor feedback widget with its own data storage.',
        'Integrated CRM and IP telephony APIs to automate call processing and customer data workflows.',
        'Configured and used Zabbix to monitor service availability; combined issue investigation with QA and defect reporting.',
      ],
      ru: [
        'Разрабатывал серверную логику на чистом PHP и SQL, в том числе виджет обратной связи с собственным хранением данных.',
        'Интегрировал CRM и API IP-телефонии для автоматизации обработки звонков и работы с клиентскими данными.',
        'Настраивал и использовал Zabbix для мониторинга доступности сервисов; совмещал разбор сбоев с тестированием и описанием дефектов.',
      ],
    },
    tech: ['PHP', 'SQL', 'CRM APIs', 'IP telephony', 'Zabbix', 'Manual QA'],
  },
];
