import TrendingDownIconSvg16 from '../svg/trending-down-16.svg?raw';
import TrendingDownIconSvg20 from '../svg/trending-down-20.svg?raw';
import TrendingDownIconSvg24 from '../svg/trending-down-24.svg?raw';
import TrendingDownIconSvg32 from '../svg/trending-down-32.svg?raw';
import TrendingDownIconSvg40 from '../svg/trending-down-40.svg?raw';
import TrendingDownIconSvg48 from '../svg/trending-down-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const TRENDING_DOWN_ICON_SVG_BY_SIZE = {
  16: TrendingDownIconSvg16,
  20: TrendingDownIconSvg20,
  24: TrendingDownIconSvg24,
  32: TrendingDownIconSvg32,
  40: TrendingDownIconSvg40,
  48: TrendingDownIconSvg48,
} as const;

export function TrendingDownIcon({ size = 20, className = '' }: IconProps) {
  const svg = TRENDING_DOWN_ICON_SVG_BY_SIZE[size] ?? TrendingDownIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
