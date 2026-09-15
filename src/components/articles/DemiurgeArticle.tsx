import { useMemo, useState } from 'react';
import { ArrowLeft, Maximize2 } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import type { Lang } from '../../content';
import { homeFile, isArticlePage } from '../../lib/routes';
import {
  demiurgeArticleCopy,
  type ArticleBlock,
} from '../../content/demiurgeArticle';

const imageRoot = './images/articles/demiurge-ai-chat';

interface ArticleImageData {
  src: string;
  srcEn?: string;
  width: number;
  height: number;
  widthEn?: number;
  heightEn?: number;
  alt: Record<Lang, string>;
  title: Record<Lang, string>;
}

const articleImages = [
  {
    src: `${imageRoot}/cover.png`,
    srcEn: `${imageRoot}/cover-en.png`,
    width: 1491,
    height: 1055,
    widthEn: 1672,
    heightEn: 941,
    alt: {
      ru: 'Визуальный образ мира Эон с персонажами, локациями и связанными карточками знаний',
      en: 'A visual representation of Eon with characters, locations, and connected knowledge cards',
    },
    title: {
      ru: 'Эон постепенно вырос из набора заметок в мир, где персонажи, события и правила связаны друг с другом.',
      en: 'Eon gradually grew from a collection of notes into a world where characters, events, and rules are connected to one another.',
    },
  },
  {
    src: `${imageRoot}/relationship-graph.png`,
    srcEn: `${imageRoot}/demiurge-relationship-graph.png`,
    width: 642,
    height: 723,
    widthEn: 770,
    heightEn: 764,
    alt: {
      ru: 'Граф отношений между сущностями мира Эон',
      en: 'Relationship graph with entity nodes, directed arrows and colour-coded connection weights',
    },
    title: {
      ru: 'Граф отношений между сущностями мира.',
      en: 'Interactive relationship graph with weighted entity connections.',
    },
  },
  {
    src: `${imageRoot}/encyclopedia.png`,
    srcEn: `${imageRoot}/demiurge-encyclopedia.png`,
    width: 1460,
    height: 775,
    widthEn: 2238,
    heightEn: 1273,
    alt: {
      ru: 'Энциклопедия мира в Demiurge Assistant',
      en: 'Demiurge Assistant world encyclopedia with search, entity filters and structured cards',
    },
    title: {
      ru: 'Список сущностей энциклопедии мира.',
      en: 'World encyclopedia with structured cards, search and typed entities.',
    },
  },
  {
    src: `${imageRoot}/entity-a17.png`,
    srcEn: `${imageRoot}/demiurge-human-review.png`,
    width: 1470,
    height: 739,
    widthEn: 1517,
    heightEn: 643,
    alt: {
      ru: 'Карточка персонажа A-17 в Demiurge Assistant',
      en: 'Unified draft with proposed cards, public and secret settings, and a Publish to world action',
    },
    title: {
      ru: 'Структурированная карточка персонажа.',
      en: 'Human-in-the-loop review before AI-generated changes become canonical knowledge.',
    },
  },
  {
    src: `${imageRoot}/ai-connection.png`,
    srcEn: `${imageRoot}/demiurge-ai-coauthor.png`,
    width: 2174,
    height: 593,
    widthEn: 1181,
    heightEn: 1069,
    alt: {
      ru: 'Настройки подключения языковой модели в Demiurge Assistant',
      en: 'AI co-author chat with generated worldbuilding content and a Save as draft action',
    },
    title: {
      ru: 'Настройка подключения модели.',
      en: 'AI co-author workflow with draft-first content generation.',
    },
  },
  {
    src: `${imageRoot}/knowledge-sources.png`,
    srcEn: `${imageRoot}/demiurge-human-review.png`,
    width: 2180,
    height: 725,
    widthEn: 1517,
    heightEn: 643,
    alt: {
      ru: 'Источники знаний и семантический индекс Demiurge Assistant',
      en: 'Unified draft with proposed cards, public and secret settings, and a Publish to world action',
    },
    title: {
      ru: 'Источники знаний и готовый семантический индекс.',
      en: 'Human-in-the-loop review before AI-generated changes become canonical knowledge.',
    },
  },
  {
    src: `${imageRoot}/ai-coauthor.png`,
    srcEn: `${imageRoot}/demiurge-world-audit.png`,
    width: 2179,
    height: 850,
    widthEn: 2211,
    heightEn: 1179,
    alt: {
      ru: 'Интерфейс ИИ-соавтора в Demiurge Assistant',
      en: 'Game Master Assistant showing a world audit report with contradictions, probable duplicates and missing links',
    },
    title: {
      ru: 'Рабочее пространство ИИ-соавтора.',
      en: 'AI-assisted world audit for contradictions, duplicates and missing links.',
    },
  },
  {
    src: `${imageRoot}/rag-llm-wiki-demiurge.png`,
    srcEn: `${imageRoot}/rag-llm-wiki-demiurge-en.png`,
    width: 1491,
    height: 1055,
    widthEn: 1672,
    heightEn: 941,
    alt: {
      ru: 'Сравнение процессов RAG, LLM-Wiki и Demiurge Assistant',
      en: 'A comparison of RAG, LLM-Wiki, and Demiurge Assistant workflows',
    },
    title: {
      ru: 'RAG извлекает информацию по запросу. LLM-Wiki накапливает знания в постоянной wiki. Demiurge дополнительно учитывает изменяемое состояние мира и не применяет изменения без проверки мастером.',
      en: 'RAG retrieves information for a request. LLM-Wiki accumulates knowledge in a persistent wiki. Demiurge also accounts for a changing world state and requires the game master to approve changes.',
    },
  },
  {
    src: `${imageRoot}/world-review.png`,
    srcEn: `${imageRoot}/demiurge-world-audit.png`,
    width: 2181,
    height: 735,
    widthEn: 2211,
    heightEn: 1179,
    alt: {
      ru: 'Проверка мира и сформированный отчёт в Demiurge Assistant',
      en: 'Game Master Assistant showing a world audit report with contradictions, probable duplicates and missing links',
    },
    title: {
      ru: 'Проверка мира перед применением изменений.',
      en: 'AI-assisted world audit for contradictions, duplicates and missing links.',
    },
  },
  {
    src: `${imageRoot}/merge-suggestions.png`,
    srcEn: `${imageRoot}/demiurge-human-review.png`,
    width: 459,
    height: 931,
    widthEn: 1517,
    heightEn: 643,
    alt: {
      ru: 'Предложения сравнить и объединить похожие сущности',
      en: 'Unified draft with proposed cards, public and secret settings, and a Publish to world action',
    },
    title: {
      ru: 'Предложения по проверке и объединению сущностей.',
      en: 'Human-in-the-loop review before AI-generated changes become canonical knowledge.',
    },
  },
] satisfies readonly ArticleImageData[];

