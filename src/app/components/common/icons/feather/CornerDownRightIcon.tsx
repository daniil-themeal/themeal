import CornerDownRightIconSvg16 from '../svg/corner-down-right-16.svg?raw';
import CornerDownRightIconSvg20 from '../svg/corner-down-right-20.svg?raw';
import CornerDownRightIconSvg24 from '../svg/corner-down-right-24.svg?raw';
import CornerDownRightIconSvg32 from '../svg/corner-down-right-32.svg?raw';
import CornerDownRightIconSvg40 from '../svg/corner-down-right-40.svg?raw';
import CornerDownRightIconSvg48 from '../svg/corner-down-right-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CORNER_DOWN_RIGHT_ICON_SVG_BY_SIZE = {
  16: CornerDownRightIconSvg16,
  20: CornerDownRightIconSvg20,
  24: CornerDownRightIconSvg24,
  32: CornerDownRightIconSvg32,
  40: CornerDownRightIconSvg40,
  48: CornerDownRightIconSvg48,
} as const;

export function CornerDownRightIcon({ size = 20, className = '' }: IconProps) {
  const svg = CORNER_DOWN_RIGHT_ICON_SVG_BY_SIZE[size] ?? CornerDownRightIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
