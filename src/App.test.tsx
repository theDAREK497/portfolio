import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('portfolio', () => {
  it('renders the verified English content and complete navigation by default', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Full-Stack & AI Integration Engineer',
    );
    const navigation = screen.getByRole('navigation', {
      name: 'Primary navigation',
    });
    for (const label of [
      'Projects',
      'About',
      'Capabilities',
      'Experience',
      'Education',
      'Writing',
      'Contact',
    ]) {
      expect(
        within(navigation).getByRole('link', { name: label }),
      ).toBeInTheDocument();
    }

    expect(screen.queryByText('/01')).not.toBeInTheDocument();
    expect(screen.queryByText('/02')).not.toBeInTheDocument();
    expect(screen.getAllByRole('contentinfo')).toHaveLength(1);
    expect(
      screen.getByRole('heading', { name: 'Let’s create together!' }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: 'Read case study: AstroCode' }),
    );
    expect(
      screen.getByText(
        /804 store page views, 11 installs and 1 paid monthly subscription/,
      ),
    ).toBeInTheDocument();
  });

  it('switches language and persists the preference', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Switch to Russian' }));

    expect(screen.queryByTestId('language-transition')).not.toBeInTheDocument();
    expect(document.querySelector('.site-shell')).toHaveAttribute(
      'data-language-transition',
      'scrambling',
    );
    expect(document.documentElement).toHaveAttribute('lang', 'ru');
    await waitFor(
      () =>
        expect(document.querySelector('.site-shell')).toHaveAttribute(
          'data-language-transition',
          'idle',
        ),
      { timeout: 2500 },
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Full-Stack & AI Integration Engineer',
    );
    expect(
      screen.getByRole('link', { name: 'Смотреть проекты' }),
    ).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute('lang', 'ru');
    expect(window.localStorage.getItem('portfolio-language')).toBe('ru');
  });

  it('opens a case study from the full-card action and keeps external links separate', async () => {
    const user = userEvent.setup();
    render(<App />);

    const card = screen.getByTestId('project-demiurge');
    expect(
      within(card).getByRole('button', {
        name: 'Read case study: Demiurge Assistant',
      }),
    ).toBeInTheDocument();
    expect(
      within(card).getByRole('link', { name: 'View repository' }),
    ).toHaveAttribute(
      'href',
      'https://github.com/theDAREK497/demiurge-assistant',
    );

    await user.click(
      within(card).getByRole('button', {
        name: 'Read case study: Demiurge Assistant',
      }),
    );
    const dialog = screen.getByRole('dialog', { name: 'Demiurge Assistant' });
    expect(dialog).toBeInTheDocument();
    expect(
      within(dialog).getByRole('heading', { name: 'Product screenshots' }),
    ).toBeInTheDocument();
    const screenshotButtons = within(dialog).getAllByRole('button', {
      name: /Open full-size screenshot/,
    });
    expect(screenshotButtons).toHaveLength(3);

    await user.click(screenshotButtons[0]);
    expect(
      screen.getByRole('dialog', { name: 'Image viewer' }),
    ).toBeInTheDocument();
    await user.keyboard('{Escape}');
    await waitFor(() =>
      expect(
        screen.queryByRole('dialog', { name: 'Image viewer' }),
      ).not.toBeInTheDocument(),
    );
  });

  it('filters projects without disturbing their source order', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'AI & knowledge' }));

    const projectsSection = document.querySelector('#projects');
    expect(projectsSection).not.toBeNull();
    const projectHeadings = within(projectsSection as HTMLElement).getAllByRole(
      'heading',
      {
        level: 3,
      },
    );
    expect(projectHeadings.map((heading) => heading.textContent)).toEqual([
      'Demiurge Assistant',
      'Archive Assistant Bot',
    ]);
    expect(
      screen.queryByRole('heading', { name: 'AstroCode' }),
    ).not.toBeInTheDocument();
  });

  it('changes theme and stores the selection', async () => {
    const user = userEvent.setup();
    render(<App />);

    const toggle = screen.getByTestId('theme-toggle');
    await user.click(toggle);

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(toggle).toHaveAccessibleName('Switch to light theme');
    expect(window.localStorage.getItem('portfolio-theme')).toBe('dark');
  });

  it('opens an accessible contact dialog, closes on Escape and restores focus', async () => {
    const user = userEvent.setup();
    render(<App />);

    const opener = screen.getAllByRole('button', { name: 'Contact me' })[0];
    await user.click(opener);

    const dialog = screen.getByRole('dialog', { name: 'Contact Ilya Gurikov' });
    expect(dialog).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Close contact dialog' }),
    ).toHaveFocus();
    expect(
      within(dialog).getByRole('link', { name: /ilion9871@gmail.com/ }),
    ).toHaveAttribute('href', 'mailto:ilion9871@gmail.com');

    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    );
    expect(opener).toHaveFocus();
  });
});
