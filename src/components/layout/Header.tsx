import {
  ArrowUpRight,
  Languages,
  Linkedin,
  Menu,
  Moon,
  Sun,
  X,
} from 'lucide-react';
import type { Lang, Theme } from '../../content';
import { contacts } from '../../content';
import type { Translation } from '../../content/translations';
import { MobileNavigation } from './MobileNavigation';

interface HeaderProps {
  lang: Lang;
  theme: Theme;
  t: Translation;
  menuOpen: boolean;
  onToggleMenu: () => void;
  onToggleLanguage: () => void;
  languageTransitioning: boolean;
  onToggleTheme: (origin: HTMLElement) => void;
  onOpenContact: () => void;
  onNavigate: () => void;
}

export function Header({
  lang,
  theme,
  t,
  menuOpen,
  onToggleMenu,
  onToggleLanguage,
  languageTransitioning,
  onToggleTheme,
  onOpenContact,
  onNavigate,
}: HeaderProps) {
  const navItems = [
    { href: '#projects', label: t.nav.projects },
    { href: '#about', label: t.nav.about },
    { href: '#capabilities', label: t.nav.capabilities },
    { href: '#experience', label: t.nav.experience },
    { href: '#education', label: t.nav.education },
    { href: '#writing', label: t.nav.writing },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Ilya Gurikov — home">
        <span>IG</span>
        <i aria-hidden="true" />
      </a>

      <nav className="desktop-navigation" aria-label={t.navLabel}>
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <a
          className="header-linkedin"
          href={contacts.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <Linkedin aria-hidden="true" />
        </a>
        <button
          className="icon-toggle theme-toggle"
          type="button"
          onClick={(event) => onToggleTheme(event.currentTarget)}
          aria-label={theme === 'light' ? t.theme.dark : t.theme.light}
          data-testid="theme-toggle"
        >
          <span className="theme-icon-stack" aria-hidden="true">
            <Sun className="theme-sun" />
            <Moon className="theme-moon" />
          </span>
        </button>
        <button
          className="language-toggle"
          type="button"
          onClick={onToggleLanguage}
          aria-label={t.language.switch}
          aria-busy={languageTransitioning}
          disabled={languageTransitioning}
        >
          <Languages aria-hidden="true" />
          <span>{lang === 'en' ? 'RU' : 'EN'}</span>
        </button>
        <button
          className="header-contact"
          type="button"
          onClick={onOpenContact}
        >
          {t.nav.contact}
          <ArrowUpRight aria-hidden="true" />
        </button>
        <button
          className="menu-toggle"
          type="button"
          onClick={onToggleMenu}
          aria-label={menuOpen ? t.menu.close : t.menu.open}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <MobileNavigation
        open={menuOpen}
        items={navItems}
        t={t}
        onNavigate={onNavigate}
      />
    </header>
  );
}
