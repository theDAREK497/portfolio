import { useCallback, useEffect, useRef, useState } from 'react';

export type ClipboardStatus = 'idle' | 'copied' | 'failed';

export function useClipboard() {
  const [status, setStatus] = useState<ClipboardStatus>('idle');
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const copy = useCallback(async (value: string) => {
    window.clearTimeout(timeoutRef.current);
    try {
      await navigator.clipboard.writeText(value);
      setStatus('copied');
    } catch {
      setStatus('failed');
    }
    timeoutRef.current = window.setTimeout(() => setStatus('idle'), 2200);
  }, []);

  return { status, copy };
}
