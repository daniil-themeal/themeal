import CrosshairIconSvg16 from '../svg/crosshair-16.svg?raw';
import CrosshairIconSvg20 from '../svg/crosshair-20.svg?raw';
import CrosshairIconSvg24 from '../svg/crosshair-24.svg?raw';
import CrosshairIconSvg32 from '../svg/crosshair-32.svg?raw';
import CrosshairIconSvg40 from '../svg/crosshair-40.svg?raw';
import CrosshairIconSvg48 from '../svg/crosshair-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CROSSHAIR_ICON_SVG_BY_SIZE = {
  16: CrosshairIconSvg16,
  20: CrosshairIconSvg20,
  24: CrosshairIconSvg24,
  32: CrosshairIconSvg32,
  40: CrosshairIconSvg40,
  48: CrosshairIconSvg48,
} as const;

export function CrosshairIcon({ size = 20, className = '' }: IconProps) {
  const svg = CROSSHAIR_ICON_SVG_BY_SIZE[size] ?? CrosshairIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
