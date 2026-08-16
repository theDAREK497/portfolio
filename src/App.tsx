import { useCallback, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import type { ProjectItem } from './content';
import { translations } from './content';
import { ContactModal } from './components/contact/ContactModal';
import { Header } from './components/layout/Header';
import { ProjectDetails } from './components/projects/ProjectDetails';
import { AboutSection } from './components/sections/AboutSection';
import { CapabilitiesSection } from './components/sections/CapabilitiesSection';
import { ContactSection } from './components/sections/ContactSection';
import { EducationSection } from './components/sections/EducationSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { FeaturedProjectsSection } from './components/sections/FeaturedProjectsSection';
import { HeroSection } from './components/sections/HeroSection';
import { WritingSection } from './components/sections/WritingSection';
import { TextScrambleTransition } from './components/ui/TextScrambleTransition';
import { useLanguage } from './hooks/useLanguage';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const {
    lang,
    isTransitioning,
    layoutSnapshot,
    toggleLanguage,
    finishLanguageTransition,
  } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  );
  const t = translations[lang];
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  const openContact = useCallback(() => {
    setMenuOpen(false);
    setSelectedProject(null);
    setContactOpen(true);
  }, []);
  const closeContact = useCallback(() => setContactOpen(false), []);
  const closeProject = useCallback(() => setSelectedProject(null), []);
  const openProject = useCallback((project: ProjectItem) => {
    setContactOpen(false);
    setSelectedProject(project);
  }, []);

  return (
    <div
      className={`site-shell${isTransitioning ? ' is-language-transitioning' : ''}`}
      aria-busy={isTransitioning}
      data-language-transition={isTransitioning ? 'scrambling' : 'idle'}
    >
      <TextScrambleTransition
        active={isTransitioning}
        lang={lang}
        layoutSnapshot={layoutSnapshot.current}
        onComplete={finishLanguageTransition}
      />
      <a href="#main" className="skip-link">
        {t.skip}
      </a>
      <motion.div
        className="scroll-progress"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />
      <Header
        lang={lang}
        theme={theme}
        t={t}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((open) => !open)}
        onToggleLanguage={toggleLanguage}
        languageTransitioning={isTransitioning}
        onToggleTheme={toggleTheme}
        onOpenContact={openContact}
        onNavigate={() => setMenuOpen(false)}
      />

      <main id="main" tabIndex={-1}>
        <HeroSection lang={lang} t={t} onOpenContact={openContact} />
        <FeaturedProjectsSection
          lang={lang}
          t={t}
          onOpenProject={openProject}
        />
        <AboutSection lang={lang} t={t} />
        <CapabilitiesSection lang={lang} t={t} />
        <ExperienceSection lang={lang} t={t} />
        <EducationSection lang={lang} t={t} />
        <WritingSection lang={lang} t={t} />
      </main>

      <ContactSection t={t} onOpenContact={openContact} />

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetails
            project={selectedProject}
            lang={lang}
            t={t}
            onClose={closeProject}
          />
        )}
        {contactOpen && <ContactModal t={t} onClose={closeContact} />}
      </AnimatePresence>
    </div>
  );
}
