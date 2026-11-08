import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { services } from '../src/content/services';
import { caseStudies } from '../src/content/cases';
import { projects } from '../src/content/projects';
import {
  caseFile,
  homeFile,
  projectFile,
  serviceFile,
} from '../src/lib/routes';
import { renderPublicPage } from './publicPages';

const template = readFileSync('index.html', 'utf8');
const base = 'https://example.com/portfolio';
const parse = (file: string) =>
  new DOMParser().parseFromString(
    renderPublicPage(template, file, base),
    'text/html',
  );

describe('services and case studies', () => {
  it('serves complete bilingual pages without requiring JavaScript', () => {
    for (const lang of ['en', 'ru'] as const) {
      const home = parse(homeFile(lang));
      for (const item of [...services, ...caseStudies]) {
        const service = services.some((service) => service.id === item.id);
        const route = service ? serviceFile : caseFile;
        const file = route(item.id, lang);
        const doc = parse(file);
        expect(home.querySelector(`a[href="./${file}"]`)).not.toBeNull();
        expect(doc.querySelector('h1')?.textContent).toBe(item.title[lang]);
        expect(doc.querySelectorAll('h1')).toHaveLength(1);
        expect(doc.documentElement.lang).toBe(lang);
        expect(doc.querySelector('script[type="module"]')).toBeNull();
        expect(doc.querySelector('script[data-app-boot]')).toBeNull();
        expect(
          doc.querySelector('link[rel="canonical"]')?.getAttribute('href'),
        ).toBe(`${base}/${file}`);
        expect(
          doc
            .querySelector(`link[hreflang="${lang === 'en' ? 'ru' : 'en'}"]`)
            ?.getAttribute('href'),
        ).toBe(`${base}/${route(item.id, lang === 'en' ? 'ru' : 'en')}`);
        expect(doc.querySelector('a[href^="mailto:"]')).not.toBeNull();
        const graph = JSON.parse(
          doc.querySelector('script[type="application/ld+json"]')!.textContent!,
        );
        expect(graph['@graph'][1]['@type']).toBe(
          service ? 'Service' : 'CreativeWork',
        );
      }
    }
  });

  it('keeps service, case, project and contact paths connected in each language', () => {
    for (const lang of ['en', 'ru'] as const) {
      for (const service of services) {
        const doc = parse(serviceFile(service.id, lang));
        for (const id of service.caseIds)
          expect(
            doc.querySelector(`a[href="./${caseFile(id, lang)}"]`),
          ).not.toBeNull();
        for (const deliverable of service.deliverables[lang])
          expect(doc.body.textContent).toContain(deliverable);
        expect(doc.body.textContent).toContain(service.scope[lang]);
      }
      for (const item of caseStudies) {
        const doc = parse(caseFile(item.id, lang));
        for (const id of item.serviceIds)
          expect(
            doc.querySelector(`a[href="./${serviceFile(id, lang)}"]`),
          ).not.toBeNull();
        if (item.projectId) {
          expect(
            projects.some((project) => project.id === item.projectId),
          ).toBe(true);
          expect(
            doc.querySelector(
              `a[href="./${projectFile(item.projectId, lang)}"]`,
            ),
          ).not.toBeNull();
        }
        expect(doc.body.textContent).toContain(item.limitations[lang]);
        for (const image of doc.querySelectorAll('img')) {
          expect(
            existsSync(resolve('public', image.getAttribute('src')!)),
          ).toBe(true);
          expect(image.alt.length).toBeGreaterThan(10);
          expect(image.getAttribute('width')).not.toBeNull();
          expect(image.getAttribute('height')).not.toBeNull();
        }
        expect(doc.body.innerHTML).not.toMatch(
          /\/admin|console\.rustore|search\.google\.com\/search-console/,
        );
      }
    }
  });
});
