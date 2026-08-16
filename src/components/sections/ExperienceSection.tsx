import { motion, useReducedMotion } from 'motion/react';
import { experience } from '../../content';
import type { Lang } from '../../content';
import type { Translation } from '../../content/translations';
import { SectionHeading } from '../ui/SectionHeading';

export function ExperienceSection({ lang, t }: { lang: Lang; t: Translation }) {
  const reduceMotion = useReducedMotion();
  return (
    <section className="section experience-section" id="experience">
      <SectionHeading
        eyebrow={t.experience.eyebrow}
        title={t.experience.title}
      />
      <div className="timeline">
        {experience.map((job, index) => (
          <motion.article
            className="job"
            key={job.company.en}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
          >
            <div className="job-meta">
              <span>0{index + 1}</span>
              <time>{job.period[lang]}</time>
            </div>
            <div className="job-heading">
              <h3>{job.company[lang]}</h3>
              <p>{job.role[lang]}</p>
            </div>
            <div className="job-body">
              <p className="job-summary">{job.context[lang]}</p>
              <ul>
                {job.points[lang].map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="job-tech">
                {job.tech.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
