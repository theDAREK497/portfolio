import { useMemo, useState } from 'react';
import { ArrowUpRight, Maximize2 } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import type { Lang, ProjectItem } from '../../content';
import type { Translation } from '../../content/translations';
import { Dialog } from '../ui/Dialog';
import { ProjectImage } from './ProjectImage';

interface ProjectDetailsProps {
  project: ProjectItem;
  lang: Lang;
  t: Translation;
  onClose: () => void;
}

export function ProjectDetails({
  project,
  lang,
  t,
  onClose,
}: ProjectDetailsProps) {
  const titleId = `project-dialog-${project.id}`;
  const galleryTitleId = `project-gallery-${project.id}`;
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const lightboxSlides = useMemo(
    () =>
      project.gallery.map((image) => ({
        src: image.src,
        width: image.width,
        height: image.height,
        alt: image.alt[lang],
        title: image.caption[lang],
      })),
    [lang, project.gallery],
  );
  const viewerLabels =
    lang === 'ru'
      ? {
          Previous: 'Предыдущее изображение',
          Next: 'Следующее изображение',
          Close: 'Закрыть просмотр',
          Slide: 'Изображение',
          Carousel: 'Карусель изображений',
          Lightbox: 'Полноэкранный просмотр изображений',
          'Photo gallery': 'Галерея проекта',
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
          'Photo gallery': 'Project gallery',
          '{index} of {total}': '{index} of {total}',
          'Enter Fullscreen': 'Enter fullscreen',
          'Exit Fullscreen': 'Exit fullscreen',
          'Zoom in': 'Zoom in',
          'Zoom out': 'Zoom out',
          'Show captions': 'Show captions',
          'Hide captions': 'Hide captions',
          Caption: 'Image caption',
        };
  return (
    <Dialog
      labelledBy={titleId}
      closeLabel={t.projects.close}
      onClose={onClose}
      className="project-dialog"
    >
      <div className={`dialog-hero dialog-${project.accent}`}>
        <div>
          <span>{project.role[lang]}</span>
          <h2 id={titleId}>{project.name}</h2>
          <p className="dialog-status">{t.projects.status[project.status]}</p>
        </div>
      </div>
      <div className="dialog-body">
        <p className="dialog-summary">{project.summary[lang]}</p>
        <section className="case-gallery" aria-labelledby={galleryTitleId}>
          <div className="case-gallery-heading">
            <h3 id={galleryTitleId}>{t.projects.gallery}</h3>
            <p>{t.projects.galleryHint}</p>
          </div>
          <div className="case-gallery-track">
            {project.gallery.map((image, index) => (
              <figure
                className={`case-shot${image.height > image.width ? ' is-portrait' : ''}`}
                key={image.src}
              >
                <button
                  className="case-shot-link"
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  aria-label={`${t.projects.openImage}: ${image.alt[lang]}`}
                >
                  <ProjectImage
                    src={image.src}
                    alt={image.alt[lang]}
                    width={image.width}
                    height={image.height}
                    fallback={t.projects.imageFallback}
                  />
                  <span className="case-shot-expand" aria-hidden="true">
                    <Maximize2 />
                  </span>
                </button>
                <figcaption>
                  <span>0{index + 1}</span>
                  {image.caption[lang]}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
        <Lightbox
          className="portfolio-lightbox"
          open={lightboxIndex >= 0}
          index={lightboxIndex}
          close={() => setLightboxIndex(-1)}
          slides={lightboxSlides}
          plugins={[Captions, Fullscreen, Zoom]}
          labels={viewerLabels}
          carousel={{ finite: true, imageFit: 'contain' }}
          controller={{ closeOnBackdropClick: true }}
          zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true }}
          on={{ view: ({ index }) => setLightboxIndex(index) }}
        />
        <div className="case-grid">
          {project.details.map((detail, index) => (
            <div className="case-item" key={detail.label.en}>
              <span>0{index + 1}</span>
              <h3>{detail.label[lang]}</h3>
              <p>{detail.value[lang]}</p>
            </div>
          ))}
        </div>
        <div className="outcome-box">
          <p className="eyebrow">
            <span aria-hidden="true">●</span>
            {t.projects.result}
          </p>
          <ul>
            {project.results[lang].map((result) => (
              <li key={result}>{result}</li>
            ))}
          </ul>
        </div>
        <div className="dialog-footer">
          <ul className="tag-list" aria-label={t.projects.technologies}>
            {project.tech.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <div className="dialog-link-group">
            {project.link && (
              <a
                className="button button-dark"
                href={project.link}
                target="_blank"
                rel="noreferrer"
              >
                {t.projects.liveLink} <ArrowUpRight aria-hidden="true" />
              </a>
            )}
            {project.github && (
              <a
                className="button button-dark"
                href={project.github}
                target="_blank"
                rel="noreferrer"
              >
                {t.projects.github} <ArrowUpRight aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
}
