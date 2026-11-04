import { readFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
const typography = readFileSync('src/styles/typography.css', 'utf8');
import type { Plugin } from 'vite';
import { about, profile } from '../src/content/profile';
import { contacts } from '../src/content/contacts';
import { education } from '../src/content/education';
import { experience } from '../src/content/experience';
import { projects } from '../src/content/projects';
import { capabilityGroups, skillLabel } from '../src/content/skills';
import { translations } from '../src/content/translations';
import { demiurgeArticleCopy } from '../src/content/demiurgeArticle';
import {
  knowledgeArticleCopy,
  knowledgeFigures,
  knowledgeImage,
} from '../src/content/demiurgeKnowledgeArticle';
import { writing } from '../src/content/writing';
import type { Lang, ProjectItem } from '../src/content/types';
import {
  articleFile,
  homeFile,
  projectFile,
  articleIdFromPath,
  type ArticleId,
} from '../src/lib/routes';

const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        char
      ]!,
  );
const paragraph = (value: string) => `<p>${escape(value)}</p>`;
const list = (items: readonly string[]) =>
  `<ul>${items.map((item) => `<li>${escape(item)}</li>`).join('')}</ul>`;
const link = (url: string, text: string) =>
  `<a href="${escape(url)}">${escape(text)}</a>`;
const files = [
  'index.html',
  'index-ru.html',
  'demiurge-ai-chat.html',
  'demiurge-ai-chat-ru.html',
  'demiurge-knowledge-base.html',
  'demiurge-knowledge-base-ru.html',
  'resume-en.html',
  'resume-ru.html',
  ...projects.flatMap((project) => [
    projectFile(project.id, 'en'),
    projectFile(project.id, 'ru'),
  ]),
];

export function resumeContent(lang: Lang) {
  const t = translations[lang];
  return `<main class="static-content" id="main"><header id="top"><h1>${escape(profile.localizedName[lang])}</h1>
    <p class="static-role">${escape(profile.localizedTitle[lang])}</p>${paragraph(profile.statement[lang])}${paragraph(profile.summary[lang])}
    ${paragraph(profile.availability[lang])}${paragraph(profile.language[lang])}
    <nav aria-label="${escape(t.nav.contact)}">${link(`mailto:${contacts.email}`, contacts.email)} · ${link(contacts.github, 'GitHub')} · ${link(contacts.linkedin, 'LinkedIn')} · ${link(contacts.telegram, 'Telegram')}</nav></header>
    <section id="experience"><h2>${t.nav.experience}</h2>${experience.map((job) => `<article><h3>${escape(job.role[lang])} · ${escape(job.company[lang])}</h3><p>${escape(job.period[lang])}</p>${paragraph(job.context[lang])}${list(job.points[lang])}<p>${escape(job.tech.join(' · '))}</p></article>`).join('')}</section>
    <section id="projects"><h2>${t.nav.projects}</h2>${projects.map((project) => `<article><h3>${link(`./${projectFile(project.id, lang)}`, project.name)}</h3><p>${escape(t.projects.status[project.status])} · ${escape(project.role[lang])}</p>${paragraph(project.summary[lang])}${list(project.results[lang])}<details><summary>${t.projects.caseStudy}</summary>${project.details.map((detail) => `<h4>${escape(detail.label[lang])}</h4>${paragraph(detail.value[lang])}`).join('')}</details><p>${escape(project.tech.join(' · '))}</p><p>${link(`./${projectFile(project.id, lang)}`, t.projects.projectPage)} ${project.github ? link(project.github, t.projects.github) : ''} ${project.link ? link(project.link, t.projects.liveLink) : ''}</p></article>`).join('')}</section>
    <section id="capabilities"><h2>${t.nav.capabilities}</h2>${paragraph(t.capabilities.intro)}${capabilityGroups.map((group) => `<h3>${escape(group.title[lang])}</h3><p>${escape(group.items.map((item) => skillLabel(item, lang)).join(' · '))}</p>`).join('')}</section>
    <section id="education"><h2>${t.nav.education}</h2>${education.map((item) => `<article><h3>${escape(item.degree[lang])}</h3>${paragraph(`${item.school[lang]} · ${item.period}`)}${paragraph(item.detail[lang])}</article>`).join('')}</section>
    <section id="about"><h2>${t.nav.about}</h2>${about.paragraphs[lang].map(paragraph).join('')}</section>
    <section id="writing"><h2>${t.nav.writing}</h2>${writing
      .filter((item) => item.status === 'published')
      .map(
        (item) =>
          `<p>${link(`./${articleFile(lang, item.articleId)}`, item[lang])}</p>`,
      )
      .join('')}${paragraph(t.writing.comingSoon)}</section>
    <footer id="contact"><h2>${t.contact.title}</h2>${paragraph(t.contact.text)}${link(`mailto:${contacts.email}`, contacts.email)}</footer></main>`;
}

