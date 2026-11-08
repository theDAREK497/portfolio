import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import type { ProjectItem } from './content';
import { profile, translations } from './content';
import { demiurgeArticleCopy } from './content/demiurgeArticle';
import {
  knowledgeArticleCopy,
  knowledgeImage,
} from './content/demiurgeKnowledgeArticle';
import { DemiurgeArticle } from './components/articles/DemiurgeArticle';
import { DemiurgeKnowledgeArticle } from './components/articles/DemiurgeKnowledgeArticle';
import { ContactModal } from './components/contact/ContactModal';
import { Header } from './components/layout/Header';
import { ProjectDetails } from './components/projects/ProjectDetails';
import { AboutSection } from './components/sections/AboutSection';
import { CapabilitiesSection } from './components/sections/CapabilitiesSection';
import { ContactSection } from './components/sections/ContactSection';
import {
  CasesSection,
  ServicesSection,
  WorkflowSection,
} from './components/sections/OfferingSections';
import { FeaturedProjectsSection } from './components/sections/FeaturedProjectsSection';
import { HeroSection } from './components/sections/HeroSection';
import { WritingSection } from './components/sections/WritingSection';
import { TextScrambleTransition } from './components/ui/TextScrambleTransition';
import { useLanguage } from './hooks/useLanguage';
import { useTheme } from './hooks/useTheme';
import {
  articleFile,
  homeFile,
  isArticlePage,
  currentArticleId,
} from './lib/routes';

export default function App() {
  useLayoutEffect(() => {
    window.dispatchEvent(new Event('portfolio:ready'));
  }, []);
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
  const [articleId, setArticleId] = useState(currentArticleId);
  const articleOpen = articleId !== null;
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

  useEffect(() => {
    const syncRoute = () => setArticleId(currentArticleId());

    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);

  useEffect(() => {
    const copy =
      articleId === 'knowledge-base'
        ? knowledgeArticleCopy[lang]
        : demiurgeArticleCopy[lang];
    document.title = articleOpen
      ? `${copy.title} — ${profile.localizedName[lang]}`
      : profile.searchTitle[lang];
    const description = articleOpen
      ? copy.deck
      : profile.searchDescription[lang];
    for (const selector of [
      'meta[name="description"]',
      'meta[property="og:description"]',
      'meta[name="twitter:description"]',
    ]) {
      document.querySelector(selector)?.setAttribute('content', description);
    }
    for (const selector of [
      'meta[property="og:title"]',
      'meta[name="twitter:title"]',
    ]) {
      document.querySelector(selector)?.setAttribute('content', document.title);
    }
    const file = articleId ? articleFile(lang, articleId) : homeFile(lang);
    const url = new URL(
      file === 'index.html' ? './' : file,
      window.location.href,
    ).href;
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
    for (const alternate of document.querySelectorAll<HTMLLinkElement>(
      'link[rel="alternate"][hreflang]',
    )) {
      const alternateLang = alternate.hreflang === 'ru' ? 'ru' : 'en';
      const alternateFile = articleId
        ? articleFile(alternateLang, articleId)
        : homeFile(alternateLang);
      alternate.href = new URL(
        alternateFile === 'index.html' ? './' : alternateFile,
        window.location.href,
      ).href;
    }
    const image =
      articleId === 'knowledge-base'
        ? knowledgeImage(0, lang, 'png')
        : articleId
          ? `./images/articles/demiurge-ai-chat/cover${lang === 'en' ? '-en' : ''}.png`
          : './photo.jpg';
    for (const selector of [
      'meta[property="og:image"]',
      'meta[name="twitter:image"]',
    ]) {
      document
        .querySelector(selector)
        ?.setAttribute('content', new URL(image, window.location.href).href);
    }
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute('content', url);
    document
      .querySelector('meta[property="og:locale"]')
      ?.setAttribute('content', lang === 'ru' ? 'ru_RU' : 'en_US');
    document
      .querySelector('meta[property="og:type"]')
      ?.setAttribute('content', articleOpen ? 'article' : 'website');
    const structuredData = document.querySelector(
      'script[type="application/ld+json"]',
    );
    if (structuredData?.textContent) {
      const schema = JSON.parse(structuredData.textContent);
      const page = schema['@graph']?.find(
        (item: { '@type': string }) =>
          item['@type'] === 'Article' || item['@type'] === 'ProfilePage',
      );
      if (page) {
        Object.assign(page, {
          '@type': articleId ? 'Article' : 'ProfilePage',
          '@id': url,
          url,
          inLanguage: lang,
          name: document.title,
        });
        if (articleId) {
          page.headline = copy.title;
          page.image = new URL(image, window.location.href).href;
          page.author = {
            '@id': schema['@graph'].find(
              (item: { '@type': string }) => item['@type'] === 'Person',
            )?.['@id'],
          };
          delete page.mainEntity;
        } else {
          page.mainEntity = {
            '@id': schema['@graph'].find(
              (item: { '@type': string }) => item['@type'] === 'Person',
            )?.['@id'],
          };
          delete page.headline;
          delete page.image;
          delete page.author;
        }
        structuredData.textContent = JSON.stringify(schema).replace(
          /</g,
          '\\u003c',
        );
      }
    }
  }, [articleId, articleOpen, lang]);

  useEffect(() => {
    if (articleOpen && (!isArticlePage() || !window.location.hash)) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    const sectionId = window.location.hash.slice(1);
    if (!sectionId || sectionId.startsWith('/')) return;

    window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView();
    });
  }, [articleOpen]);

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
      <a
        href="#main"
        className="skip-link"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById('main')?.focus();
          document.getElementById('main')?.scrollIntoView();
        }}
      >
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

      {articleId === 'knowledge-base' ? (
        <DemiurgeKnowledgeArticle lang={lang} />
      ) : articleOpen ? (
        <DemiurgeArticle lang={lang} />
      ) : (
        <main id="main" tabIndex={-1}>
          <HeroSection lang={lang} t={t} onOpenContact={openContact} />
          <ServicesSection lang={lang} />
          <CasesSection lang={lang} />
          <WorkflowSection lang={lang} onOpenContact={openContact} />
          <FeaturedProjectsSection
            lang={lang}
            t={t}
            onOpenProject={openProject}
          />
          <WritingSection lang={lang} t={t} />
          <AboutSection lang={lang} t={t} />
          <CapabilitiesSection lang={lang} t={t} />
        </main>
      )}

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
