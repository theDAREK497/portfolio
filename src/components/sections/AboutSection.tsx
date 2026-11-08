import { ArrowUpRight, Languages } from 'lucide-react';
import { about, profile, contacts } from '../../content';
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
          {about.paragraphs[lang].slice(0, 2).map((paragraph, index) => (
            <p key={paragraph} className={index === 0 ? 'lead' : ''}>
              {paragraph}
            </p>
          ))}
        </div>
        <p className="language-line">
          <Languages aria-hidden="true" />
          {profile.language[lang]}
        </p>
        <aside className="employer-path" id="experience">
          <span id="education" />
          <h3>
            {lang === 'ru'
              ? 'Ищете инженера в команду?'
              : 'Hiring for your team?'}
          </h3>
          <p>
            {lang === 'ru'
              ? 'Также рассматриваю удалённую работу в штате. Подробный опыт, образование и технологии — в резюме.'
              : 'I also consider remote employment. My resume includes detailed experience, education and technologies.'}
          </p>
          <div className="employer-links">
            <a className="text-link" href={`./resume-${lang}.html`}>
              {lang === 'ru'
                ? 'Опыт и образование'
                : 'Experience and education'}
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a className="text-link" href={contacts.resumeUrl}>
              {t.hero.resume}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
