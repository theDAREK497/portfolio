export type Lang = 'en' | 'ru';
export type Theme = 'light' | 'dark';
export type LocalizedText = Record<Lang, string>;
export type LocalizedList = Record<Lang, string[]>;

export type ProjectStatus =
  'live' | 'active-development' | 'prototype' | 'archived';

export interface ProjectItem {
  id: string;
  name: string;
  featured: boolean;
  category: 'product' | 'ai';
  status: ProjectStatus;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imagePosition?: string;
  imageAlt: LocalizedText;
  gallery: Array<{
    src: string;
    width: number;
    height: number;
    alt: LocalizedText;
    caption: LocalizedText;
  }>;
  accent: 'violet' | 'green' | 'coral';
  github?: string;
  link?: string;
  role: LocalizedText;
  summary: LocalizedText;
  capabilities: LocalizedList;
  details: Array<{ label: LocalizedText; value: LocalizedText }>;
  results: LocalizedList;
  tech: string[];
}

export interface ExperienceItem {
  company: LocalizedText;
  role: LocalizedText;
  period: LocalizedText;
  context: LocalizedText;
  points: LocalizedList;
  tech: string[];
}

export interface EducationItem {
  period: string;
  degree: LocalizedText;
  detail: LocalizedText;
  school: LocalizedText;
}
