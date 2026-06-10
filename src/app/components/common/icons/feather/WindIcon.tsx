import WindIconSvg16 from '../svg/wind-16.svg?raw';
import WindIconSvg20 from '../svg/wind-20.svg?raw';
import WindIconSvg24 from '../svg/wind-24.svg?raw';
import WindIconSvg32 from '../svg/wind-32.svg?raw';
import WindIconSvg40 from '../svg/wind-40.svg?raw';
import WindIconSvg48 from '../svg/wind-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const WIND_ICON_SVG_BY_SIZE = {
  16: WindIconSvg16,
  20: WindIconSvg20,
  24: WindIconSvg24,
  32: WindIconSvg32,
  40: WindIconSvg40,
  48: WindIconSvg48,
} as const;

export function WindIcon({ size = 20, className = '' }: IconProps) {
  const svg = WIND_ICON_SVG_BY_SIZE[size] ?? WindIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
