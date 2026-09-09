import { describe, expect, it, vi } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { articleContent, renderPublicPage } from './publicPages';
import { demiurgeArticleCopy } from '../src/content/demiurgeArticle';

const template = readFileSync('index.html', 'utf8');
const base = 'https://example.com/portfolio';
const parse = (html: string) =>
  new DOMParser().parseFromString(html, 'text/html');

describe('public documents', () => {
  it('reveals the HTML fallback if startup fails or takes too long', () => {
    const doc = parse(renderPublicPage(template, 'index.html', base));
    const boot = doc.querySelector('script[data-app-boot]')!.textContent!;
    vi.useFakeTimers();
    try {
      window.eval(boot);
      expect(document.documentElement).toHaveClass('app-loading');
      window.dispatchEvent(new Event('portfolio:ready'));
      expect(document.documentElement).not.toHaveClass('app-loading');
      window.eval(boot);
      window.dispatchEvent(new ErrorEvent('error'));
      expect(document.documentElement).not.toHaveClass('app-loading');
      window.eval(boot);
      vi.advanceTimersByTime(8000);
      expect(document.documentElement).not.toHaveClass('app-loading');
    } finally {
      vi.useRealTimers();
    }
  });
  it('shares typography and links to the downloadable English resume', () => {
    const css = readFileSync('src/index.css', 'utf8');
    expect(css).toContain("@import './styles/typography.css'");
    expect(css).not.toMatch(/Source Serif|IBM Plex Sans/);
    for (const file of ['index.html', 'index-ru.html']) {
      const doc = parse(renderPublicPage(template, file, base));
      expect(doc.head.textContent).toContain('--font-body');
      const resume = doc.querySelector(
        'a[href="./resume/Ilya-Gurikov-Resume-EN.pdf"]',
      );
      expect(resume).not.toBeNull();
      expect(doc.body.textContent).toContain('B1');
    }
    expect(
      readFileSync('public/resume/Ilya-Gurikov-Resume-EN.pdf')
        .subarray(0, 5)
        .toString(),
    ).toBe('%PDF-');
  });

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
        expect(image.getAttribute('loading')).toBe('lazy');
        expect(existsSync(resolve('public', image.getAttribute('src')!))).toBe(
          true,
        );
        expect(image.alt.length).toBeGreaterThan(5);
      }
      if (file.startsWith('resume')) {
        expect(doc.querySelector('script[data-app-boot]')).toBeNull();
        expect(doc.querySelector('script[type="module"]')).toBeNull();
        expect(doc.querySelector('button')!.textContent).toMatch(/PDF/);
      } else {
        expect(doc.querySelectorAll('script[data-app-boot]')).toHaveLength(1);
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
