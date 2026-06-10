import FlagIconSvg16 from '../svg/flag-16.svg?raw';
import FlagIconSvg20 from '../svg/flag-20.svg?raw';
import FlagIconSvg24 from '../svg/flag-24.svg?raw';
import FlagIconSvg32 from '../svg/flag-32.svg?raw';
import FlagIconSvg40 from '../svg/flag-40.svg?raw';
import FlagIconSvg48 from '../svg/flag-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const FLAG_ICON_SVG_BY_SIZE = {
  16: FlagIconSvg16,
  20: FlagIconSvg20,
  24: FlagIconSvg24,
  32: FlagIconSvg32,
  40: FlagIconSvg40,
  48: FlagIconSvg48,
} as const;

export function FlagIcon({ size = 20, className = '' }: IconProps) {
  const svg = FLAG_ICON_SVG_BY_SIZE[size] ?? FlagIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
