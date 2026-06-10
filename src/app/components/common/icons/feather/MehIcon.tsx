import MehIconSvg16 from '../svg/meh-16.svg?raw';
import MehIconSvg20 from '../svg/meh-20.svg?raw';
import MehIconSvg24 from '../svg/meh-24.svg?raw';
import MehIconSvg32 from '../svg/meh-32.svg?raw';
import MehIconSvg40 from '../svg/meh-40.svg?raw';
import MehIconSvg48 from '../svg/meh-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const MEH_ICON_SVG_BY_SIZE = {
  16: MehIconSvg16,
  20: MehIconSvg20,
  24: MehIconSvg24,
  32: MehIconSvg32,
  40: MehIconSvg40,
  48: MehIconSvg48,
} as const;

export function MehIcon({ size = 20, className = '' }: IconProps) {
  const svg = MEH_ICON_SVG_BY_SIZE[size] ?? MehIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
