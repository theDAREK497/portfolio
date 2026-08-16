import { ArrowUpRight, Github, Linkedin, MapPin, Send } from 'lucide-react';
import { contacts } from '../../content';
import type { Translation } from '../../content/translations';

export function ContactSection({
  t,
  onOpenContact,
}: {
  t: Translation;
  onOpenContact: () => void;
}) {
  return (
    <footer className="contact-section" id="contact">
      <div className="contact-copy">
        <p className="eyebrow light">
          <span aria-hidden="true">●</span>
          {t.contact.eyebrow}
        </p>
        <h2>{t.contact.title}</h2>
        <p>{t.contact.text}</p>
      </div>
      <div className="contact-actions">
        <button
          className="button button-light"
          type="button"
          onClick={onOpenContact}
        >
          {t.contact.open}
          <ArrowUpRight aria-hidden="true" />
        </button>
        <p>
          <MapPin aria-hidden="true" />
          {t.contact.location}
        </p>
      </div>
      <div className="contact-socials">
        <a href={contacts.linkedin} target="_blank" rel="noreferrer">
          <Linkedin aria-hidden="true" />
          LinkedIn
          <ArrowUpRight aria-hidden="true" />
        </a>
        <a href={contacts.github} target="_blank" rel="noreferrer">
          <Github aria-hidden="true" />
          GitHub
          <ArrowUpRight aria-hidden="true" />
        </a>
        <a href={contacts.telegram} target="_blank" rel="noreferrer">
          <Send aria-hidden="true" />
          Telegram
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <div className="contact-footer-meta">
        <a className="wordmark" href="#top" aria-label={t.contact.backToTop}>
          <span>IG</span>
          <i aria-hidden="true" />
        </a>
        <p>{t.footer}</p>
        <p>© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
