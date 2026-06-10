import CornerDownLeftIconSvg16 from '../svg/corner-down-left-16.svg?raw';
import CornerDownLeftIconSvg20 from '../svg/corner-down-left-20.svg?raw';
import CornerDownLeftIconSvg24 from '../svg/corner-down-left-24.svg?raw';
import CornerDownLeftIconSvg32 from '../svg/corner-down-left-32.svg?raw';
import CornerDownLeftIconSvg40 from '../svg/corner-down-left-40.svg?raw';
import CornerDownLeftIconSvg48 from '../svg/corner-down-left-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CORNER_DOWN_LEFT_ICON_SVG_BY_SIZE = {
  16: CornerDownLeftIconSvg16,
  20: CornerDownLeftIconSvg20,
  24: CornerDownLeftIconSvg24,
  32: CornerDownLeftIconSvg32,
  40: CornerDownLeftIconSvg40,
  48: CornerDownLeftIconSvg48,
} as const;

export function CornerDownLeftIcon({ size = 20, className = '' }: IconProps) {
  const svg = CORNER_DOWN_LEFT_ICON_SVG_BY_SIZE[size] ?? CornerDownLeftIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
