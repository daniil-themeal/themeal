import BellOffIconSvg16 from '../svg/bell-off-16.svg?raw';
import BellOffIconSvg20 from '../svg/bell-off-20.svg?raw';
import BellOffIconSvg24 from '../svg/bell-off-24.svg?raw';
import BellOffIconSvg32 from '../svg/bell-off-32.svg?raw';
import BellOffIconSvg40 from '../svg/bell-off-40.svg?raw';
import BellOffIconSvg48 from '../svg/bell-off-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const BELL_OFF_ICON_SVG_BY_SIZE = {
  16: BellOffIconSvg16,
  20: BellOffIconSvg20,
  24: BellOffIconSvg24,
  32: BellOffIconSvg32,
  40: BellOffIconSvg40,
  48: BellOffIconSvg48,
} as const;

export function BellOffIcon({ size = 20, className = '' }: IconProps) {
  const svg = BELL_OFF_ICON_SVG_BY_SIZE[size] ?? BellOffIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
