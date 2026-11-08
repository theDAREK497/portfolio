import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath, URL } from 'node:url';
import process from 'node:process';
import { Buffer } from 'node:buffer';
import { COSMOS_SEED, renderCosmos, renderConstellations } from './cosmos.mjs';

const directory = new URL('../public/images/space/', import.meta.url);
await mkdir(directory, { recursive: true });
for (const theme of ['dark', 'light']) {
  for (const compact of [false, true]) {
    const file = new URL(
      `cosmos-${theme}${compact ? '-small' : ''}.svg`,
      directory,
    );
    const svg = renderCosmos(COSMOS_SEED, theme, compact);
    await writeFile(file, svg, 'utf8');
    const field = new URL(
      `constellations-${theme}${compact ? '-small' : ''}.svg`,
      directory,
    );
    const fieldSvg = renderConstellations(COSMOS_SEED, theme, compact);
    await writeFile(field, fieldSvg, 'utf8');
    process.stdout.write(
      `${fileURLToPath(file)}: ${Buffer.byteLength(svg)} bytes\n`,
    );
    process.stdout.write(
      `${fileURLToPath(field)}: ${Buffer.byteLength(fieldSvg)} bytes\n`,
    );
  }
}
