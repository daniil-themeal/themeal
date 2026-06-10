import TvIconSvg16 from '../svg/tv-16.svg?raw';
import TvIconSvg20 from '../svg/tv-20.svg?raw';
import TvIconSvg24 from '../svg/tv-24.svg?raw';
import TvIconSvg32 from '../svg/tv-32.svg?raw';
import TvIconSvg40 from '../svg/tv-40.svg?raw';
import TvIconSvg48 from '../svg/tv-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const TV_ICON_SVG_BY_SIZE = {
  16: TvIconSvg16,
  20: TvIconSvg20,
  24: TvIconSvg24,
  32: TvIconSvg32,
  40: TvIconSvg40,
  48: TvIconSvg48,
} as const;

export function TvIcon({ size = 20, className = '' }: IconProps) {
  const svg = TV_ICON_SVG_BY_SIZE[size] ?? TvIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