function articleImageSource(image: ArticleImageData, lang: Lang) {
  return lang === 'en' && image.srcEn ? image.srcEn : image.src;
}

function articleImageDimensions(image: ArticleImageData, lang: Lang) {
  return lang === 'en' && image.widthEn && image.heightEn
    ? { width: image.widthEn, height: image.heightEn }
    : { width: image.width, height: image.height };
}

function ArticleBlocks({ blocks }: { blocks: ArticleBlock[] }) {
  return blocks.map((block, index) => {
    const key = `${block.type}-${index}-${block.text.slice(0, 24)}`;

    if (block.type === 'subheading') return <h3 key={key}>{block.text}</h3>;
    if (block.type === 'quote')
      return <blockquote key={key}>{block.text}</blockquote>;
    if (block.type === 'inline-flow') {
      return (
        <p className="article-inline-flow" key={key}>
          {block.text}
        </p>
      );
    }

    return <p key={key}>{block.text}</p>;
  });
}

function ArticleImage({
  index,
  lang,
  className = '',
  onOpen,
}: {
  index: number;
  lang: Lang;
  className?: string;
  onOpen: (index: number) => void;
}) {
  const image = articleImages[index];
  const dimensions = articleImageDimensions(image, lang);
  const openLabel =
    lang === 'ru'
      ? `Открыть изображение в полном размере: ${image.alt.ru}`
      : `Open full-size image: ${image.alt.en}`;

  return (
    <button
      className={`article-image-button ${className}`.trim()}
      type="button"
      onClick={() => onOpen(index)}
      aria-label={openLabel}
    >
      <img
        src={articleImageSource(image, lang)}
        width={dimensions.width}
        height={dimensions.height}
        alt={image.alt[lang]}
        loading="lazy"
        decoding="async"
      />
      <span className="article-image-expand" aria-hidden="true">
        <Maximize2 />
      </span>
    </button>
  );
}

