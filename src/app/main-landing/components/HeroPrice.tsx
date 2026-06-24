// @ts-nocheck
import { createElement, useRef, useState } from 'react';

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

  const onMouseMove = (event) => {
    if (!ref.current) return;
    const { left, width } = ref.current.getBoundingClientRect();
    if (width <= 0) return;
    const t = clamp((event.clientX - left) / width, 0, 1);
    setRotate(lerpRotate(t));
  };

  const onMouseEnter = () => {
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
