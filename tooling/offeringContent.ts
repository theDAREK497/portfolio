import { about, profile } from '../src/content/profile';
import { contacts } from '../src/content/contacts';
import { projects } from '../src/content/projects';
import { caseStudies, type CaseStudy } from '../src/content/cases';
import {
  engagement,
  services,
  type ServiceItem,
} from '../src/content/services';
import { translations } from '../src/content/translations';
import { demiurgeArticleCopy } from '../src/content/demiurgeArticle';
import { knowledgeArticleCopy } from '../src/content/demiurgeKnowledgeArticle';
import {
  articleFile,
  caseFile,
  homeFile,
  projectFile,
  serviceFile,
} from '../src/lib/routes';
import type { Lang } from '../src/content/types';

const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        char
      ]!,
  );
const p = (value: string) => `<p>${escape(value)}</p>`;
const list = (items: readonly string[]) =>
  `<ul>${items.map((item) => `<li>${escape(item)}</li>`).join('')}</ul>`;
const a = (href: string, label: string, className = '') =>
  `<a class="${className}" href="${escape(href)}">${escape(label)}</a>`;
const caseLinks = (ids: string[], lang: Lang) =>
  `<ul>${caseStudies
    .filter((item) => ids.includes(item.id))
    .map(
      (item) =>
        `<li>${a(`./${caseFile(item.id, lang)}`, item.title[lang])} — ${escape(item.kind[lang])}</li>`,
    )
    .join('')}</ul>`;
const serviceLinks = (ids: string[], lang: Lang) =>
  `<ul>${services
    .filter((item) => ids.includes(item.id))
    .map(
      (item) =>
        `<li>${a(`./${serviceFile(item.id, lang)}`, item.title[lang])}</li>`,
    )
    .join('')}</ul>`;
const contact = (lang: Lang, subject: string) =>
  `<footer id="contact"><h2>${lang === 'ru' ? 'Обсудим вашу задачу?' : 'Let’s discuss your task.'}</h2>${p(translations[lang].contact.text)}<div class="document-actions">${a(`mailto:${contacts.email}?subject=${encodeURIComponent(subject)}`, lang === 'ru' ? 'Написать на email' : 'Send an email', 'document-button')}${a(contacts.telegram, 'Telegram')}${a(`./${homeFile(lang)}#services`, lang === 'ru' ? 'Все услуги' : 'All services')}</div></footer>`;

export function serviceContent(service: ServiceItem, lang: Lang) {
  const ru = lang === 'ru';
  const workflow = engagement[lang];
  return `<main class="static-content project-document offering-document" id="main"><article>
    <header id="top"><p class="project-kicker">${ru ? 'Услуги / Илья Гуриков' : 'Services / Ilya Gurikov'}</p><h1>${escape(service.title[lang])}</h1><p class="project-lead">${escape(service.situation[lang])}</p>${p(service.outcome[lang])}<div class="document-actions">${a('#contact', ru ? 'Обсудить задачу' : 'Discuss a project', 'document-button')}${a('#related-cases', ru ? 'Смотреть кейсы' : 'See related cases')}</div></header>
    <section><h2>${ru ? 'Кому подойдёт' : 'Who this is for'}</h2>${p(service.audience[lang])}</section>
    <section><h2>${ru ? 'Что вы получите' : 'What you receive'}</h2>${list(service.deliverables[lang])}</section>
    <section><h2>${ru ? 'Как проходит работа' : 'How the work happens'}</h2><ol>${workflow.steps.map((step) => `<li><h3>${escape(step.title)}</h3>${p(step.text)}</li>`).join('')}</ol></section>
    <section><h2>${ru ? 'Объём и границы' : 'Scope and boundaries'}</h2>${p(service.scope[lang])}</section>
    <section id="related-cases"><h2>${ru ? 'Примеры работы' : 'Related work'}</h2>${caseLinks(service.caseIds, lang)}</section>
    ${contact(lang, service.title[lang])}
  </article></main>`;
}

