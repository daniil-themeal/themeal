import SunsetIconSvg16 from '../svg/sunset-16.svg?raw';
import SunsetIconSvg20 from '../svg/sunset-20.svg?raw';
import SunsetIconSvg24 from '../svg/sunset-24.svg?raw';
import SunsetIconSvg32 from '../svg/sunset-32.svg?raw';
import SunsetIconSvg40 from '../svg/sunset-40.svg?raw';
import SunsetIconSvg48 from '../svg/sunset-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const SUNSET_ICON_SVG_BY_SIZE = {
  16: SunsetIconSvg16,
  20: SunsetIconSvg20,
  24: SunsetIconSvg24,
  32: SunsetIconSvg32,
  40: SunsetIconSvg40,
  48: SunsetIconSvg48,
} as const;

export function SunsetIcon({ size = 20, className = '' }: IconProps) {
  const svg = SUNSET_ICON_SVG_BY_SIZE[size] ?? SunsetIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
