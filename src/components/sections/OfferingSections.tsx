import { ArrowUpRight, Blocks, Gauge, Workflow } from 'lucide-react';
import type { Lang } from '../../content';
import { services, engagement } from '../../content/services';
import { caseStudies } from '../../content/cases';
import { caseFile, serviceFile } from '../../lib/routes';
import { SectionHeading } from '../ui/SectionHeading';

export function ServicesSection({ lang }: { lang: Lang }) {
  const ru = lang === 'ru';
  const icons = [Blocks, Workflow, Gauge];
  return (
    <section className="section services-section" id="services">
      <SectionHeading
        eyebrow={ru ? 'Услуги' : 'Services'}
        title={ru ? 'С какой задачей ко мне прийти.' : 'Where I can help.'}
        intro={
          ru
            ? 'Подключусь к существующему продукту или возьму отдельный проект от разбора требований до запуска.'
            : 'I can join an existing product or take a scoped project from requirements to launch.'
        }
      />
      <div className="services-grid">
        {services.map((service, index) => {
          const Icon = icons[index];
          return (
            <article className="service-card" key={service.id}>
              <Icon className="service-icon" aria-hidden="true" />
              <p className="service-situation">{service.situation[lang]}</p>
              <h3>{service.title[lang]}</h3>
              <p>{service.outcome[lang]}</p>
              <a
                className="text-link"
                href={`./${serviceFile(service.id, lang)}`}
              >
                {ru ? 'Что входит и как работаем' : 'Scope and deliverables'}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function CasesSection({ lang }: { lang: Lang }) {
  const ru = lang === 'ru';
  return (
    <section className="section cases-section" id="cases">
      <SectionHeading
        eyebrow={ru ? 'Кейсы' : 'Case studies'}
        title={
          ru ? 'Задача → решение → результат.' : 'Problem → solution → result.'
        }
        intro={
          ru
            ? 'Собственные продукты и коммерческий опыт. В каждом разборе — моя роль, решения, подтверждения и границы результата.'
            : 'Independent products and commercial experience. Each account explains my role, decisions, evidence and the limits of its results.'
        }
      />
      <div className="cases-grid">
        {caseStudies.map((item, index) => (
          <article
            className={`case-card${index === 0 ? ' case-featured' : ''}`}
            key={item.id}
          >
            {item.image && (
              <a
                className="case-image"
                href={`./${caseFile(item.id, lang)}`}
                tabIndex={-1}
                aria-hidden="true"
              >
                <img
                  src={item.image.src}
                  width={item.image.width}
                  height={item.image.height}
                  alt=""
                  loading="lazy"
                />
              </a>
            )}
            {item.id === 'booking-automation' && (
              <div
                className="booking-diagram"
                role="img"
                aria-label={
                  ru
                    ? 'Схема: ручные согласования заменены внутренним веб-сервисом'
                    : 'Diagram: manual approvals replaced by an internal web service'
                }
              >
                <span>
                  {ru ? 'Процесс до / после' : 'Workflow before / after'}
                </span>
                <div>{ru ? 'Ручные согласования' : 'Manual approvals'}</div>
                <span className="diagram-arrow" aria-hidden="true">
                  ↓
                </span>
                <div>{ru ? 'Единый веб-сервис' : 'One web service'}</div>
              </div>
            )}
            <div className="case-copy">
              <p className="case-kind">{item.kind[lang]}</p>
              <h3>
                <a href={`./${caseFile(item.id, lang)}`}>
                  {item.title[lang]}
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </h3>
              <p>{item.summary[lang]}</p>
              {index === 0 && (
                <p className="case-proof">
                  {ru
                    ? '126 установок RuStore · production-релиз Google Play'
                    : '126 RuStore installs · Google Play production release'}
                  <small>
                    {ru ? 'Срез на 8 ноября 2026' : 'Snapshot: 8 November 2026'}
                  </small>
                </p>
              )}
              <a
                className="case-read"
                href={`./${caseFile(item.id, lang)}`}
                aria-label={`${ru ? 'Читать разбор' : 'Read the account'}: ${item.title[lang]}`}
              >
                {ru ? 'Читать разбор' : 'Read the account'} →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function WorkflowSection({
  lang,
  onOpenContact,
}: {
  lang: Lang;
  onOpenContact: () => void;
}) {
  const copy = engagement[lang];
  return (
    <section className="section workflow-section" id="process">
      <SectionHeading
        eyebrow={copy.eyebrow}
        title={copy.title}
        intro={copy.intro}
      />
      <ol className="workflow-list">
        {copy.steps.map((step, index) => (
          <li key={step.title}>
            <span className="step-number" aria-hidden="true">
              0{index + 1}
            </span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
      <button
        className="button button-primary"
        type="button"
        onClick={onOpenContact}
      >
        {lang === 'ru' ? 'Обсудить задачу' : 'Discuss a project'}
        <ArrowUpRight aria-hidden="true" />
      </button>
    </section>
  );
}
