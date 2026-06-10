import MoreHorizontalIconSvg16 from '../svg/more-horizontal-16.svg?raw';
import MoreHorizontalIconSvg20 from '../svg/more-horizontal-20.svg?raw';
import MoreHorizontalIconSvg24 from '../svg/more-horizontal-24.svg?raw';
import MoreHorizontalIconSvg32 from '../svg/more-horizontal-32.svg?raw';
import MoreHorizontalIconSvg40 from '../svg/more-horizontal-40.svg?raw';
import MoreHorizontalIconSvg48 from '../svg/more-horizontal-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const MORE_HORIZONTAL_ICON_SVG_BY_SIZE = {
  16: MoreHorizontalIconSvg16,
  20: MoreHorizontalIconSvg20,
  24: MoreHorizontalIconSvg24,
  32: MoreHorizontalIconSvg32,
  40: MoreHorizontalIconSvg40,
  48: MoreHorizontalIconSvg48,
} as const;

export function MoreHorizontalIcon({ size = 20, className = '' }: IconProps) {
  const svg = MORE_HORIZONTAL_ICON_SVG_BY_SIZE[size] ?? MoreHorizontalIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
