import PowerIconSvg16 from '../svg/power-16.svg?raw';
import PowerIconSvg20 from '../svg/power-20.svg?raw';
import PowerIconSvg24 from '../svg/power-24.svg?raw';
import PowerIconSvg32 from '../svg/power-32.svg?raw';
import PowerIconSvg40 from '../svg/power-40.svg?raw';
import PowerIconSvg48 from '../svg/power-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const POWER_ICON_SVG_BY_SIZE = {
  16: PowerIconSvg16,
  20: PowerIconSvg20,
  24: PowerIconSvg24,
  32: PowerIconSvg32,
  40: PowerIconSvg40,
  48: PowerIconSvg48,
} as const;

export function PowerIcon({ size = 20, className = '' }: IconProps) {
  const svg = POWER_ICON_SVG_BY_SIZE[size] ?? PowerIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
