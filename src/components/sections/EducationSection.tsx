import { education } from '../../content';
import type { Lang } from '../../content';
import type { Translation } from '../../content/translations';
import { SectionHeading } from '../ui/SectionHeading';

export function EducationSection({ lang, t }: { lang: Lang; t: Translation }) {
  return (
    <section className="section education-section" id="education">
      <SectionHeading eyebrow={t.education.eyebrow} title={t.education.title} />
      <div className="degree-grid">
        {education.map((degree) => (
          <article key={degree.degree.en}>
            <time>{degree.period}</time>
            <h3>{degree.degree[lang]}</h3>
            <p>{degree.detail[lang]}</p>
            <strong>{degree.school[lang]}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
