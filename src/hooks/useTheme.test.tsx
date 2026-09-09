import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useTheme } from './useTheme';

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('theme transitions', () => {
  it('uses a lightweight fade on mobile and ignores repeated taps during it', () => {
    vi.useFakeTimers();
    vi.spyOn(window, 'matchMedia').mockImplementation(
      (query) =>
        ({
          matches: query.includes('max-width'),
        }) as MediaQueryList,
    );
    const snapshot = vi.fn();
    Object.defineProperty(document, 'startViewTransition', {
      configurable: true,
      value: snapshot,
    });
    const { result, unmount } = renderHook(() => useTheme());
    const button = document.createElement('button');
    act(() => result.current.toggleTheme(button));
    expect(result.current.theme).toBe('dark');
    expect(snapshot).not.toHaveBeenCalled();
    expect(document.documentElement).toHaveClass('theme-fade-transition');
    act(() => result.current.toggleTheme(button));
    expect(result.current.theme).toBe('dark');
    act(() => vi.advanceTimersByTime(200));
    expect(document.documentElement).not.toHaveClass('theme-fade-transition');
    act(() => result.current.toggleTheme(button));
    expect(result.current.theme).toBe('light');
    unmount();
    Reflect.deleteProperty(document, 'startViewTransition');
  });

  it('switches immediately when reduced motion is requested', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation(
      (query) =>
        ({
          matches: query.includes('prefers-reduced-motion'),
        }) as MediaQueryList,
    );
    const { result } = renderHook(() => useTheme());
    act(() => result.current.toggleTheme(document.createElement('button')));
    expect(result.current.theme).toBe('dark');
    expect(document.documentElement).not.toHaveClass('theme-fade-transition');
    expect(document.documentElement).not.toHaveClass('theme-wave-transition');
  });
});