export function caseContent(item: CaseStudy, lang: Lang) {
  const ru = lang === 'ru';
  return `<main class="static-content project-document offering-document" id="main"><article>
    <header id="top"><p class="project-kicker">${ru ? 'Кейс' : 'Case study'} / ${escape(item.kind[lang])}</p><h1>${escape(item.title[lang])}</h1><p class="project-lead">${escape(item.summary[lang])}</p></header>
    <section><h2>${ru ? 'Задача' : 'The task'}</h2>${p(item.task[lang])}</section>
    <section><h2>${ru ? 'Ограничения' : 'Constraints'}</h2>${p(item.constraints[lang])}</section>
    <section><h2>${ru ? 'Моя роль' : 'My role'}</h2>${p(item.role[lang])}</section>
    <section><h2>${ru ? 'Решение' : 'The solution'}</h2>${list(item.solution[lang])}</section>
    <section><h2>${ru ? 'Результат' : 'The result'}</h2>${list(item.results[lang])}</section>
    ${item.evidence.length ? `<section><h2>${ru ? 'Материалы и подтверждения' : 'Artifacts and evidence'}</h2><p>${ru ? 'Нажмите на снимок, чтобы рассмотреть оригинал.' : 'Select an image to inspect the original.'}</p>${item.evidence.map((image) => `<figure>${a(image.src, '').replace('</a>', `<img src="${escape(image.src)}" width="${image.width}" height="${image.height}" alt="${escape(image.caption[lang])}" loading="lazy"></a>`)}<figcaption>${escape(image.caption[lang])}</figcaption></figure>`).join('')}</section>` : ''}
    <section class="evidence-note"><h2>${ru ? 'Как читать результат' : 'How to read the result'}</h2>${p(item.limitations[lang])}</section>
    <section><h2>${ru ? 'Что это даёт вашей задаче' : 'What this means for your task'}</h2>${p(item.takeaway[lang])}${serviceLinks(item.serviceIds, lang)}</section>
    ${item.links.length || item.projectId || item.article ? `<section><h2>${ru ? 'Проверить глубже' : 'Explore further'}</h2><ul>${item.links.map((link) => `<li>${a(link.href, link.label[lang])}</li>`).join('')}${item.projectId ? `<li>${a(`./${projectFile(item.projectId, lang)}`, ru ? 'Описание проекта и технологии' : 'Project description and technologies')}</li>` : ''}${item.article ? `<li>${a(`./${articleFile(lang)}`, demiurgeArticleCopy[lang].title)}</li>` : ''}</ul></section>` : ''}
    ${contact(lang, item.title[lang])}
  </article></main>`;
}

export function homeContent(lang: Lang) {
  const ru = lang === 'ru';
  return `<main class="static-content offering-document" id="main">
    <header id="top"><p class="project-kicker">${escape(profile.localizedName[lang])} · ${escape(profile.availability[lang])}</p><h1>${escape(profile.headline[lang])}</h1>${p(profile.localizedTitle[lang])}${p(profile.statement[lang])}${p(profile.summary[lang])}<div class="document-actions">${a('#contact', ru ? 'Обсудить задачу' : 'Discuss a project', 'document-button')}${a('#cases', ru ? 'Смотреть кейсы' : 'View case studies')}</div></header>
    <section id="services"><h2>${ru ? 'Услуги' : 'Services'}</h2>${services.map((service) => `<article><h3>${a(`./${serviceFile(service.id, lang)}`, service.title[lang])}</h3>${p(service.situation[lang])}${p(service.outcome[lang])}</article>`).join('')}</section>
    <section id="cases"><h2>${ru ? 'Кейсы: задача, решение и результат' : 'Case studies: problem, solution and result'}</h2>${caseStudies.map((item) => `<article><p class="project-kicker">${escape(item.kind[lang])}</p><h3>${a(`./${caseFile(item.id, lang)}`, item.title[lang])}</h3>${p(item.summary[lang])}</article>`).join('')}</section>
    <section id="process"><h2>${escape(engagement[lang].title)}</h2>${p(engagement[lang].intro)}<ol>${engagement[lang].steps.map((step) => `<li><h3>${escape(step.title)}</h3>${p(step.text)}</li>`).join('')}</ol></section>
    <section id="projects"><h2>${ru ? 'Проекты' : 'Projects'}</h2>${projects.map((project) => `<article><h3>${a(`./${projectFile(project.id, lang)}`, project.name)}</h3>${p(project.summary[lang])}${p(translations[lang].projects.status[project.status])}</article>`).join('')}</section>
    <section id="writing"><h2>${ru ? 'Статьи' : 'Articles'}</h2><p>${a(`./${articleFile(lang)}`, demiurgeArticleCopy[lang].title)}</p><p>${a(`./${articleFile(lang, 'knowledge-base')}`, knowledgeArticleCopy[lang].title)}</p></section>
    <section id="about"><h2>${escape(about.title[lang])}</h2>${about.paragraphs[lang].slice(0, 2).map(p).join('')}${p(profile.language[lang])}</section>
    <section id="experience"><h2>${ru ? 'Ищете инженера в команду?' : 'Hiring for your team?'}</h2><p id="education">${a(`./resume-${lang}.html`, ru ? 'Полный опыт и образование' : 'Full experience and education')} · ${a(contacts.resumeUrl, translations[lang].hero.resume)}</p></section>
    ${contact(lang, profile.localizedName[lang])}
  </main>`;
}
