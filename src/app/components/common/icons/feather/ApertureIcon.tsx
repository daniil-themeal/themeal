import ApertureIconSvg16 from '../svg/aperture-16.svg?raw';
import ApertureIconSvg20 from '../svg/aperture-20.svg?raw';
import ApertureIconSvg24 from '../svg/aperture-24.svg?raw';
import ApertureIconSvg32 from '../svg/aperture-32.svg?raw';
import ApertureIconSvg40 from '../svg/aperture-40.svg?raw';
import ApertureIconSvg48 from '../svg/aperture-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const APERTURE_ICON_SVG_BY_SIZE = {
  16: ApertureIconSvg16,
  20: ApertureIconSvg20,
  24: ApertureIconSvg24,
  32: ApertureIconSvg32,
  40: ApertureIconSvg40,
  48: ApertureIconSvg48,
} as const;

export function ApertureIcon({ size = 20, className = '' }: IconProps) {
  const svg = APERTURE_ICON_SVG_BY_SIZE[size] ?? ApertureIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
