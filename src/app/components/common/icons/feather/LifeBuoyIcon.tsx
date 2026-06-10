import LifeBuoyIconSvg16 from '../svg/life-buoy-16.svg?raw';
import LifeBuoyIconSvg20 from '../svg/life-buoy-20.svg?raw';
import LifeBuoyIconSvg24 from '../svg/life-buoy-24.svg?raw';
import LifeBuoyIconSvg32 from '../svg/life-buoy-32.svg?raw';
import LifeBuoyIconSvg40 from '../svg/life-buoy-40.svg?raw';
import LifeBuoyIconSvg48 from '../svg/life-buoy-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const LIFE_BUOY_ICON_SVG_BY_SIZE = {
  16: LifeBuoyIconSvg16,
  20: LifeBuoyIconSvg20,
  24: LifeBuoyIconSvg24,
  32: LifeBuoyIconSvg32,
  40: LifeBuoyIconSvg40,
  48: LifeBuoyIconSvg48,
} as const;

export function LifeBuoyIcon({ size = 20, className = '' }: IconProps) {
  const svg = LIFE_BUOY_ICON_SVG_BY_SIZE[size] ?? LifeBuoyIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
