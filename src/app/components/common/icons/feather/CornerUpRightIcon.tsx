import CornerUpRightIconSvg16 from '../svg/corner-up-right-16.svg?raw';
import CornerUpRightIconSvg20 from '../svg/corner-up-right-20.svg?raw';
import CornerUpRightIconSvg24 from '../svg/corner-up-right-24.svg?raw';
import CornerUpRightIconSvg32 from '../svg/corner-up-right-32.svg?raw';
import CornerUpRightIconSvg40 from '../svg/corner-up-right-40.svg?raw';
import CornerUpRightIconSvg48 from '../svg/corner-up-right-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CORNER_UP_RIGHT_ICON_SVG_BY_SIZE = {
  16: CornerUpRightIconSvg16,
  20: CornerUpRightIconSvg20,
  24: CornerUpRightIconSvg24,
  32: CornerUpRightIconSvg32,
  40: CornerUpRightIconSvg40,
  48: CornerUpRightIconSvg48,
} as const;

export function CornerUpRightIcon({ size = 20, className = '' }: IconProps) {
  const svg = CORNER_UP_RIGHT_ICON_SVG_BY_SIZE[size] ?? CornerUpRightIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
