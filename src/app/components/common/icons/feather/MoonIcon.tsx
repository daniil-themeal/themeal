import MoonIconSvg16 from '../svg/moon-16.svg?raw';
import MoonIconSvg20 from '../svg/moon-20.svg?raw';
import MoonIconSvg24 from '../svg/moon-24.svg?raw';
import MoonIconSvg32 from '../svg/moon-32.svg?raw';
import MoonIconSvg40 from '../svg/moon-40.svg?raw';
import MoonIconSvg48 from '../svg/moon-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const MOON_ICON_SVG_BY_SIZE = {
  16: MoonIconSvg16,
  20: MoonIconSvg20,
  24: MoonIconSvg24,
  32: MoonIconSvg32,
  40: MoonIconSvg40,
  48: MoonIconSvg48,
} as const;

export function MoonIcon({ size = 20, className = '' }: IconProps) {
  const svg = MOON_ICON_SVG_BY_SIZE[size] ?? MoonIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
