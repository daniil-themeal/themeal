import SlidersIconSvg16 from '../svg/sliders-16.svg?raw';
import SlidersIconSvg20 from '../svg/sliders-20.svg?raw';
import SlidersIconSvg24 from '../svg/sliders-24.svg?raw';
import SlidersIconSvg32 from '../svg/sliders-32.svg?raw';
import SlidersIconSvg40 from '../svg/sliders-40.svg?raw';
import SlidersIconSvg48 from '../svg/sliders-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const SLIDERS_ICON_SVG_BY_SIZE = {
  16: SlidersIconSvg16,
  20: SlidersIconSvg20,
  24: SlidersIconSvg24,
  32: SlidersIconSvg32,
  40: SlidersIconSvg40,
  48: SlidersIconSvg48,
} as const;

export function SlidersIcon({ size = 20, className = '' }: IconProps) {
  const svg = SLIDERS_ICON_SVG_BY_SIZE[size] ?? SlidersIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
