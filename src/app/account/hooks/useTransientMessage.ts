import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_DURATION_MS = 4000;

export function useTransientMessage(durationMs = DEFAULT_DURATION_MS) {
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const show = useCallback(() => {
    clearTimer();
    setIsVisible(true);

    timerRef.current = window.setTimeout(() => {
      setIsVisible(false);
      timerRef.current = null;
    }, durationMs);
  }, [clearTimer, durationMs]);

  const hide = useCallback(() => {
    clearTimer();
    setIsVisible(false);
  }, [clearTimer]);

  useEffect(() => () => clearTimer(), [clearTimer]);

  return { isVisible, show, hide };
}
