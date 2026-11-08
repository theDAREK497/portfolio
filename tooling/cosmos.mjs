// Deterministic, bounded SVG generation. This module runs in Node, never in a visitor's browser.
export const COSMOS_SEED = 'ilya-gurikov:portfolio:cosmos:v1';

function randomFromSeed(seed) {
  let state = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    state = Math.imul(state ^ seed.charCodeAt(i), 16777619);
  }
  state = state >>> 0 || 1;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 4294967296;
  };
}

const number = (value) => Number(value.toFixed(2));

export function renderCosmos(
  seed = COSMOS_SEED,
  theme = 'dark',
  compact = false,
) {
  const random = randomFromSeed(seed);
  const dark = theme === 'dark';
  const width = compact ? 720 : 1440;
  const height = compact ? 1000 : 1200;
  const starCount = compact ? 100 : 280;
  const nebulaCount = compact ? 3 : 5;
  const constellationCount = compact ? 2 : 4;
  const colors = dark
    ? ['#8272df', '#3c9daf', '#be925e']
    : ['#8573ac', '#448e9c', '#b28a58'];
  const starColors = dark
    ? ['#d9eaff', '#a8c9f4', '#ffe3b6']
    : ['#355375', '#557f98', '#8c704c'];
  const definitions = [];
  const clouds = [];
  const stars = [];
  const constellations = [];

  for (let i = 0; i < nebulaCount; i++) {
    const cx = width * (0.18 + random() * 0.64);
    const cy = height * (0.16 + random() * 0.68);
    const rx = width * (0.16 + random() * 0.12);
    const ry = height * (0.1 + random() * 0.08);
    const color = colors[i % colors.length];
    const alpha = dark ? 0.24 : 0.12;
    definitions.push(
      `<radialGradient id="n${i}"><stop stop-color="${color}" stop-opacity="${alpha}"/><stop offset=".45" stop-color="${color}" stop-opacity="${alpha * 0.45}"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient>`,
    );
    for (let layer = 0; layer < 3; layer++) {
      const radius = Math.max(rx, ry) + 4;
      const x = Math.max(
        radius,
        Math.min(width - radius, cx + (random() - 0.5) * rx),
      );
      const y = Math.max(
        radius,
        Math.min(height - radius, cy + (random() - 0.5) * ry),
      );
      const angle = number((random() - 0.5) * 90);
      clouds.push(
        `<ellipse cx="${number(x)}" cy="${number(y)}" rx="${number(rx * (0.65 + random() * 0.35))}" ry="${number(ry * (0.6 + random() * 0.4))}" transform="rotate(${angle} ${number(x)} ${number(y)})" fill="url(#n${i})"/>`,
      );
    }
  }

  for (let i = 0; i < starCount; i++) {
    const x = number(3 + random() * (width - 6));
    const y = number(3 + random() * (height - 6));
    const r = number(0.4 + Math.pow(random(), 3) * 1.1);
    const opacity = number(
      (dark ? 0.16 : 0.12) + random() * (dark ? 0.48 : 0.28),
    );
    const color = starColors[Math.floor(random() * starColors.length)];
    stars.push(
      `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" opacity="${opacity}"/>`,
    );
  }

  for (let i = 0; i < constellationCount; i++) {
    const cx = width * (i % 2 ? 0.68 : 0.18);
    const cy = height * (0.2 + Math.floor(i / 2) * 0.52 + random() * 0.09);
    const points = [];
    for (let j = 0; j < 6; j++) {
      points.push([
        number(cx + j * (compact ? 23 : 38)),
        number(cy + (random() - 0.5) * 140),
      ]);
    }
    const line = points.map((point) => point.join(',')).join(' ');
    const color = dark ? '#9cbfdf' : '#527592';
    constellations.push(
      `<g fill="${color}" stroke="${color}"><polyline points="${line}" fill="none" stroke-width=".75" opacity="${dark ? 0.23 : 0.18}"/><path d="M${points[1].join(' ')} L${points[4].join(' ')}" fill="none" stroke-width=".65" opacity=".12"/>${points.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.65" stroke="none" opacity="${dark ? 0.58 : 0.4}"/>`).join('')}</g>`,
    );
  }

  // No scripts, animation, filters, foreignObject, external resources or blend modes.
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><defs>${definitions.join('')}</defs><g>${clouds.join('')}</g><g>${stars.join('')}</g><g>${constellations.join('')}</g></svg>\n`;
}
