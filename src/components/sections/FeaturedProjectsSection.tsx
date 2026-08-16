import { useMemo, useState } from 'react';
import { projects } from '../../content';
import type { Lang, ProjectItem } from '../../content';
import type { Translation } from '../../content/translations';
import { ProjectCard } from '../projects/ProjectCard';
import { SectionHeading } from '../ui/SectionHeading';

type Filter = 'all' | 'product' | 'ai';

interface FeaturedProjectsSectionProps {
  lang: Lang;
  t: Translation;
  onOpenProject: (project: ProjectItem) => void;
}

export function FeaturedProjectsSection({
  lang,
  t,
  onOpenProject,
}: FeaturedProjectsSectionProps) {
  const [filter, setFilter] = useState<Filter>('all');
  const filteredProjects = useMemo(
    () =>
      filter === 'all'
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter],
  );

  const filters: Filter[] = ['all', 'product', 'ai'];

  return (
    <section className="section projects-section" id="projects">
      <SectionHeading
        eyebrow={t.projects.eyebrow}
        title={t.projects.title}
        intro={t.projects.intro}
      />
      <div className="project-filters" aria-label={t.projects.eyebrow}>
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            className={filter === item ? 'is-active' : ''}
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
          >
            {t.projects.filters[item]}
          </button>
        ))}
      </div>
      <div className="projects-list" aria-live="polite">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            lang={lang}
            t={t}
            index={index}
            onOpen={onOpenProject}
          />
        ))}
      </div>
    </section>
  );
}
