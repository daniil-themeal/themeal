import HomeIconSvg16 from '../svg/home-16.svg?raw';
import HomeIconSvg20 from '../svg/home-20.svg?raw';
import HomeIconSvg24 from '../svg/home-24.svg?raw';
import HomeIconSvg32 from '../svg/home-32.svg?raw';
import HomeIconSvg40 from '../svg/home-40.svg?raw';
import HomeIconSvg48 from '../svg/home-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const HOME_ICON_SVG_BY_SIZE = {
  16: HomeIconSvg16,
  20: HomeIconSvg20,
  24: HomeIconSvg24,
  32: HomeIconSvg32,
  40: HomeIconSvg40,
  48: HomeIconSvg48,
} as const;

export function HomeIcon({ size = 20, className = '' }: IconProps) {
  const svg = HOME_ICON_SVG_BY_SIZE[size] ?? HomeIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
