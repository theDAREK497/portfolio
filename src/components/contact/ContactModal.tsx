import {
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  Send,
  TriangleAlert,
} from 'lucide-react';
import { contacts } from '../../content';
import type { Translation } from '../../content/translations';
import { useClipboard } from '../../hooks/useClipboard';
import { Dialog } from '../ui/Dialog';

interface ContactModalProps {
  t: Translation;
  onClose: () => void;
}

export function ContactModal({ t, onClose }: ContactModalProps) {
  const { status, copy } = useClipboard();
  const titleId = 'contact-dialog-title';

  return (
    <Dialog
      labelledBy={titleId}
      closeLabel={t.contact.close}
      onClose={onClose}
      className="contact-dialog"
    >
      <div className="contact-dialog-heading">
        <p className="eyebrow">
          <span aria-hidden="true">●</span>
          {t.contact.eyebrow}
        </p>
        <h2 id={titleId}>{t.contact.dialogTitle}</h2>
        <p>{t.contact.dialogDescription}</p>
      </div>

      <div className="contact-methods">
        <a
          href={`mailto:${contacts.email}`}
          className="contact-method contact-method-primary"
        >
          <Mail aria-hidden="true" />
          <span>
            <small>{t.contact.email}</small>
            <strong>{contacts.email}</strong>
          </span>
        </a>
        <a
          href={contacts.linkedin}
          target="_blank"
          rel="noreferrer"
          className="contact-method"
        >
          <Linkedin aria-hidden="true" />
          <span>
            <strong>LinkedIn</strong>
          </span>
        </a>
        <a
          href={contacts.github}
          target="_blank"
          rel="noreferrer"
          className="contact-method"
        >
          <Github aria-hidden="true" />
          <span>
            <strong>GitHub</strong>
          </span>
        </a>
        <a
          href={contacts.telegram}
          target="_blank"
          rel="noreferrer"
          className="contact-method"
        >
          <Send aria-hidden="true" />
          <span>
            <strong>Telegram</strong>
          </span>
        </a>
      </div>

      <button
        className="copy-email-button"
        type="button"
        onClick={() => copy(contacts.email)}
      >
        {status === 'copied' ? (
          <Check aria-hidden="true" />
        ) : status === 'failed' ? (
          <TriangleAlert aria-hidden="true" />
        ) : (
          <Copy aria-hidden="true" />
        )}
        {status === 'copied'
          ? t.contact.copied
          : status === 'failed'
            ? t.contact.copyFailed
            : t.contact.copy}
      </button>
      <span className="sr-only" aria-live="polite">
        {status === 'copied'
          ? t.contact.copied
          : status === 'failed'
            ? t.contact.copyFailed
            : ''}
      </span>
    </Dialog>
  );
}
