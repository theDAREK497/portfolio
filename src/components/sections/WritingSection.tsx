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
        {writing.map((note, index) => (
          <div key={note.en}>
            <span>0{index + 1}</span>
            <h3>{note[lang]}</h3>
            <p>{t.writing.comingSoon}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