function ProcessFlow({ nodes }: { nodes: string[] }) {
  return (
    <div className="article-process-flow">
      {nodes.map((node, index) => (
        <div className="article-process-step" key={node}>
          <strong>{node}</strong>
          {index < nodes.length - 1 && (
            <span className="article-flow-arrow" aria-hidden="true">
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function viewerLabels(lang: Lang) {
  return lang === 'ru'
    ? {
        Previous: 'Предыдущее изображение',
        Next: 'Следующее изображение',
        Close: 'Закрыть просмотр',
        Slide: 'Изображение',
        Carousel: 'Карусель изображений',
        Lightbox: 'Полноэкранный просмотр изображений',
        'Photo gallery': 'Иллюстрации статьи',
        '{index} of {total}': '{index} из {total}',
        'Enter Fullscreen': 'На весь экран',
        'Exit Fullscreen': 'Выйти из полноэкранного режима',
        'Zoom in': 'Увеличить',
        'Zoom out': 'Уменьшить',
        'Show captions': 'Показать подписи',
        'Hide captions': 'Скрыть подписи',
        Caption: 'Описание изображения',
      }
    : {
        Previous: 'Previous image',
        Next: 'Next image',
        Close: 'Close viewer',
        Slide: 'Image',
        Carousel: 'Image carousel',
        Lightbox: 'Image viewer',
        'Photo gallery': 'Article illustrations',
        '{index} of {total}': '{index} of {total}',
        'Enter Fullscreen': 'Enter fullscreen',
        'Exit Fullscreen': 'Exit fullscreen',
        'Zoom in': 'Zoom in',
        'Zoom out': 'Zoom out',
        'Show captions': 'Show captions',
        'Hide captions': 'Hide captions',
        Caption: 'Image caption',
      };
}

export function DemiurgeArticle({ lang }: { lang: Lang }) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const copy = demiurgeArticleCopy[lang];
  const slides = useMemo(
    () =>
      articleImages.map((image) => {
        const dimensions = articleImageDimensions(image, lang);
        return {
          src: articleImageSource(image, lang),
          width: dimensions.width,
          height: dimensions.height,
          alt: image.alt[lang],
          title: image.title[lang],
        };
      }),
    [lang],
  );

  return (
    <main className="article-page" id="main" tabIndex={-1}>
      <article lang={lang}>
        <header className="article-hero" id="top">
          <div className="article-hero-copy">
            <a
              className="article-back"
              href={
                isArticlePage() ? `./${homeFile(lang)}#writing` : '#writing'
              }
            >
              <ArrowLeft aria-hidden="true" />
              {copy.back}
            </a>
            <p className="eyebrow">
              <span aria-hidden="true">●</span>
              {copy.eyebrow}
            </p>
            <h1>{copy.title}</h1>
            <p className="article-deck">{copy.deck}</p>
          </div>
          <nav className="article-toc" aria-label={copy.tocLabel}>
            <span>{copy.tocLabel}</span>
            {copy.toc.map((item) => (
              <a
                href={item.href}
                key={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  if (isArticlePage())
                    window.history.replaceState(null, '', item.href);
                  const section = document.getElementById(item.href.slice(1));
                  section?.scrollIntoView({
                    behavior: window.matchMedia(
                      '(prefers-reduced-motion: reduce)',
                    ).matches
                      ? 'instant'
                      : 'smooth',
                  });
                  section?.setAttribute('tabindex', '-1');
                  section?.focus({ preventScroll: true });
                }}
              >
                {item.label}
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

          <figure className="article-figure article-cover-figure">
            <ArticleImage index={0} lang={lang} onOpen={setLightboxIndex} />
            <figcaption>{copy.coverCaption}</figcaption>
          </figure>

          <section className="article-section" id="world">
            <div className="article-copy">
              <h2>{copy.world.title}</h2>
              <ArticleBlocks blocks={copy.world.blocks} />
            </div>

            <figure className="article-figure article-collage-figure">
              <div className="article-figure-label">
                {copy.worldFigureTitle}
              </div>
              <div className="article-world-collage">
                <ArticleImage
                  index={2}
                  lang={lang}
                  className="is-encyclopedia"
                  onOpen={setLightboxIndex}
                />
                <ArticleImage
                  index={3}
                  lang={lang}
                  className="is-entity"
                  onOpen={setLightboxIndex}
                />
                <ArticleImage
                  index={1}
                  lang={lang}
                  className="is-graph"
                  onOpen={setLightboxIndex}
                />
              </div>
              <figcaption>{copy.worldFigureCaption}</figcaption>
            </figure>
          </section>

          <section className="article-section" id="chat">
            <div className="article-copy">
              <h2>{copy.chat.title}</h2>
              <ArticleBlocks blocks={copy.chat.blocks} />
            </div>

            <div
              className="article-product-strip"
              aria-label={
                lang === 'ru'
                  ? 'Экраны рабочего процесса Demiurge Assistant'
                  : 'Demiurge Assistant workflow screens'
              }
            >
              {[4, 5, 6].map((index) => (
                <ArticleImage
                  index={index}
                  lang={lang}
                  onOpen={setLightboxIndex}
                  key={index}
                />
              ))}
            </div>

            <figure className="article-figure article-process-figure">
              <div className="article-figure-label">
                {copy.processFigureTitle}
              </div>
              <div className="article-process-comparison">
                <div className="article-process-lane is-chat">
                  <span className="article-process-kicker">
                    {copy.processChat}
                  </span>
                  <ProcessFlow nodes={copy.processChatNodes} />
                </div>
                <div className="article-process-lane is-demiurge">
                  <span className="article-process-kicker">
                    {copy.processDemiurge}
                  </span>
                  <ProcessFlow nodes={copy.processDemiurgeNodes} />
                </div>
              </div>
              <figcaption>{copy.processFigureCaption}</figcaption>
            </figure>
          </section>

          <section className="article-section" id="rag">
            <div className="article-copy">
              <h2>{copy.rag.title}</h2>
              <ArticleBlocks blocks={copy.rag.blocks} />
            </div>

            <figure className="article-figure article-infographic-figure">
              <div className="article-figure-label">{copy.ragFigureTitle}</div>
              <ArticleImage index={7} lang={lang} onOpen={setLightboxIndex} />
              <figcaption>{copy.ragFigureCaption}</figcaption>
            </figure>
          </section>

          <section className="article-section" id="hypothesis">
            <div className="article-copy">
              <h2>{copy.hypothesis.title}</h2>
              <ArticleBlocks blocks={copy.hypothesis.blocks} />
            </div>

            <figure className="article-figure article-review-figure">
              <div className="article-figure-label">
                {copy.reviewFigureTitle}
              </div>
              <div className="article-review-collage">
                <ArticleImage index={8} lang={lang} onOpen={setLightboxIndex} />
                <ArticleImage index={9} lang={lang} onOpen={setLightboxIndex} />
              </div>
              <figcaption>{copy.reviewFigureCaption}</figcaption>
            </figure>
          </section>

          <section className="article-section article-conclusion" id="goal">
            <div className="article-copy">
              <h2>{copy.goal.title}</h2>
              <ArticleBlocks blocks={copy.goal.blocks} />
            </div>

            <div className="article-next">
              <span>{copy.nextLabel}</span>
              <strong>{lang === 'ru' ? 'Скоро' : 'Coming soon'}</strong>
            </div>
          </section>
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
