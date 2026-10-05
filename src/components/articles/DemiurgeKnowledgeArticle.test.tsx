import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import {
  render,
  screen,
  fireEvent,
  within,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from '../../App';
import { articleContent, renderPublicPage } from '../../../tooling/publicPages';

const approvedHashes = {
  ru: 'eb4f9a1df4a4ef33dd04094c31f9327d2fc0081331614c6324acdf70d08d66c2',
  en: 'ce62e9a0d397d0fa72aa98caeb788d3d28ecea19abf51333f498d18903de53a1',
};
const textHash = (elements: NodeListOf<Element>) =>
  createHash('sha256')
    .update(Array.from(elements, (element) => element.textContent).join('\n'))
    .digest('hex');

describe('approved Demiurge technical article', () => {
  for (const lang of ['ru', 'en'] as const) {
    const file = `demiurge-knowledge-base${lang === 'ru' ? '-ru' : ''}.html`;
    it(`preserves all approved ${lang} text in the React and static pages`, () => {
      window.history.replaceState(null, '', `/${file}`);
      window.localStorage.setItem(
        'portfolio-language',
        lang === 'ru' ? 'en' : 'ru',
      );
      render(<App />);
      expect(document.documentElement.lang).toBe(lang);
      expect(
        textHash(
          document.querySelectorAll(
            '.article-page h1, .article-deck, .article-copy p, .article-copy h2',
          ),
        ),
      ).toBe(approvedHashes[lang]);
      const doc = new DOMParser().parseFromString(
        articleContent(lang, 'knowledge-base'),
        'text/html',
      );
      expect(
        textHash(
          doc.querySelectorAll(
            'article > header > h1, article > header > p, article > p, article > section > h2, article > section > p',
          ),
        ),
      ).toBe(approvedHashes[lang]);
      for (const root of [document, doc]) {
        const main = root.querySelector('main')!;
        const images = Array.from(main.querySelectorAll('img'));
        expect(images.map((image) => image.getAttribute('src'))).toEqual([
          `./images/articles/demiurge-knowledge-base/demiurge_pipeline_${lang.toUpperCase()}.png`,
          `./images/articles/demiurge-knowledge-base/demiurge_references_${lang.toUpperCase()}.png`,
        ]);
        expect(main.textContent).not.toMatch(
          /source appendix|Verified source snapshot|Для редактора|\[FIGURE_|Article_2_Sources/i,
        );
        expect(
          main.querySelector('a[href$=".zip"], a[href$=".docx"]'),
        ).toBeNull();
      }
      const html = renderPublicPage(
        readFileSync('index.html', 'utf8'),
        file,
        'https://example.com/portfolio',
      );
      const metadata = new DOMParser().parseFromString(html, 'text/html');
      expect(
        metadata.querySelector('link[rel="canonical"]')?.getAttribute('href'),
      ).toBe(`https://example.com/portfolio/${file}`);
      expect(
        metadata
          .querySelector('meta[property="og:image"]')
          ?.getAttribute('content'),
      ).toContain(`demiurge_pipeline_${lang.toUpperCase()}.png`);
      const other = lang === 'ru' ? 'en' : 'ru';
      expect(
        metadata
          .querySelector(`link[hreflang="${other}"]`)
          ?.getAttribute('href'),
      ).toBe(
        `https://example.com/portfolio/demiurge-knowledge-base${other === 'ru' ? '-ru' : ''}.html`,
      );
      expect(
        metadata.querySelector('script[type="application/ld+json"]')
          ?.textContent,
      ).toContain('"@type":"Article"');
    });
  }

  it('keeps the second article and section when switching languages and opens its diagrams', async () => {
    const user = userEvent.setup();
    window.history.replaceState(
      null,
      '',
      '/demiurge-knowledge-base.html#references',
    );
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Switch to Russian' }));
    expect(window.location.pathname).toBe('/demiurge-knowledge-base-ru.html');
    expect(window.location.hash).toBe('#references');
    expect(document.title).toContain(
      'Как ответ модели становится частью базы знаний',
    );
    await waitFor(
      () =>
        expect(document.querySelector('.site-shell')).toHaveAttribute(
          'data-language-transition',
          'idle',
        ),
      { timeout: 2500 },
    );
    await user.click(
      screen.getByRole('button', {
        name: /Открыть изображение в полном размере: Путь от текста/,
      }),
    );
    const dialog = screen.getByRole('dialog', {
      name: 'Полноэкранный просмотр изображений',
    });
    expect(within(dialog).getAllByRole('img')[0]).toHaveAttribute(
      'src',
      './images/articles/demiurge-knowledge-base/demiurge_pipeline_RU.png',
    );
    await user.keyboard('{Escape}');
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    );
    await user.click(
      screen.getByRole('link', { name: 'Что происходит в момент применения' }),
    );
    expect(document.getElementById('application')).toHaveFocus();
    expect(window.location.hash).toBe('#application');
  });

  it('links the two publications separately and supports the article hash route', () => {
    render(<App />);
    const writing = document.getElementById('writing')!;
    expect(
      Array.from(writing.querySelectorAll('a'), (link) =>
        link.getAttribute('href'),
      ),
    ).toEqual(['./demiurge-ai-chat.html', './demiurge-knowledge-base.html']);
    window.history.replaceState(
      null,
      '',
      '/#/writing/model-response-to-knowledge-base',
    );
    fireEvent(window, new HashChangeEvent('hashchange'));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'How a model response enters the Demiurge Assistant knowledge base',
    );
  });
});
