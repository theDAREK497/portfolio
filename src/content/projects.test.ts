import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { projects } from './projects';

const expected = [
  [
    'demiurge-encyclopedia.png',
    'World encyclopedia with structured cards, search and typed entities',
    'Энциклопедия мира со структурированными карточками, поиском и типизированными сущностями',
  ],
  [
    'demiurge-human-review.png',
    'Human-in-the-loop review before AI-generated changes become canonical knowledge',
    'Проверка человеком перед тем, как сгенерированные ИИ изменения становятся канонической частью мира',
  ],
  [
    'demiurge-world-audit.png',
    'AI-assisted world audit for contradictions, duplicates and missing links',
    'ИИ-анализ мира для поиска противоречий, дубликатов и отсутствующих связей',
  ],
  [
    'demiurge-relationship-graph.png',
    'Interactive relationship graph with weighted entity connections',
    'Интерактивный граф с взвешенными связями между сущностями',
  ],
  [
    'demiurge-ai-coauthor.png',
    'AI co-author workflow with draft-first content generation',
    'ИИ-соавтор с генерацией контента через промежуточные черновики',
  ],
];

describe('Demiurge gallery', () => {
  const project = projects.find(({ id }) => id === 'demiurge')!;

  it('uses the encyclopedia cover and the requested five-image order and captions', () => {
    expect(
      project.gallery.map((image) => [
        image.src.split('/').pop(),
        image.caption.en,
        image.caption.ru,
      ]),
    ).toEqual(expected);
    expect(project.image).toBe(project.gallery[0].src);
    expect([project.imageWidth, project.imageHeight]).toEqual([
      project.gallery[0].width,
      project.gallery[0].height,
    ]);
    expect(project.imageAlt).toEqual(project.gallery[0].alt);
  });

  it('references real PNGs with accurate dimensions and bilingual alternative text', () => {
    for (const image of project.gallery) {
      const png = readFileSync(resolve('public', image.src));
      expect(png.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a');
      expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([
        image.width,
        image.height,
      ]);
      expect(image.alt.en.length).toBeGreaterThan(20);
      expect(image.alt.ru.length).toBeGreaterThan(20);
      expect(image.src).not.toMatch(/entity-a17|knowledge-sources/);
    }
  });
});
