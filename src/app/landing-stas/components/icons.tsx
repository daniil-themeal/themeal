import { createElement, type ComponentType, type CSSProperties } from 'react';

import type { IconProps } from '../../components/common/icons/iconProps';
import type { IconSize } from '../../components/common/icons/iconSize';
import {
  ArrowRightIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  FacebookIcon,
  HeartIcon,
  InstagramIcon,
  MapPinIcon,
  MinusIcon,
  PlusIcon,
  ShieldIcon,
  StarIcon,
  TruckIcon,
  UserIcon,
  XIcon,
  YoutubeIcon,
} from '../../components/common/icons/feather';

type LandingIconProps = {
  size?: number;
  className?: string;
  style?: CSSProperties;
  fill?: string;
  sw?: number;
};

const I = ({ d, size = 22, fill = 'none', sw = 1.6, children, vb = 24 }: LandingIconProps & { d?: string; vb?: number; children?: ReturnType<typeof createElement> }) =>
  createElement('svg', {
    width: size,
    height: size,
    viewBox: `0 0 ${vb} ${vb}`,
    fill,
    stroke: 'currentColor',
    strokeWidth: sw,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }, children || createElement('path', { d }));

function snapSize(size = 20): IconSize {
  const sizes: IconSize[] = [16, 20, 24, 32, 40, 48];
  return sizes.reduce((best, candidate) =>
    Math.abs(candidate - size) < Math.abs(best - size) ? candidate : best,
  );
}

function fromFeather(Comp: ComponentType<IconProps>) {
  return ({ size = 20, className, style }: LandingIconProps) => {
    const icon = createElement(Comp, { size: snapSize(size), className });
    if (!style) return icon;
    return createElement('span', { className: 'inline-flex shrink-0 items-center justify-center', style }, icon);
  };
}

const Icon = {
  check: fromFeather(CheckIcon),
  arrow: fromFeather(ArrowRightIcon),
  chevron: fromFeather(ChevronDownIcon),
  clock: fromFeather(ClockIcon),
  truck: fromFeather(TruckIcon),
  pin: fromFeather(MapPinIcon),
  calendar: fromFeather(CalendarIcon),
  star: fromFeather(StarIcon),
  plus: fromFeather(PlusIcon),
  minus: fromFeather(MinusIcon),
  x: fromFeather(XIcon),
  shield: fromFeather(ShieldIcon),
  heart: fromFeather(HeartIcon),
  user: fromFeather(UserIcon),
  leaf: (p: LandingIconProps) => I({
    ...p,
    children: [
      createElement('path', { key: 0, d: 'M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z' }),
      createElement('path', { key: 1, d: 'M2 21c0-3 1.85-5.36 5.08-6' }),
    ],
  }),
  snow: (p: LandingIconProps) => I({
    ...p,
    children: [createElement('path', { key: 0, d: 'M12 2v20M4.93 4.93l14.14 14.14M2 12h20M19.07 4.93 4.93 19.07' })],
  }),
  flame: (p: LandingIconProps) => I({ ...p, d: 'M12 2c1 4-2 5-2 8a4 4 0 0 0 8 0c0-1-1-3-2-4 .5 2-1 3-2 3 .5-3-2-5-2-7Z M6 14a6 6 0 1 0 12 0' }),
  spark: (p: LandingIconProps) => I({ ...p, fill: 'currentColor', sw: 0, d: 'M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2Z' }),
  utensils: (p: LandingIconProps) => I({
    ...p,
    children: [
      createElement('path', { key: 0, d: 'M3 2v7c0 1.1.9 2 2 2h0a2 2 0 0 0 2-2V2M5 2v20' }),
      createElement('path', { key: 1, d: 'M17 2v20M17 2a4 4 0 0 0-4 4v5c0 1.1.9 2 2 2h2' }),
    ],
  }),
  whatsapp: (p: LandingIconProps) => I({
    ...p,
    children: [
      createElement('path', { key: 0, d: 'M3 21l1.6-4.3A8 8 0 1 1 8 19.8L3 21Z' }),
      createElement('path', {
        key: 1,
        d: 'M8.5 8.2c.3-.7.6-.7.9-.7h.6c.3 0 .6 0 .8.6s.7 1.8.8 1.9c0 .2 0 .4-.1.5l-.4.5c-.2.2-.3.3-.1.6s.6 1 1.3 1.6c.9.7 1.5.9 1.8 1s.4 0 .6-.2l.6-.7c.2-.2.3-.2.6-.1l1.7.9c.3.1.4.2.5.3s0 .7-.2 1.3c-.3.6-1.4 1.2-1.9 1.2a4 4 0 0 1-1.8-.3 11 11 0 0 1-5.4-5.2c-.4-.8-.9-1.9-.9-2.9s.5-1.6.7-1.8Z',
        sw: 0,
        fill: 'currentColor',
      }),
    ],
  }),
};

