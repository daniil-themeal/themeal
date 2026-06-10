import TrendingUpIconSvg16 from '../svg/trending-up-16.svg?raw';
import TrendingUpIconSvg20 from '../svg/trending-up-20.svg?raw';
import TrendingUpIconSvg24 from '../svg/trending-up-24.svg?raw';
import TrendingUpIconSvg32 from '../svg/trending-up-32.svg?raw';
import TrendingUpIconSvg40 from '../svg/trending-up-40.svg?raw';
import TrendingUpIconSvg48 from '../svg/trending-up-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const TRENDING_UP_ICON_SVG_BY_SIZE = {
  16: TrendingUpIconSvg16,
  20: TrendingUpIconSvg20,
  24: TrendingUpIconSvg24,
  32: TrendingUpIconSvg32,
  40: TrendingUpIconSvg40,
  48: TrendingUpIconSvg48,
} as const;

export function TrendingUpIcon({ size = 20, className = '' }: IconProps) {
  const svg = TRENDING_UP_ICON_SVG_BY_SIZE[size] ?? TrendingUpIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
