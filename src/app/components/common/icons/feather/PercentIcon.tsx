import PercentIconSvg16 from '../svg/percent-16.svg?raw';
import PercentIconSvg20 from '../svg/percent-20.svg?raw';
import PercentIconSvg24 from '../svg/percent-24.svg?raw';
import PercentIconSvg32 from '../svg/percent-32.svg?raw';
import PercentIconSvg40 from '../svg/percent-40.svg?raw';
import PercentIconSvg48 from '../svg/percent-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const PERCENT_ICON_SVG_BY_SIZE = {
  16: PercentIconSvg16,
  20: PercentIconSvg20,
  24: PercentIconSvg24,
  32: PercentIconSvg32,
  40: PercentIconSvg40,
  48: PercentIconSvg48,
} as const;

export function PercentIcon({ size = 20, className = '' }: IconProps) {
  const svg = PERCENT_ICON_SVG_BY_SIZE[size] ?? PercentIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