const Logo = ({ height = 26, tone = 'yellow' } = {}) =>
  createElement('img', {
    src: `/landing-stas/assets/logo_${tone}.svg`,
    alt: 'theMeal',
    dir: 'ltr',
    style: { height, width: 'auto', display: 'inline-block', verticalAlign: 'middle' },
  });

const Stars = ({ n = 5, size = 16, color = 'var(--yellow)' }) =>
  createElement('span', { style: { display: 'inline-flex', gap: 2, color } },
    Array.from({ length: n }).map((_, i) => createElement(Icon.star, { key: i, size })));

const SI = (d: string, vb = 24) => (p: LandingIconProps = {}) =>
  createElement('svg', {
    width: p.size || 22,
    height: p.size || 22,
    viewBox: `0 0 ${vb} ${vb}`,
    fill: 'currentColor',
    'aria-hidden': true,
  }, createElement('path', { d }));

const Social = {
  facebook: fromFeather(FacebookIcon),
  instagram: fromFeather(InstagramIcon),
  youtube: fromFeather(YoutubeIcon),
  tiktok: SI('M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.08-.14 1.62.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z'),
  whatsapp: SI('M.06 24l1.69-6.16a11.87 11.87 0 01-1.59-5.95C.16 5.34 5.5 0 12.05 0c3.18 0 6.17 1.24 8.41 3.49a11.82 11.82 0 013.48 8.41c0 6.56-5.34 11.89-11.89 11.89-1.99 0-3.94-.5-5.69-1.45L.06 24zM6.65 20.2c1.68.99 3.28 1.59 5.39 1.59 5.45 0 9.89-4.43 9.89-9.89 0-5.46-4.42-9.89-9.88-9.89-5.45 0-9.89 4.43-9.89 9.88a9.86 9.86 0 001.51 5.26l-1 3.65 3.98-1.72zM18.04 14.73c-.07-.12-.27-.2-.57-.35-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41z'),
  telegram: SI('M11.94 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.06 0zm4.96 7.22c.1 0 .32.02.47.14.1.08.13.2.14.32.02.1.04.31.02.47-.18 1.9-.96 6.5-1.36 8.63-.17.9-.5 1.2-.82 1.23-.7.06-1.23-.46-1.9-.9-1.06-.7-1.65-1.13-2.68-1.8-1.19-.78-.42-1.21.26-1.91.17-.18 3.25-2.98 3.3-3.23a.24.24 0 00-.05-.21c-.07-.06-.18-.04-.25-.02-.1.02-1.8 1.14-5.06 3.34-.48.33-.91.49-1.3.48-.43-.01-1.25-.24-1.87-.44-.75-.24-1.35-.37-1.3-.79.03-.22.33-.44.9-.66 3.5-1.52 5.83-2.53 7-3.01 3.33-1.39 4.02-1.63 4.47-1.64z'),
};

export { Icon, Logo, Stars, Social };
