// @ts-nocheck
import { createElement, useEffect, useRef, useState } from 'react';

const BASE_ROTATE = -2;
const ROTATE_LEFT = -6;
const ROTATE_RIGHT = 4;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function lerpRotate(t) {
  return ROTATE_LEFT + t * (ROTATE_RIGHT - ROTATE_LEFT);
}

export function HeroPrice({ was, now, cur }) {
  const ref = useRef(null);
  const [rotate, setRotate] = useState(BASE_ROTATE);
  const [hovered, setHovered] = useState(false);
  const [motionEnabled, setMotionEnabled] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fineHover = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setMotionEnabled(!reduceMotion.matches && fineHover.matches);
    sync();
    reduceMotion.addEventListener('change', sync);
    fineHover.addEventListener('change', sync);
    return () => {
      reduceMotion.removeEventListener('change', sync);
      fineHover.removeEventListener('change', sync);
    };
  }, []);

  const onMouseMove = (event) => {
    if (!motionEnabled || !ref.current) return;
    const { left, width } = ref.current.getBoundingClientRect();
    if (width <= 0) return;
    const t = clamp((event.clientX - left) / width, 0, 1);
    setRotate(lerpRotate(t));
  };

  const onMouseEnter = () => {
    if (!motionEnabled) return;
    setHovered(true);
  };

  const onMouseLeave = () => {
    setHovered(false);
    setRotate(BASE_ROTATE);
  };

  return createElement(
    'span',
    {
      ref,
      className: ['hero-title__price', hovered && 'hero-title__price--hover'].filter(Boolean).join(' '),
      style: { transform: `rotate(${rotate}deg)` },
      onMouseEnter,
      onMouseLeave,
      onMouseMove,
    },
    createElement('span', { className: 'hero-title__was mono' }, was),
    createElement('span', { className: 'hero-title__now' }, now),
    createElement('span', { className: 'hero-title__cur' }, cur),
  );
}
