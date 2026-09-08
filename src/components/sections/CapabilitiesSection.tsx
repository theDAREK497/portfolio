import { capabilityGroups } from '../../content';
import type { Lang } from '../../content';
import type { Translation } from '../../content/translations';
import { SectionHeading } from '../ui/SectionHeading';
import { skillLabel } from '../../content/skills';

export function CapabilitiesSection({
  lang,
  t,
}: {
  lang: Lang;
  t: Translation;
}) {
  return (
    <section className="section capabilities-section" id="capabilities">
      <SectionHeading
        eyebrow={t.capabilities.eyebrow}
        title={t.capabilities.title}
        intro={t.capabilities.intro}
      />
      <div className="capability-grid">
        {capabilityGroups.map((group, index) => (
          <article className="capability-card" key={group.title.en}>
            <div className="capability-top">
              <span>0{index + 1}</span>
            </div>
            <h3>{group.title[lang]}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{skillLabel(item, lang)}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
