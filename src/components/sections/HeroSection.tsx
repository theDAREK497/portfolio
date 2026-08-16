import {
  ArrowDownRight,
  Download,
  Github,
  ImageOff,
  Linkedin,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { contacts, profile } from '../../content';
import type { Lang } from '../../content';
import type { Translation } from '../../content/translations';

interface HeroSectionProps {
  lang: Lang;
  t: Translation;
  onOpenContact: () => void;
}

export function HeroSection({ lang, t, onOpenContact }: HeroSectionProps) {
  const reduceMotion = useReducedMotion();
  const [portraitFailed, setPortraitFailed] = useState(false);

  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <motion.div
          className="hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="availability">
            <i aria-hidden="true" />
            {profile.availability[lang]}
          </p>
          <p className="hero-name">{profile.name}</p>
          <h1>{profile.title}</h1>
          <p className="hero-statement">{profile.statement[lang]}</p>
          <p className="hero-support">{profile.summary[lang]}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              {t.hero.projects}
              <ArrowDownRight aria-hidden="true" />
            </a>
            <button
              className="button button-ghost"
              type="button"
              onClick={onOpenContact}
            >
              {t.hero.contact}
            </button>
            {contacts.resumeUrl && (
              <a
                className="button button-quiet"
                href={contacts.resumeUrl}
                download
              >
                <Download aria-hidden="true" />
                {t.hero.resume}
              </a>
            )}
          </div>
          <div className="hero-links">
            <a href={contacts.linkedin} target="_blank" rel="noreferrer">
              <Linkedin aria-hidden="true" />
              LinkedIn
            </a>
            <a href={contacts.github} target="_blank" rel="noreferrer">
              <Github aria-hidden="true" />
              GitHub
            </a>
          </div>
        </motion.div>

        <motion.div
          className="portrait-wrap"
          initial={reduceMotion ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          <div className="portrait-frame">
            {portraitFailed ? (
              <div
                className="image-fallback"
                role="img"
                aria-label="Portrait unavailable"
              >
                <ImageOff aria-hidden="true" />
              </div>
            ) : (
              <img
                src="./photo.jpg"
                alt="Ilya Gurikov"
                width="640"
                height="640"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                onError={() => setPortraitFailed(true)}
              />
            )}
          </div>
          <div className="portrait-note">
            <span>{t.hero.currentDirection}</span>
            <strong>{profile.direction}</strong>
          </div>
        </motion.div>
      </div>

      <div className="hero-metrics">
        <div>
          <strong>{t.hero.experience}</strong>
          <span>{t.hero.experienceLabel}</span>
        </div>
        <div>
          <strong>{t.hero.platforms}</strong>
          <span>{t.hero.platformsLabel}</span>
        </div>
        <div className="metric-wide">
          <strong>{t.hero.focus}</strong>
          <span>{t.hero.focusLabel}</span>
        </div>
      </div>
    </section>
  );
}
