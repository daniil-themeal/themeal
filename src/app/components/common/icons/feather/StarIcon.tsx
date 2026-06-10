import StarIconSvg16 from '../svg/star-16.svg?raw';
import StarIconSvg20 from '../svg/star-20.svg?raw';
import StarIconSvg24 from '../svg/star-24.svg?raw';
import StarIconSvg32 from '../svg/star-32.svg?raw';
import StarIconSvg40 from '../svg/star-40.svg?raw';
import StarIconSvg48 from '../svg/star-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const STAR_ICON_SVG_BY_SIZE = {
  16: StarIconSvg16,
  20: StarIconSvg20,
  24: StarIconSvg24,
  32: StarIconSvg32,
  40: StarIconSvg40,
  48: StarIconSvg48,
} as const;

export function StarIcon({ size = 20, className = '' }: IconProps) {
  const svg = STAR_ICON_SVG_BY_SIZE[size] ?? StarIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
