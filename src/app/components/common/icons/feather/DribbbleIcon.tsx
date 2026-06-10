import DribbbleIconSvg16 from '../svg/dribbble-16.svg?raw';
import DribbbleIconSvg20 from '../svg/dribbble-20.svg?raw';
import DribbbleIconSvg24 from '../svg/dribbble-24.svg?raw';
import DribbbleIconSvg32 from '../svg/dribbble-32.svg?raw';
import DribbbleIconSvg40 from '../svg/dribbble-40.svg?raw';
import DribbbleIconSvg48 from '../svg/dribbble-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const DRIBBBLE_ICON_SVG_BY_SIZE = {
  16: DribbbleIconSvg16,
  20: DribbbleIconSvg20,
  24: DribbbleIconSvg24,
  32: DribbbleIconSvg32,
  40: DribbbleIconSvg40,
  48: DribbbleIconSvg48,
} as const;

export function DribbbleIcon({ size = 20, className = '' }: IconProps) {
  const svg = DRIBBBLE_ICON_SVG_BY_SIZE[size] ?? DribbbleIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
