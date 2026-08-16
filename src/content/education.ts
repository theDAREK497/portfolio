import type { EducationItem } from './types';

// TODO_OWNER: compare English degree names with the official diploma translations.
export const education: EducationItem[] = [
  {
    period: '2020 — 2022',
    degree: {
      en: 'Master’s Degree in Computer Science and Engineering',
      ru: 'Магистр: Информатика и вычислительная техника',
    },
    detail: {
      en: 'Specialization: Computer Analysis and Data Interpretation · 09.04.01',
      ru: 'Компьютерный анализ и интерпретация данных · 09.04.01',
    },
    school: {
      en: 'Tula State University',
      ru: 'Тульский государственный университет',
    },
  },
  {
    period: '2016 — 2020',
    degree: {
      en: 'Bachelor’s Degree in Information Systems and Technologies',
      ru: 'Бакалавр: Информационные системы и технологии',
    },
    detail: { en: 'Program 09.03.02', ru: 'Программа 09.03.02' },
    school: {
      en: 'Tula State University',
      ru: 'Тульский государственный университет',
    },
  },
];