export function projectContent(project: ProjectItem, lang: Lang) {
  const t = translations[lang];
  const otherProjects = projects.filter((item) => item.id !== project.id);
  return `<main class="static-content project-document" id="main"><article>
    <header><p class="project-kicker">${escape(t.projects.eyebrow)} / ${escape(t.projects.status[project.status])}</p><h1>${escape(project.name)}</h1><p class="project-lead">${escape(project.summary[lang])}</p><p>${escape(lang === 'ru' ? 'Автор и роль' : 'Author and role')}: ${escape(profile.localizedName[lang])} · ${escape(project.role[lang])}</p><p class="project-document-links">${project.link ? link(project.link, t.projects.liveLink) : ''} ${project.github ? link(project.github, t.projects.github) : ''}</p></header>
    <figure><img src="${escape(project.image)}" width="${project.imageWidth}" height="${project.imageHeight}" alt="${escape(project.imageAlt[lang])}" loading="lazy"><figcaption>${escape(project.imageAlt[lang])}</figcaption></figure>
    <section><h2>${escape(t.projects.result)}</h2>${list(project.results[lang])}</section>
    <section><h2>${escape(t.projects.capabilities)}</h2>${list(project.capabilities[lang])}</section>
    <section><h2>${escape(t.projects.caseStudy)}</h2>${project.details.map((detail) => `<h3>${escape(detail.label[lang])}</h3>${paragraph(detail.value[lang])}`).join('')}</section>
    <section><h2>${escape(t.projects.technologies)}</h2>${paragraph(project.tech.join(' · '))}</section>
    <section><h2>${escape(t.projects.gallery)}</h2><div class="project-document-gallery">${project.gallery.map((image) => `<figure><a href="${escape(image.src)}"><img src="${escape(image.src)}" width="${image.width}" height="${image.height}" alt="${escape(image.alt[lang])}" loading="lazy"></a><figcaption>${escape(image.caption[lang])}</figcaption></figure>`).join('')}</div></section>
    ${project.id === 'demiurge' ? `<section><h2>${escape(t.nav.writing)}</h2><p>${link(`./${articleFile(lang)}`, demiurgeArticleCopy[lang].title)}</p><p>${link(`./${articleFile(lang, 'knowledge-base')}`, knowledgeArticleCopy[lang].title)}</p></section>` : ''}
    <section><h2>${escape(lang === 'ru' ? 'Другие проекты' : 'More projects')}</h2><ul>${otherProjects.map((item) => `<li>${link(`./${projectFile(item.id, lang)}`, item.name)} — ${escape(item.summary[lang])}</li>`).join('')}</ul></section>
    <footer><h2>${escape(t.contact.title)}</h2>${paragraph(t.contact.text)}${link(`mailto:${contacts.email}`, contacts.email)} · ${link(`./${homeFile(lang)}#projects`, lang === 'ru' ? 'Все проекты' : 'All projects')}</footer>
  </article></main>`;
}

export function articleContent(lang: Lang, article: ArticleId = 'ai-chat') {
  if (article === 'knowledge-base') return knowledgeArticleContent(lang);
  const copy = demiurgeArticleCopy[lang];
  const figure = (file: string, caption: string) =>
    `<figure>${link(`./images/articles/demiurge-ai-chat/${file}`, '').replace('</a>', `<img src="./images/articles/demiurge-ai-chat/${file}" alt="${escape(caption)}" loading="lazy"></a>`)}<figcaption>${escape(caption)}</figcaption></figure>`;
  return `<main class="static-content" id="main"><article><header id="top">${link(`./${homeFile(lang)}#writing`, copy.back)}<h1>${escape(copy.title)}</h1>${paragraph(profile.localizedName[lang])}${paragraph(copy.deck)}<nav aria-label="${escape(copy.tocLabel)}">${copy.toc.map((item) => link(item.href, item.label)).join(' · ')}</nav></header>
    ${copy.opening.map(paragraph).join('')}${figure(lang === 'en' ? 'cover-en.png' : 'cover.png', copy.coverCaption)}
    ${(['world', 'chat', 'rag', 'hypothesis', 'goal'] as const)
      .map((key) => {
        const section = copy[key];
        const blocks = section.blocks
          .map((block) => {
            const tag =
              block.type === 'subheading'
                ? 'h3'
                : block.type === 'quote'
                  ? 'blockquote'
                  : 'p';
            return `<${tag}>${escape(block.text)}</${tag}>`;
          })
          .join('');
        const figures =
          key === 'world'
            ? `<h3>${escape(copy.worldFigureTitle)}</h3>${figure(lang === 'en' ? 'demiurge-encyclopedia.png' : 'encyclopedia.png', copy.worldFigureCaption)}${figure(lang === 'en' ? 'demiurge-human-review.png' : 'entity-a17.png', copy.worldFigureTitle)}${figure(lang === 'en' ? 'demiurge-relationship-graph.png' : 'relationship-graph.png', copy.worldFigureTitle)}`
            : key === 'chat'
              ? `<h3>${escape(copy.processFigureTitle)}</h3>${lang === 'en' ? `${figure('demiurge-ai-coauthor.png', 'AI co-author workflow with draft-first content generation')}${figure('demiurge-human-review.png', 'Human-in-the-loop review before AI-generated changes become canonical knowledge')}${figure('demiurge-world-audit.png', 'AI-assisted world audit for contradictions, duplicates and missing links')}` : ''}${paragraph(`${copy.processChat}: ${copy.processChatNodes.join(' → ')}`)}${paragraph(`${copy.processDemiurge}: ${copy.processDemiurgeNodes.join(' → ')}`)}${paragraph(copy.processFigureCaption)}`
              : key === 'rag'
                ? `<h3>${escape(copy.ragFigureTitle)}</h3>${figure(lang === 'en' ? 'rag-llm-wiki-demiurge-en.png' : 'rag-llm-wiki-demiurge.png', copy.ragFigureCaption)}`
                : key === 'hypothesis'
                  ? `<h3>${escape(copy.reviewFigureTitle)}</h3>${lang === 'en' ? `${figure('demiurge-human-review.png', copy.reviewFigureCaption)}${figure('demiurge-world-audit.png', 'AI-assisted world audit for contradictions, duplicates and missing links')}` : figure('world-review.png', copy.reviewFigureCaption)}`
                  : '';
        return `<section id="${key}"><h2>${escape(section.title)}</h2>${blocks}${figures}</section>`;
      })
      .join(
        '',
      )}<footer><p>${link(`./${projectFile('demiurge', lang)}`, lang === 'ru' ? 'Подробнее о проекте Demiurge Assistant' : 'Explore the Demiurge Assistant project')}</p>${paragraph(copy.nextLabel)}${link(`./${articleFile(lang, 'knowledge-base')}`, knowledgeArticleCopy[lang].title)}</footer></article></main>`;
}

function knowledgeArticleContent(lang: Lang) {
  const copy = knowledgeArticleCopy[lang];
  const labels = demiurgeArticleCopy[lang];
  return `<main class="static-content" id="main"><article><header id="top">${link(`./${homeFile(lang)}#writing`, labels.back)}<h1>${escape(copy.title)}</h1>${paragraph(copy.byline)}<nav aria-label="${escape(labels.tocLabel)}">${copy.sections.map((section) => link(`#${section.id}`, section.title)).join(' · ')}</nav></header>
    ${copy.opening.map(paragraph).join('')}
    ${copy.sections
      .map((section) => {
        const figure =
          section.figure === undefined
            ? ''
            : (() => {
                const image = knowledgeFigures[section.figure];
                const src = knowledgeImage(section.figure, lang);
                return `<figure><a href="${src}"><img src="${src}" alt="${escape(image.caption[lang])}" width="${image.width}" height="${image.height}" loading="lazy" decoding="async"></a><figcaption>${escape(image.caption[lang])}</figcaption></figure>`;
              })();
        return `<section id="${section.id}"><h2>${escape(section.title)}</h2>${section.paragraphs.map(paragraph).join('')}${figure}</section>`;
      })
      .join('')}
    <footer>${paragraph(lang === 'ru' ? 'Первая часть' : 'Part 1')}${link(`./${articleFile(lang)}`, labels.title)}</footer></article></main>`;
}

export function renderPublicPage(
  template: string,
  file: string,
  publicUrl: string,
) {
  const lang: Lang = file.includes('-ru.html') ? 'ru' : 'en';
  const articleId = articleIdFromPath(file);
  const article = articleId !== null;
  const copy =
    articleId === 'knowledge-base'
      ? knowledgeArticleCopy[lang]
      : demiurgeArticleCopy[lang];
  const resume = file.startsWith('resume');
  const project = projects.find((item) => projectFile(item.id, lang) === file);
  const title = project
    ? lang === 'ru'
      ? `${project.name} — проект · ${profile.localizedName.ru}`
      : `${project.name} — project by ${profile.localizedName.en}`
    : article
      ? `${copy.title} — ${profile.localizedName[lang]}`
      : resume
        ? `${lang === 'ru' ? 'Резюме' : 'Resume'} — ${profile.searchTitle[lang]}`
        : profile.searchTitle[lang];
  const description = project
    ? project.summary[lang]
    : article
      ? copy.deck
      : resume
        ? `${lang === 'ru' ? 'Резюме' : 'Resume'}: ${profile.searchDescription[lang]}`
        : profile.searchDescription[lang];
  const sibling = project
    ? projectFile(project.id, lang === 'ru' ? 'en' : 'ru')
    : articleId
      ? articleFile(lang === 'ru' ? 'en' : 'ru', articleId)
      : resume
        ? `resume-${lang === 'ru' ? 'en' : 'ru'}.html`
        : homeFile(lang === 'ru' ? 'en' : 'ru');
  const url = `${publicUrl}/${file === 'index.html' ? '' : file}`;
  const siblingUrl = `${publicUrl}/${sibling === 'index.html' ? '' : sibling}`;
  const image = project
    ? project.image.replace(/^\./, '')
    : articleId === 'knowledge-base'
      ? knowledgeImage(0, lang, 'png').slice(1)
      : article
        ? `/images/articles/demiurge-ai-chat/cover${lang === 'en' ? '-en' : ''}.png`
        : '/photo.jpg';
  const person = {
    '@type': 'Person',
    '@id': `${publicUrl}/#person`,
    name: profile.name,
    alternateName: profile.localizedName.ru,
    jobTitle: profile.title,
    url: `${publicUrl}/`,
    sameAs: [contacts.github, contacts.linkedin, contacts.telegram],
    knowsLanguage: ['Russian', 'English'],
    knowsAbout: [
      'API integration',
      'Full-stack development',
      'Python',
      'FastAPI',
      'React',
      'RAG',
    ],
  };
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      person,
      {
        '@type': project ? 'CreativeWork' : article ? 'Article' : 'ProfilePage',
        '@id': url,
        url,
        inLanguage: lang,
        name: project ? project.name : title,
        ...(project
          ? {
              description: project.summary[lang],
              creator: { '@id': `${publicUrl}/#person` },
              image: `${publicUrl}${image}`,
              ...(project.github || project.link
                ? { sameAs: [project.github, project.link].filter(Boolean) }
                : {}),
            }
          : article
            ? {
                headline: copy.title,
                author: { '@id': `${publicUrl}/#person` },
                image: `${publicUrl}${image}`,
              }
            : { mainEntity: { '@id': `${publicUrl}/#person` } }),
      },
    ],
  };
  const metadata = `<title>${escape(title)}</title><meta name="description" content="${escape(description)}"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:type" content="${article ? 'article' : 'website'}"><meta property="og:locale" content="${lang === 'ru' ? 'ru_RU' : 'en_US'}"><meta name="twitter:title" content="${escape(title)}"><meta name="twitter:description" content="${escape(description)}">
    ${publicUrl ? `<link rel="canonical" href="${escape(url)}"><link rel="alternate" hreflang="${lang}" href="${escape(url)}"><link rel="alternate" hreflang="${lang === 'ru' ? 'en' : 'ru'}" href="${escape(siblingUrl)}"><meta property="og:url" content="${escape(url)}"><meta property="og:image" content="${escape(publicUrl + image)}"><meta name="twitter:image" content="${escape(publicUrl + image)}"><script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>` : ''}
    <style>${typography}</style><style>.static-content{max-width:780px;margin:40px auto;padding:0 24px;color:#172333;background:#fff;font:17px/1.65 var(--font-body)}.static-content h1{font-size:clamp(2rem,5vw,3.2rem);line-height:1.15;letter-spacing:-.025em}.static-content h2{margin-top:2.2em;line-height:1.25}.static-content h3{line-height:1.35}.static-content a{color:#1859b5;text-underline-offset:3px;overflow-wrap:anywhere}.static-content nav{line-height:2}.static-content section{scroll-margin-top:30px}.static-content article{margin:24px 0}.static-content img{max-width:100%;height:auto}.static-content figure{margin:28px 0}.static-content figcaption{font-size:.9em;color:#475569}.static-content blockquote{border-left:3px solid #1859b5;padding-left:20px;margin:24px 0}.static-tools{max-width:780px;margin:24px auto;padding:0 24px;display:flex;flex-wrap:wrap;gap:20px;font:16px/1.6 var(--font-body)}.static-tools a{color:#1859b5}.static-tools button{font:inherit;padding:6px 14px;cursor:pointer}.project-document{max-width:900px;padding:clamp(24px,5vw,60px);box-sizing:border-box;border-radius:20px;box-shadow:0 16px 55px #17233318}.project-document h1{font-size:clamp(2.7rem,7vw,5rem);margin:.25em 0}.project-kicker{color:#1859b5;font-size:.8em;font-weight:700;letter-spacing:.08em;text-transform:uppercase}.project-lead{font-size:clamp(1.2rem,2.5vw,1.6rem);line-height:1.5}.project-document-links{display:flex;gap:20px;flex-wrap:wrap}.project-document figure img{display:block;border-radius:12px}.project-document section{border-top:1px solid #dce3ea;margin-top:3em}.project-document-gallery{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));gap:22px}.project-document-gallery figure{margin:0}.project-document-gallery img{width:100%;aspect-ratio:16/10;object-fit:cover;object-position:top}.project-document-gallery figcaption{margin-top:8px}.project-document footer{border-top:1px solid #dce3ea;margin-top:3em}.static-tools{position:relative;z-index:1}html[data-theme=dark] .static-tools a{color:#9ec5ff}@media print{.static-tools{display:none}.static-content{max-width:none;margin:0;padding:0;font-size:10pt}.static-content h1{font-size:24pt}.static-content h2{margin-top:1.3em}h2,h3,h4{break-after:avoid}a{color:inherit!important}p,li{orphans:3;widows:3}body{background:#fff!important}}</style>`;
  let html = template
    .replace(/<!--public-head-->[\s\S]*?<!--\/public-head-->/g, '')
    .replace(/<title>[\s\S]*?<\/title>/g, '')
    .replace(
      /<meta\s+(?:name|property)="(?:description|keywords|og:(?:title|description|type|locale)|twitter:(?:title|description))"[\s\S]*?\/>/g,
      '',
    )
    .replace(/<html lang="[^"]*"/, `<html lang="${lang}"`);
  html = html.replace(
    '</head>',
    `<!--public-head-->${metadata}<!--/public-head--></head>`,
  );
  const tools = `<nav class="static-tools" aria-label="${lang === 'ru' ? 'Версии страницы' : 'Page versions'}">${link(`./${homeFile(lang)}`, lang === 'ru' ? 'Портфолио' : 'Portfolio')} ${link(`./${sibling}`, lang === 'ru' ? 'English' : 'Русский')} ${resume ? `<button type="button" onclick="window.print()">${lang === 'ru' ? 'Печать / Сохранить PDF' : 'Print / Save PDF'}</button>` : link(contacts.resumeUrl, translations[lang].hero.resume)}</nav>`;
  html = html.replace(
    /<div id="root">(?:[\s\S]*?<!--\/static-->)?<\/div>/,
    `<div id="root">${tools}${project ? projectContent(project, lang) : articleId ? articleContent(lang, articleId) : resumeContent(lang)}<!--/static--></div>`,
  );
  // Resume is a genuinely static, printable document, not a second SPA shell.
  if (resume || project)
    html = html
      .replace(/<!--app-boot-->[\s\S]*?<!--\/app-boot-->/g, '')
      .replace(/<script type="module"[^>]*>[\s\S]*?<\/script>/g, '')
      .replace(/<link rel="stylesheet"[^>]*>/g, '');
  return html;
}

