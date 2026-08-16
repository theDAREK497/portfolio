import { Languages } from 'lucide-react';
import { about, profile } from '../../content';
import type { Lang } from '../../content';
import type { Translation } from '../../content/translations';

export function AboutSection({ lang, t }: { lang: Lang; t: Translation }) {
  return (
    <section className="section about-section" id="about">
      <div className="about-aside">
        <p className="eyebrow">
          <span aria-hidden="true">●</span>
          {t.about.eyebrow}
        </p>
      </div>
      <div className="about-main">
        <h2>{about.title[lang]}</h2>
        <div className="about-copy">
          {about.paragraphs[lang].map((paragraph, index) => (
            <p key={paragraph} className={index === 0 ? 'lead' : ''}>
              {paragraph}
            </p>
          ))}
        </div>
        <p className="language-line">
          <Languages aria-hidden="true" />
          {profile.language[lang]}
        </p>
      </div>
    </section>
  );
}
