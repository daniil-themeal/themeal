import { useEffect, useLayoutEffect, useRef } from 'react';

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
  animate?: boolean;
};

export function AnimatedNumber({
  value,
  format = defaultFormat,
  duration = CHECKOUT_ANIMATION_DURATION_MS,
  className,
  animate = false,
}: AnimatedNumberProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const animatedValueRef = useRef(value);
  const animationTokenRef = useRef(0);
  const formatRef = useRef(format);

  formatRef.current = format;

  const writeDisplay = (nextValue: number) => {
    if (spanRef.current) {
      spanRef.current.textContent = formatRef.current(nextValue);
    }
  };

  useLayoutEffect(() => {
    writeDisplay(animatedValueRef.current);
  }, []);

  useEffect(() => {
    const startValue = animatedValueRef.current;

    if (startValue === value) return;

    if (!animate || prefersReducedMotion()) {
      animatedValueRef.current = value;
      writeDisplay(value);
      return;
    }

    const token = animationTokenRef.current + 1;
    animationTokenRef.current = token;
    const startTime = performance.now();

    const tick = (currentTime: number) => {
      if (animationTokenRef.current !== token) return;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const nextValue = startValue + (value - startValue) * easeInOutCubic(progress);

      animatedValueRef.current = nextValue;
      writeDisplay(nextValue);

      if (progress < 1) {
        window.requestAnimationFrame(tick);
        return;
      }

      animatedValueRef.current = value;
      writeDisplay(value);
    };

    window.requestAnimationFrame(tick);

    return () => {
      animationTokenRef.current += 1;
    };
  }, [animate, duration, value]);

  return <span ref={spanRef} className={className} />;
}
