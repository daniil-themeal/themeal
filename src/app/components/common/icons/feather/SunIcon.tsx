import SunIconSvg16 from '../svg/sun-16.svg?raw';
import SunIconSvg20 from '../svg/sun-20.svg?raw';
import SunIconSvg24 from '../svg/sun-24.svg?raw';
import SunIconSvg32 from '../svg/sun-32.svg?raw';
import SunIconSvg40 from '../svg/sun-40.svg?raw';
import SunIconSvg48 from '../svg/sun-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const SUN_ICON_SVG_BY_SIZE = {
  16: SunIconSvg16,
  20: SunIconSvg20,
  24: SunIconSvg24,
  32: SunIconSvg32,
  40: SunIconSvg40,
  48: SunIconSvg48,
} as const;

export function SunIcon({ size = 20, className = '' }: IconProps) {
  const svg = SUN_ICON_SVG_BY_SIZE[size] ?? SunIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
