import { readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { describe, expect, it } from 'vitest';
import { COSMOS_SEED, renderCosmos, renderConstellations } from './cosmos.mjs';

describe('seeded cosmic background', () => {
  it('reproduces committed textures and changes the sky when the seed changes', () => {
    for (const theme of ['dark', 'light']) {
      for (const compact of [false, true]) {
        const svg = renderCosmos(COSMOS_SEED, theme, compact);
        const file = `public/images/space/cosmos-${theme}${compact ? '-small' : ''}.svg`;
        expect(svg).toBe(readFileSync(file, 'utf8'));
        expect(svg).toBe(renderCosmos(COSMOS_SEED, theme, compact));
        expect(svg).not.toBe(renderCosmos('another-sky', theme, compact));
        const field = renderConstellations(COSMOS_SEED, theme, compact);
        expect(field).toBe(
          readFileSync(
            `public/images/space/constellations-${theme}${compact ? '-small' : ''}.svg`,
            'utf8',
          ),
        );
        expect(field).not.toBe(
          renderConstellations('another-sky', theme, compact),
        );
      }
    }
  });

  it('keeps rendering bounded, static and independent of browser scripting', () => {
    for (const compact of [false, true]) {
      const svg = renderCosmos(COSMOS_SEED, 'dark', compact);
      const doc = new DOMParser().parseFromString(svg, 'image/svg+xml');
      expect(doc.querySelector('parsererror')).toBeNull();
      expect(doc.querySelectorAll('circle').length).toBeLessThanOrEqual(
        compact ? 120 : 310,
      );
      expect(doc.querySelectorAll('ellipse')).toHaveLength(compact ? 9 : 15);
      expect(doc.querySelectorAll('path, polyline')).toHaveLength(0);
      expect(
        doc.querySelector(
          'script, animate, animateTransform, filter, foreignObject, image',
        ),
      ).toBeNull();
      expect(svg).not.toMatch(/(?:href=|onload=|javascript:|NaN|Infinity)/);
      expect(gzipSync(svg).byteLength).toBeLessThan(compact ? 3500 : 7000);
    }
  });

  it('never tiles constellation motifs and gives every group a different shape', () => {
    for (const compact of [false, true]) {
      const svg = renderConstellations(COSMOS_SEED, 'dark', compact);
      const doc = new DOMParser().parseFromString(svg, 'image/svg+xml');
      expect(doc.querySelector('parsererror')).toBeNull();
      const groups = [...doc.querySelectorAll('[data-constellation]')];
      expect(groups).toHaveLength(compact ? 14 : 24);
      const shapes = groups.map((group) =>
        group.querySelector('path')!.getAttribute('d'),
      );
      expect(new Set(shapes).size).toBe(groups.length);
      expect(
        new Set(groups.map((group) => group.querySelectorAll('circle').length))
          .size,
      ).toBeGreaterThanOrEqual(3);
      expect(doc.querySelectorAll('circle').length).toBeLessThanOrEqual(
        compact ? 126 : 216,
      );
      expect(
        doc.querySelector(
          'script, animate, animateTransform, filter, foreignObject, image, use, pattern',
        ),
      ).toBeNull();
      expect(svg).not.toMatch(/(?:NaN|Infinity|href=)/);
      expect(gzipSync(svg).byteLength).toBeLessThan(compact ? 4500 : 8000);
    }
    for (const file of [
      'src/styles/cosmos.css',
      'src/styles/publicDocuments.css',
    ]) {
      expect(readFileSync(file, 'utf8')).toMatch(
        /background-repeat:\s*no-repeat, repeat/,
      );
    }
  });
});
