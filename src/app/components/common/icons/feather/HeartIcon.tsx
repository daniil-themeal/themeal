import HeartIconSvg16 from '../svg/heart-16.svg?raw';
import HeartIconSvg20 from '../svg/heart-20.svg?raw';
import HeartIconSvg24 from '../svg/heart-24.svg?raw';
import HeartIconSvg32 from '../svg/heart-32.svg?raw';
import HeartIconSvg40 from '../svg/heart-40.svg?raw';
import HeartIconSvg48 from '../svg/heart-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const HEART_ICON_SVG_BY_SIZE = {
  16: HeartIconSvg16,
  20: HeartIconSvg20,
  24: HeartIconSvg24,
  32: HeartIconSvg32,
  40: HeartIconSvg40,
  48: HeartIconSvg48,
} as const;

export function HeartIcon({ size = 20, className = '' }: IconProps) {
  const svg = HEART_ICON_SVG_BY_SIZE[size] ?? HeartIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
