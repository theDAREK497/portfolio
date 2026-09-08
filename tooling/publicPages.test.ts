import { describe, expect, it } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { articleContent, renderPublicPage } from './publicPages';
import { demiurgeArticleCopy } from '../src/content/demiurgeArticle';

const template = readFileSync('index.html', 'utf8');
const base = 'https://example.com/portfolio';
const parse = (html: string) =>
  new DOMParser().parseFromString(html, 'text/html');

describe('public documents', () => {
  for (const file of [
    'index.html',
    'index-ru.html',
    'demiurge-ai-chat.html',
    'demiurge-ai-chat-ru.html',
    'resume-en.html',
    'resume-ru.html',
  ]) {
    it(`renders ${file} with readable content and unique metadata`, () => {
      // Build emits additional pages from the already transformed index.
      const index = renderPublicPage(template, 'index.html', base);
      const doc = parse(renderPublicPage(index, file, base));
      expect(doc.querySelectorAll('title')).toHaveLength(1);
      expect(doc.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
      expect(doc.querySelectorAll('meta[name="description"]')).toHaveLength(1);
      expect(doc.querySelectorAll('meta[property="og:type"]')).toHaveLength(1);
      expect(doc.querySelectorAll('h1')).toHaveLength(1);
      expect(doc.querySelectorAll('main')).toHaveLength(1);
      expect(doc.documentElement.lang).toBe(file.includes('-ru') ? 'ru' : 'en');
      expect(doc.querySelector('main')!.textContent!.length).toBeGreaterThan(
        3000,
      );
      expect(
        doc.querySelector('script[type="application/ld+json"]')!.textContent,
      ).toContain('Person');
      expect(
        doc.querySelector('link[rel="canonical"]')!.getAttribute('href'),
      ).toBe(`${base}/${file === 'index.html' ? '' : file}`);
      for (const image of doc.querySelectorAll('img')) {
        expect(existsSync(resolve('public', image.getAttribute('src')!))).toBe(
          true,
        );
        expect(image.alt.length).toBeGreaterThan(5);
      }
      if (file.startsWith('resume')) {
        expect(doc.querySelector('script[type="module"]')).toBeNull();
        expect(doc.querySelector('button')!.textContent).toMatch(/PDF/);
      }
    });
  }

  it('preserves every article paragraph in both static language versions', () => {
    for (const lang of ['ru', 'en'] as const) {
      const text = parse(articleContent(lang)).body.textContent!;
      const copy = demiurgeArticleCopy[lang];
      for (const paragraph of copy.opening) expect(text).toContain(paragraph);
      for (const key of [
        'world',
        'chat',
        'rag',
        'hypothesis',
        'goal',
      ] as const) {
        for (const block of copy[key].blocks)
          expect(text).toContain(block.text);
      }
      expect(text).not.toContain(copy.nextTitle);
    }
  });
});
