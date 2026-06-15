import { useEffect, useRef, useState } from 'react';

import { CHECKOUT_ANIMATION_DURATION_MS, easeInOutCubic } from './easing';

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

const defaultFormat = (value: number) => Math.round(value).toString();

export type AnimatedNumberProps = {
  value: number;
  format?: (value: number) => string;
  duration?: number;
  className?: string;
};

export function AnimatedNumber({
  value,
  format = defaultFormat,
  duration = CHECKOUT_ANIMATION_DURATION_MS,
  className,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const displayValueRef = useRef(value);
  const animationTokenRef = useRef(0);

  useEffect(() => {
    const startValue = displayValueRef.current;

    if (startValue === value) return;

    if (prefersReducedMotion()) {
      displayValueRef.current = value;
      setDisplayValue(value);
      return;
    }

    const token = animationTokenRef.current + 1;
    animationTokenRef.current = token;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      if (animationTokenRef.current !== token) return;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const nextValue = startValue + (value - startValue) * easeInOutCubic(progress);

      displayValueRef.current = nextValue;
      setDisplayValue(nextValue);

      if (progress < 1) {
        window.requestAnimationFrame(animate);
        return;
      }

      displayValueRef.current = value;
      setDisplayValue(value);
    };

    window.requestAnimationFrame(animate);

    return () => {
      animationTokenRef.current += 1;
    };
  }, [duration, value]);

  return <span className={className}>{format(displayValue)}</span>;
}
