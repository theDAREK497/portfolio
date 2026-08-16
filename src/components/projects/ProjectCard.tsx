import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import type { Lang, ProjectItem } from '../../content';
import type { Translation } from '../../content/translations';
import { ProjectImage } from './ProjectImage';

interface ProjectCardProps {
  project: ProjectItem;
  lang: Lang;
  t: Translation;
  index: number;
  onOpen: (project: ProjectItem) => void;
}

export function ProjectCard({
  project,
  lang,
  t,
  index,
  onOpen,
}: ProjectCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className={`project-card project-${project.accent}`}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      data-testid={`project-${project.id}`}
    >
      <button
        type="button"
        className="project-card-hitarea"
        aria-label={`${t.projects.caseStudy}: ${project.name}`}
        onClick={() => onOpen(project)}
      />
      <div className="project-visual">
        <ProjectImage
          src={project.image}
          alt={project.imageAlt[lang]}
          width={project.imageWidth}
          height={project.imageHeight}
          objectPosition={project.imagePosition}
          fallback={t.projects.imageFallback}
        />
        <span className="project-number">0{index + 1}</span>
        <span className={`project-status status-${project.status}`}>
          {t.projects.status[project.status]}
        </span>
        <span className="project-role">{project.role[lang]}</span>
      </div>
      <div className="project-copy">
        <div>
          <h3>{project.name}</h3>
          <p>{project.summary[lang]}</p>
        </div>

        <div className="project-capabilities">
          <h4>{t.projects.capabilities}</h4>
          <ul>
            {project.capabilities[lang].map((capability) => (
              <li key={capability}>{capability}</li>
            ))}
          </ul>
        </div>

        <ul className="tag-list" aria-label={t.projects.technologies}>
          {project.tech.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <div className="project-actions">
          <span className="text-button" aria-hidden="true">
            {t.projects.caseStudy}
            <ArrowRight aria-hidden="true" />
          </span>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="project-link"
            >
              {t.projects.liveLink}
              <ArrowUpRight aria-hidden="true" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="project-link"
            >
              {t.projects.github}
              <ArrowUpRight aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
