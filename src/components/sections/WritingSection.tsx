import { writing } from '../../content';
import type { Lang } from '../../content';
import type { Translation } from '../../content/translations';
import { SectionHeading } from '../ui/SectionHeading';

export function WritingSection({ lang, t }: { lang: Lang; t: Translation }) {
  return (
    <section className="section notes-section" id="writing">
      <SectionHeading
        eyebrow={t.writing.eyebrow}
        title={t.writing.title}
        intro={t.writing.intro}
      />
      <div className="notes-list">
        {writing.map((note, index) => {
          const content = (
            <>
              <span>0{index + 1}</span>
              <h3>{note[lang]}</h3>
              <p>
                {note.status === 'published'
                  ? t.writing.published
                  : t.writing.comingSoon}
              </p>
              {note.status === 'published' && (
                <strong>{t.writing.readArticle} →</strong>
              )}
            </>
          );

          return note.href ? (
            <a
              className="notes-item notes-item-link"
              href={note.href}
              key={note.en}
            >
              {content}
            </a>
          ) : (
            <div className="notes-item" key={note.en}>
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
