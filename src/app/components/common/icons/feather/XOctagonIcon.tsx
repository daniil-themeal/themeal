import XOctagonIconSvg16 from '../svg/x-octagon-16.svg?raw';
import XOctagonIconSvg20 from '../svg/x-octagon-20.svg?raw';
import XOctagonIconSvg24 from '../svg/x-octagon-24.svg?raw';
import XOctagonIconSvg32 from '../svg/x-octagon-32.svg?raw';
import XOctagonIconSvg40 from '../svg/x-octagon-40.svg?raw';
import XOctagonIconSvg48 from '../svg/x-octagon-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const XOCTAGON_ICON_SVG_BY_SIZE = {
  16: XOctagonIconSvg16,
  20: XOctagonIconSvg20,
  24: XOctagonIconSvg24,
  32: XOctagonIconSvg32,
  40: XOctagonIconSvg40,
  48: XOctagonIconSvg48,
} as const;

export function XOctagonIcon({ size = 20, className = '' }: IconProps) {
  const svg = XOCTAGON_ICON_SVG_BY_SIZE[size] ?? XOctagonIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
