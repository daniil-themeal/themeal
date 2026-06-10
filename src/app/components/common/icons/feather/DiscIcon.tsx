import DiscIconSvg16 from '../svg/disc-16.svg?raw';
import DiscIconSvg20 from '../svg/disc-20.svg?raw';
import DiscIconSvg24 from '../svg/disc-24.svg?raw';
import DiscIconSvg32 from '../svg/disc-32.svg?raw';
import DiscIconSvg40 from '../svg/disc-40.svg?raw';
import DiscIconSvg48 from '../svg/disc-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const DISC_ICON_SVG_BY_SIZE = {
  16: DiscIconSvg16,
  20: DiscIconSvg20,
  24: DiscIconSvg24,
  32: DiscIconSvg32,
  40: DiscIconSvg40,
  48: DiscIconSvg48,
} as const;

export function DiscIcon({ size = 20, className = '' }: IconProps) {
  const svg = DISC_ICON_SVG_BY_SIZE[size] ?? DiscIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
