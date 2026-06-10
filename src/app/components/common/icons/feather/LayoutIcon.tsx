import LayoutIconSvg16 from '../svg/layout-16.svg?raw';
import LayoutIconSvg20 from '../svg/layout-20.svg?raw';
import LayoutIconSvg24 from '../svg/layout-24.svg?raw';
import LayoutIconSvg32 from '../svg/layout-32.svg?raw';
import LayoutIconSvg40 from '../svg/layout-40.svg?raw';
import LayoutIconSvg48 from '../svg/layout-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const LAYOUT_ICON_SVG_BY_SIZE = {
  16: LayoutIconSvg16,
  20: LayoutIconSvg20,
  24: LayoutIconSvg24,
  32: LayoutIconSvg32,
  40: LayoutIconSvg40,
  48: LayoutIconSvg48,
} as const;

export function LayoutIcon({ size = 20, className = '' }: IconProps) {
  const svg = LAYOUT_ICON_SVG_BY_SIZE[size] ?? LayoutIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
