import { useLayoutEffect } from 'react';
import type { Lang } from '../../content';
import type { LanguageLayoutSnapshot } from '../../lib/languageLayoutTransition';

const DURATION_MS = 1500;
const LAYOUT_DURATION_MS = 900;
const LETTER = /[\p{L}\p{N}]/u;
const GLYPHS = Array.from(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789',
);

interface ScrambleNode {
  node: Text;
  target: string[];
  revealAt: number[];
}

interface TextScrambleTransitionProps {
  active: boolean;
  lang: Lang;
  layoutSnapshot: LanguageLayoutSnapshot;
  onComplete: () => void;
}

interface FrozenElement {
  element: HTMLElement;
  inlineStyle: string | null;
}

interface LayoutDelta {
  x: number;
  y: number;
}

function collectTextNodes(): ScrambleNode[] {
  const roots = document.querySelectorAll('header, main, footer');
  const items: ScrambleNode[] = [];

  roots.forEach((root) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const text = node.textContent ?? '';
        const parent = node.parentElement;
        if (
          !parent ||
          !LETTER.test(text) ||
          parent.closest(
            '[aria-hidden="true"], .sr-only, [data-no-scramble], script, style',
          )
        ) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    let current = walker.nextNode();
    while (current) {
      const node = current as Text;
      const target = Array.from(node.data);
      items.push({
        node,
        target,
        revealAt: target.map((character, index) =>
          LETTER.test(character)
            ? 0.16 + (((index * 37 + target.length * 11) % 79) / 79) * 0.72
            : 0,
        ),
      });
      current = walker.nextNode();
    }
  });

  return items;
}

function freezeTextContainers(items: ScrambleNode[]): FrozenElement[] {
  const parents = new Set(
    items
      .map(({ node }) => node.parentElement)
      .filter((element): element is HTMLElement => element !== null),
  );
  const frozen: FrozenElement[] = [];

  parents.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const computed = window.getComputedStyle(element);
    if (
      rect.width <= 0 ||
      rect.height <= 0 ||
      computed.display === 'contents'
    ) {
      return;
    }

    frozen.push({
      element,
      inlineStyle: element.getAttribute('style'),
    });

    if (computed.display === 'inline') element.style.display = 'inline-block';
    element.style.boxSizing = 'border-box';
    element.style.width = `${rect.width}px`;
    element.style.minWidth = `${rect.width}px`;
    element.style.maxWidth = `${rect.width}px`;
    element.style.height = `${rect.height}px`;
    element.style.minHeight = `${rect.height}px`;
    element.style.maxHeight = `${rect.height}px`;
    element.style.overflow = 'hidden';
  });

  return frozen;
}

function restoreTextContainers(items: FrozenElement[]) {
  items.forEach(({ element, inlineStyle }) => {
    if (!element.isConnected) return;
    if (inlineStyle === null) element.removeAttribute('style');
    else element.setAttribute('style', inlineStyle);
  });
}

function animateLayout(snapshot: LanguageLayoutSnapshot): Animation[] {
  if (typeof Element.prototype.animate !== 'function') return [];

  const rawDeltas = new Map<HTMLElement, LayoutDelta>();
  snapshot.forEach((previousRect, element) => {
    if (!element.isConnected) return;
    const nextRect = element.getBoundingClientRect();
    rawDeltas.set(element, {
      x: previousRect.left - nextRect.left,
      y: previousRect.top - nextRect.top,
    });
  });

  const animations: Animation[] = [];
  rawDeltas.forEach((delta, element) => {
    let parent = element.parentElement;
    let parentDelta: LayoutDelta | undefined;
    while (parent && !parentDelta) {
      parentDelta = rawDeltas.get(parent);
      parent = parent.parentElement;
    }

    const x = delta.x - (parentDelta?.x ?? 0);
    const y = delta.y - (parentDelta?.y ?? 0);
    if (Math.abs(x) < 0.5 && Math.abs(y) < 0.5) return;

    animations.push(
      element.animate([{ translate: `${x}px ${y}px` }, { translate: '0 0' }], {
        duration: LAYOUT_DURATION_MS,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }),
    );
  });

  return animations;
}

export function TextScrambleTransition({
  active,
  lang,
  layoutSnapshot,
  onComplete,
}: TextScrambleTransitionProps) {
  useLayoutEffect(() => {
    if (!active) return;

    const items = collectTextNodes();
    if (items.length === 0) {
      onComplete();
      return;
    }

    const frozenElements = freezeTextContainers(items);
    const layoutAnimations = animateLayout(layoutSnapshot);

    let animationFrame = 0;
    let startTime = 0;

    const restore = () => {
      items.forEach(({ node, target }) => {
        if (node.isConnected) node.data = target.join('');
      });
      restoreTextContainers(frozenElements);
    };

    const animate = (time: number) => {
      if (startTime === 0) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.min(1, elapsed / DURATION_MS);
      const frame = Math.floor(elapsed / 48);

      items.forEach(({ node, target, revealAt }, nodeIndex) => {
        if (!node.isConnected) return;
        node.data = target
          .map((character, characterIndex) => {
            if (
              !LETTER.test(character) ||
              progress >= revealAt[characterIndex]
            ) {
              return character;
            }
            return GLYPHS[
              (frame + characterIndex * 13 + nodeIndex * 7) % GLYPHS.length
            ];
          })
          .join('');
      });

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
      } else {
        restore();
        onComplete();
      }
    };

    animationFrame = window.requestAnimationFrame(animate);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      layoutAnimations.forEach((animation) => animation.cancel());
      restore();
    };
  }, [active, lang, layoutSnapshot, onComplete]);

  return null;
}
