import CastIconSvg16 from '../svg/cast-16.svg?raw';
import CastIconSvg20 from '../svg/cast-20.svg?raw';
import CastIconSvg24 from '../svg/cast-24.svg?raw';
import CastIconSvg32 from '../svg/cast-32.svg?raw';
import CastIconSvg40 from '../svg/cast-40.svg?raw';
import CastIconSvg48 from '../svg/cast-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CAST_ICON_SVG_BY_SIZE = {
  16: CastIconSvg16,
  20: CastIconSvg20,
  24: CastIconSvg24,
  32: CastIconSvg32,
  40: CastIconSvg40,
  48: CastIconSvg48,
} as const;

export function CastIcon({ size = 20, className = '' }: IconProps) {
  const svg = CAST_ICON_SVG_BY_SIZE[size] ?? CastIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