export function publicPages(publicUrl: string): Plugin {
  return {
    name: 'public-pages',
    enforce: 'post',
    transformIndexHtml(html, context) {
      const file = context.path.split('/').pop() || 'index.html';
      return renderPublicPage(
        html,
        files.includes(file) ? file : 'index.html',
        publicUrl,
      );
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const file = (req.url ?? '').split('?')[0].slice(1);
        if (!files.includes(file) || file === 'index.html') return next();
        try {
          const html = await readFile('index.html', 'utf8');
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(await server.transformIndexHtml(`/${file}`, html));
        } catch (error) {
          next(error);
        }
      });
    },
    generateBundle: {
      order: 'post',
      handler(_options, bundle) {
        const index = bundle['index.html'];
        if (!index || index.type !== 'asset')
          throw new Error('Missing built index.html');
        for (const file of files.slice(1))
          this.emitFile({
            type: 'asset',
            fileName: file,
            source: renderPublicPage(String(index.source), file, publicUrl),
          });
        if (!publicUrl) return;
        this.emitFile({
          type: 'asset',
          fileName: 'robots.txt',
          source: `User-agent: *\nAllow: /\nSitemap: ${publicUrl}/sitemap.xml\n`,
        });
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${files.map((file) => `<url><loc>${escape(`${publicUrl}/${file === 'index.html' ? '' : file}`)}</loc></url>`).join('')}</urlset>`,
        });
      },
    },
  };
}
