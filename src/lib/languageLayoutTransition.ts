export type LanguageLayoutSnapshot = Map<HTMLElement, DOMRect>;

const LAYOUT_SELECTOR = [
  '.site-header > *',
  '.desktop-navigation > *',
  '.header-actions > *',
  'main > section',
  '.hero-grid > *',
  '.hero-copy > *',
  '.hero-metrics > *',
  '.projects-section > *',
  '.project-card',
  '.project-card > *',
  '.project-copy > *',
  '.about-section > *',
  '.about-main > *',
  '.capabilities-section > *',
  '.capability-card',
  '.capability-card > *',
  '.experience-section > *',
  '.job',
  '.job > *',
  '.education-section > *',
  '.degree-grid > *',
  '.notes-section > *',
  '.notes-list > *',
  '.contact-section > *',
].join(',');

export function captureLanguageLayout(): LanguageLayoutSnapshot {
  const snapshot: LanguageLayoutSnapshot = new Map();

  document.querySelectorAll<HTMLElement>(LAYOUT_SELECTOR).forEach((element) => {
    snapshot.set(element, element.getBoundingClientRect());
  });

  return snapshot;
}
