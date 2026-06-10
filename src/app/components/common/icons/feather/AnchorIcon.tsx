import AnchorIconSvg16 from '../svg/anchor-16.svg?raw';
import AnchorIconSvg20 from '../svg/anchor-20.svg?raw';
import AnchorIconSvg24 from '../svg/anchor-24.svg?raw';
import AnchorIconSvg32 from '../svg/anchor-32.svg?raw';
import AnchorIconSvg40 from '../svg/anchor-40.svg?raw';
import AnchorIconSvg48 from '../svg/anchor-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const ANCHOR_ICON_SVG_BY_SIZE = {
  16: AnchorIconSvg16,
  20: AnchorIconSvg20,
  24: AnchorIconSvg24,
  32: AnchorIconSvg32,
  40: AnchorIconSvg40,
  48: AnchorIconSvg48,
} as const;

export function AnchorIcon({ size = 20, className = '' }: IconProps) {
  const svg = ANCHOR_ICON_SVG_BY_SIZE[size] ?? AnchorIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
