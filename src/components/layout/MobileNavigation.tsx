import type { Translation } from '../../content/translations';

interface NavItem {
  href: string;
  label: string;
}

interface MobileNavigationProps {
  open: boolean;
  items: NavItem[];
  t: Translation;
  onNavigate: () => void;
}

export function MobileNavigation({
  open,
  items,
  t,
  onNavigate,
}: MobileNavigationProps) {
  return (
    <nav
      id="mobile-navigation"
      className={`mobile-navigation ${open ? 'is-open' : ''}`}
      aria-label={t.navLabel}
      aria-hidden={!open}
    >
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          tabIndex={open ? 0 : -1}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
