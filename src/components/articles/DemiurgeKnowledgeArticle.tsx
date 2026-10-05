import { useState } from 'react';
import { ArrowLeft, Maximize2 } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import type { Lang } from '../../content/types';
import { demiurgeArticleCopy } from '../../content/demiurgeArticle';
import {
  knowledgeArticleCopy,
  knowledgeFigures,
  knowledgeImage,
} from '../../content/demiurgeKnowledgeArticle';
import { articleFile, homeFile, isArticlePage } from '../../lib/routes';
import { viewerLabels } from './articleViewerLabels';

export function DemiurgeKnowledgeArticle({ lang }: { lang: Lang }) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const copy = knowledgeArticleCopy[lang];
  const labels = demiurgeArticleCopy[lang];
  const slides = knowledgeFigures.map((figure, index) => ({
    src: knowledgeImage(index, lang),
    width: figure.width,
    height: figure.height,
    alt: figure.caption[lang],
    title: figure.caption[lang],
  }));

  return (
    <main
      className="article-page article-knowledge-page"
      id="main"
      tabIndex={-1}
    >
      <article lang={lang}>
        <header className="article-hero" id="top">
          <div className="article-hero-copy">
            <a className="article-back" href={`./${homeFile(lang)}#writing`}>
              <ArrowLeft aria-hidden="true" />
              {labels.back}
            </a>
            <p className="eyebrow">
              <span aria-hidden="true">●</span>Demiurge Assistant
            </p>
            <h1>{copy.title}</h1>
            <p className="article-deck">{copy.byline}</p>
          </div>
          <nav className="article-toc" aria-label={labels.tocLabel}>
            <span>{labels.tocLabel}</span>
            {copy.sections.map((section) => (
              <a
                href={`#${section.id}`}
                key={section.id}
                onClick={(event) => {
                  event.preventDefault();
                  if (isArticlePage())
                    window.history.replaceState(null, '', `#${section.id}`);
                  const element = document.getElementById(section.id);
                  element?.scrollIntoView({
                    behavior: window.matchMedia(
                      '(prefers-reduced-motion: reduce)',
                    ).matches
                      ? 'instant'
                      : 'smooth',
                  });
                  element?.setAttribute('tabindex', '-1');
                  element?.focus({ preventScroll: true });
                }}
              >
                {section.title}
              </a>
            ))}
          </nav>
        </header>
        <div className="article-body">
          <div className="article-copy article-opening">
            {copy.opening.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {copy.sections.map((section) => (
            <section
              className="article-section"
              id={section.id}
              key={section.id}
            >
              <div className="article-copy">
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.figure !== undefined && (
                <figure className="article-figure article-diagram-figure">
                  <button
                    className="article-image-button"
                    type="button"
                    onClick={() => setLightboxIndex(section.figure!)}
                    aria-label={`${lang === 'ru' ? 'Открыть изображение в полном размере' : 'Open full-size image'}: ${knowledgeFigures[section.figure].caption[lang]}`}
                  >
                    <img
                      src={knowledgeImage(section.figure, lang)}
                      width={knowledgeFigures[section.figure].width}
                      height={knowledgeFigures[section.figure].height}
                      alt={knowledgeFigures[section.figure].caption[lang]}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="article-image-expand" aria-hidden="true">
                      <Maximize2 />
                    </span>
                  </button>
                  <figcaption>
                    {knowledgeFigures[section.figure].caption[lang]}
                  </figcaption>
                </figure>
              )}
            </section>
          ))}
          <a className="article-next" href={`./${articleFile(lang)}`}>
            <span>{lang === 'ru' ? 'Первая часть' : 'Part 1'}</span>
            <strong>{labels.title}</strong>
          </a>
        </div>
      </article>
      <Lightbox
        className="portfolio-lightbox"
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
        plugins={[Captions, Fullscreen, Zoom]}
        labels={viewerLabels(lang)}
        carousel={{ finite: true, imageFit: 'contain', preload: 1 }}
        controller={{ closeOnBackdropClick: true }}
        zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true }}
        on={{ view: ({ index }) => setLightboxIndex(index) }}
      />
    </main>
  );
}
