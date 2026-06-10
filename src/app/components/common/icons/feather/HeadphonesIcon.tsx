import HeadphonesIconSvg16 from '../svg/headphones-16.svg?raw';
import HeadphonesIconSvg20 from '../svg/headphones-20.svg?raw';
import HeadphonesIconSvg24 from '../svg/headphones-24.svg?raw';
import HeadphonesIconSvg32 from '../svg/headphones-32.svg?raw';
import HeadphonesIconSvg40 from '../svg/headphones-40.svg?raw';
import HeadphonesIconSvg48 from '../svg/headphones-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const HEADPHONES_ICON_SVG_BY_SIZE = {
  16: HeadphonesIconSvg16,
  20: HeadphonesIconSvg20,
  24: HeadphonesIconSvg24,
  32: HeadphonesIconSvg32,
  40: HeadphonesIconSvg40,
  48: HeadphonesIconSvg48,
} as const;

export function HeadphonesIcon({ size = 20, className = '' }: IconProps) {
  const svg = HEADPHONES_ICON_SVG_BY_SIZE[size] ?? HeadphonesIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
