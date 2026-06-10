import SunriseIconSvg16 from '../svg/sunrise-16.svg?raw';
import SunriseIconSvg20 from '../svg/sunrise-20.svg?raw';
import SunriseIconSvg24 from '../svg/sunrise-24.svg?raw';
import SunriseIconSvg32 from '../svg/sunrise-32.svg?raw';
import SunriseIconSvg40 from '../svg/sunrise-40.svg?raw';
import SunriseIconSvg48 from '../svg/sunrise-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const SUNRISE_ICON_SVG_BY_SIZE = {
  16: SunriseIconSvg16,
  20: SunriseIconSvg20,
  24: SunriseIconSvg24,
  32: SunriseIconSvg32,
  40: SunriseIconSvg40,
  48: SunriseIconSvg48,
} as const;

export function SunriseIcon({ size = 20, className = '' }: IconProps) {
  const svg = SUNRISE_ICON_SVG_BY_SIZE[size] ?? SunriseIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
