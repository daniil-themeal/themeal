import { useCallback, useEffect, useRef, useState } from 'react';

export type InlineSuccessPhase = 'hidden' | 'visible' | 'leaving';

const VISIBLE_MS = 2200;
const LEAVE_MS = 300;

export function useInlineSuccessNotice() {
  const [phase, setPhase] = useState<InlineSuccessPhase>('hidden');
  const timersRef = useRef<{ hide?: number; remove?: number }>({});

  const clearTimers = useCallback(() => {
    const { hide, remove } = timersRef.current;

    if (hide) {
      window.clearTimeout(hide);
    }

    if (remove) {
      window.clearTimeout(remove);
    }

    timersRef.current = {};
  }, []);

  const show = useCallback(() => {
    clearTimers();
    setPhase('visible');

    timersRef.current.hide = window.setTimeout(() => {
      setPhase('leaving');

      timersRef.current.remove = window.setTimeout(() => {
        setPhase('hidden');
        timersRef.current = {};
      }, LEAVE_MS);
    }, VISIBLE_MS);
  }, [clearTimers]);

  const reset = useCallback(() => {
    setPhase('hidden');
    clearTimers();
  }, [clearTimers]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  return { phase, show, reset };
}
