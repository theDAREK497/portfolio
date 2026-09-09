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
import type { Lang } from '../src/content/types';
import { articleFile, homeFile } from '../src/lib/routes';

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
  'resume-en.html',
  'resume-ru.html',
];

export function resumeContent(lang: Lang) {
  const t = translations[lang];
  return `<main class="static-content" id="main"><header id="top"><h1>${escape(profile.localizedName[lang])}</h1>
    <p class="static-role">${escape(profile.title)}</p>${paragraph(profile.statement[lang])}${paragraph(profile.summary[lang])}
    ${paragraph(profile.availability[lang])}${paragraph(profile.language[lang])}
    <nav aria-label="${escape(t.nav.contact)}">${link(`mailto:${contacts.email}`, contacts.email)} · ${link(contacts.github, 'GitHub')} · ${link(contacts.linkedin, 'LinkedIn')} · ${link(contacts.telegram, 'Telegram')}</nav></header>
    <section id="experience"><h2>${t.nav.experience}</h2>${experience.map((job) => `<article><h3>${escape(job.role[lang])} · ${escape(job.company[lang])}</h3><p>${escape(job.period[lang])}</p>${paragraph(job.context[lang])}${list(job.points[lang])}<p>${escape(job.tech.join(' · '))}</p></article>`).join('')}</section>
    <section id="projects"><h2>${t.nav.projects}</h2>${projects.map((project) => `<article><h3>${escape(project.name)}</h3><p>${escape(t.projects.status[project.status])} · ${escape(project.role[lang])}</p>${paragraph(project.summary[lang])}${list(project.results[lang])}<details><summary>${t.projects.caseStudy}</summary>${project.details.map((detail) => `<h4>${escape(detail.label[lang])}</h4>${paragraph(detail.value[lang])}`).join('')}</details><p>${escape(project.tech.join(' · '))}</p><p>${project.github ? link(project.github, t.projects.github) : ''} ${project.link ? link(project.link, t.projects.liveLink) : ''}</p></article>`).join('')}</section>
    <section id="capabilities"><h2>${t.nav.capabilities}</h2>${paragraph(t.capabilities.intro)}${capabilityGroups.map((group) => `<h3>${escape(group.title[lang])}</h3><p>${escape(group.items.map((item) => skillLabel(item, lang)).join(' · '))}</p>`).join('')}</section>
    <section id="education"><h2>${t.nav.education}</h2>${education.map((item) => `<article><h3>${escape(item.degree[lang])}</h3>${paragraph(`${item.school[lang]} · ${item.period}`)}${paragraph(item.detail[lang])}</article>`).join('')}</section>
    <section id="about"><h2>${t.nav.about}</h2>${about.paragraphs[lang].map(paragraph).join('')}</section>
    <section id="writing"><h2>${t.nav.writing}</h2>${link(`./${articleFile(lang)}`, demiurgeArticleCopy[lang].title)}${paragraph(t.writing.comingSoon)}</section>
    <footer id="contact"><h2>${t.contact.title}</h2>${paragraph(t.contact.text)}${link(`mailto:${contacts.email}`, contacts.email)}</footer></main>`;
}

