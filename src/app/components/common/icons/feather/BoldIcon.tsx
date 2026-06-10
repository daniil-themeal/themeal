import BoldIconSvg16 from '../svg/bold-16.svg?raw';
import BoldIconSvg20 from '../svg/bold-20.svg?raw';
import BoldIconSvg24 from '../svg/bold-24.svg?raw';
import BoldIconSvg32 from '../svg/bold-32.svg?raw';
import BoldIconSvg40 from '../svg/bold-40.svg?raw';
import BoldIconSvg48 from '../svg/bold-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const BOLD_ICON_SVG_BY_SIZE = {
  16: BoldIconSvg16,
  20: BoldIconSvg20,
  24: BoldIconSvg24,
  32: BoldIconSvg32,
  40: BoldIconSvg40,
  48: BoldIconSvg48,
} as const;

export function BoldIcon({ size = 20, className = '' }: IconProps) {
  const svg = BOLD_ICON_SVG_BY_SIZE[size] ?? BoldIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
