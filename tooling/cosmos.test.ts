import { readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { describe, expect, it } from 'vitest';
import { COSMOS_SEED, renderCosmos } from './cosmos.mjs';

describe('seeded cosmic background', () => {
  it('reproduces committed textures and changes the sky when the seed changes', () => {
    for (const theme of ['dark', 'light']) {
      for (const compact of [false, true]) {
        const svg = renderCosmos(COSMOS_SEED, theme, compact);
        const file = `public/images/space/cosmos-${theme}${compact ? '-small' : ''}.svg`;
        expect(svg).toBe(readFileSync(file, 'utf8'));
        expect(svg).toBe(renderCosmos(COSMOS_SEED, theme, compact));
        expect(svg).not.toBe(renderCosmos('another-sky', theme, compact));
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
      expect(doc.querySelectorAll('polyline')).toHaveLength(compact ? 2 : 4);
      expect(
        doc.querySelector(
          'script, animate, animateTransform, filter, foreignObject, image',
        ),
      ).toBeNull();
      expect(svg).not.toMatch(/(?:href=|onload=|javascript:|NaN|Infinity)/);
      expect(gzipSync(svg).byteLength).toBeLessThan(compact ? 3500 : 7000);
    }
  });
});