export function articleContent(lang: Lang) {
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
            ? `<h3>${escape(copy.worldFigureTitle)}</h3>${figure('encyclopedia.png', copy.worldFigureCaption)}${figure('entity-a17.png', copy.worldFigureTitle)}${figure('relationship-graph.png', copy.worldFigureTitle)}`
            : key === 'chat'
              ? `<h3>${escape(copy.processFigureTitle)}</h3>${paragraph(`${copy.processChat}: ${copy.processChatNodes.join(' → ')}`)}${paragraph(`${copy.processDemiurge}: ${copy.processDemiurgeNodes.join(' → ')}`)}${paragraph(copy.processFigureCaption)}`
              : key === 'rag'
                ? `<h3>${escape(copy.ragFigureTitle)}</h3>${figure(lang === 'en' ? 'rag-llm-wiki-demiurge-en.png' : 'rag-llm-wiki-demiurge.png', copy.ragFigureCaption)}`
                : key === 'hypothesis'
                  ? `<h3>${escape(copy.reviewFigureTitle)}</h3>${figure('world-review.png', copy.reviewFigureCaption)}`
                  : '';
        return `<section id="${key}"><h2>${escape(section.title)}</h2>${blocks}${figures}</section>`;
      })
      .join(
        '',
      )}<footer>${paragraph(`${copy.nextLabel}: ${translations[lang].writing.comingSoon}`)}</footer></article></main>`;
}

export function renderPublicPage(
  template: string,
  file: string,
  publicUrl: string,
) {
  const lang: Lang = file.includes('-ru.html') ? 'ru' : 'en';
  const article = file.startsWith('demiurge');
  const resume = file.startsWith('resume');
  const title = article
    ? `${demiurgeArticleCopy[lang].title} — ${profile.localizedName[lang]}`
    : `${profile.localizedName[lang]} — ${resume ? (lang === 'ru' ? 'Резюме · ' : 'Resume · ') : ''}${profile.title}`;
  const description = article
    ? demiurgeArticleCopy[lang].deck
    : profile.statement[lang];
  const sibling = article
    ? articleFile(lang === 'ru' ? 'en' : 'ru')
    : resume
      ? `resume-${lang === 'ru' ? 'en' : 'ru'}.html`
      : homeFile(lang === 'ru' ? 'en' : 'ru');
  const url = `${publicUrl}/${file === 'index.html' ? '' : file}`;
  const siblingUrl = `${publicUrl}/${sibling === 'index.html' ? '' : sibling}`;
  const image = article
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
        '@type': article ? 'Article' : 'ProfilePage',
        '@id': url,
        url,
        inLanguage: lang,
        name: title,
        ...(article
          ? {
              headline: demiurgeArticleCopy[lang].title,
              author: { '@id': `${publicUrl}/#person` },
              image: `${publicUrl}${image}`,
            }
          : { mainEntity: { '@id': `${publicUrl}/#person` } }),
      },
    ],
  };
  const metadata = `<title>${escape(title)}</title><meta name="description" content="${escape(description)}"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:type" content="${article ? 'article' : 'website'}"><meta property="og:locale" content="${lang === 'ru' ? 'ru_RU' : 'en_US'}"><meta name="twitter:title" content="${escape(title)}"><meta name="twitter:description" content="${escape(description)}">
    ${publicUrl ? `<link rel="canonical" href="${escape(url)}"><link rel="alternate" hreflang="${lang}" href="${escape(url)}"><link rel="alternate" hreflang="${lang === 'ru' ? 'en' : 'ru'}" href="${escape(siblingUrl)}"><meta property="og:url" content="${escape(url)}"><meta property="og:image" content="${escape(publicUrl + image)}"><meta name="twitter:image" content="${escape(publicUrl + image)}"><script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>` : ''}
    <style>${typography}</style><style>.static-content{max-width:780px;margin:40px auto;padding:0 24px;color:#172333;background:#fff;font:17px/1.65 var(--font-body)}.static-content h1{font-size:clamp(2rem,5vw,3.2rem);line-height:1.15;letter-spacing:-.025em}.static-content h2{margin-top:2.2em;line-height:1.25}.static-content h3{line-height:1.35}.static-content a{color:#1859b5;text-underline-offset:3px;overflow-wrap:anywhere}.static-content nav{line-height:2}.static-content section{scroll-margin-top:30px}.static-content article{margin:24px 0}.static-content img{max-width:100%;height:auto}.static-content figure{margin:28px 0}.static-content figcaption{font-size:.9em;color:#475569}.static-content blockquote{border-left:3px solid #1859b5;padding-left:20px;margin:24px 0}.static-tools{max-width:780px;margin:24px auto;padding:0 24px;display:flex;flex-wrap:wrap;gap:20px;font:16px/1.6 var(--font-body)}.static-tools a{color:#1859b5}.static-tools button{font:inherit;padding:6px 14px;cursor:pointer}@media print{.static-tools{display:none}.static-content{max-width:none;margin:0;padding:0;font-size:10pt}.static-content h1{font-size:24pt}.static-content h2{margin-top:1.3em}h2,h3,h4{break-after:avoid}a{color:inherit!important}p,li{orphans:3;widows:3}body{background:#fff!important}}</style>`;
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
    `<div id="root">${tools}${article ? articleContent(lang) : resumeContent(lang)}<!--/static--></div>`,
  );
  // Resume is a genuinely static, printable document, not a second SPA shell.
  if (resume)
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
