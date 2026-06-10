import BellIconSvg16 from '../svg/bell-16.svg?raw';
import BellIconSvg20 from '../svg/bell-20.svg?raw';
import BellIconSvg24 from '../svg/bell-24.svg?raw';
import BellIconSvg32 from '../svg/bell-32.svg?raw';
import BellIconSvg40 from '../svg/bell-40.svg?raw';
import BellIconSvg48 from '../svg/bell-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const BELL_ICON_SVG_BY_SIZE = {
  16: BellIconSvg16,
  20: BellIconSvg20,
  24: BellIconSvg24,
  32: BellIconSvg32,
  40: BellIconSvg40,
  48: BellIconSvg48,
} as const;

export function BellIcon({ size = 20, className = '' }: IconProps) {
  const svg = BELL_ICON_SVG_BY_SIZE[size] ?? BellIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
