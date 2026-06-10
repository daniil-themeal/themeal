import CornerRightDownIconSvg16 from '../svg/corner-right-down-16.svg?raw';
import CornerRightDownIconSvg20 from '../svg/corner-right-down-20.svg?raw';
import CornerRightDownIconSvg24 from '../svg/corner-right-down-24.svg?raw';
import CornerRightDownIconSvg32 from '../svg/corner-right-down-32.svg?raw';
import CornerRightDownIconSvg40 from '../svg/corner-right-down-40.svg?raw';
import CornerRightDownIconSvg48 from '../svg/corner-right-down-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CORNER_RIGHT_DOWN_ICON_SVG_BY_SIZE = {
  16: CornerRightDownIconSvg16,
  20: CornerRightDownIconSvg20,
  24: CornerRightDownIconSvg24,
  32: CornerRightDownIconSvg32,
  40: CornerRightDownIconSvg40,
  48: CornerRightDownIconSvg48,
} as const;

export function CornerRightDownIcon({ size = 20, className = '' }: IconProps) {
  const svg = CORNER_RIGHT_DOWN_ICON_SVG_BY_SIZE[size] ?? CornerRightDownIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
