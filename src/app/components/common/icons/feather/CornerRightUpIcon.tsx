import CornerRightUpIconSvg16 from '../svg/corner-right-up-16.svg?raw';
import CornerRightUpIconSvg20 from '../svg/corner-right-up-20.svg?raw';
import CornerRightUpIconSvg24 from '../svg/corner-right-up-24.svg?raw';
import CornerRightUpIconSvg32 from '../svg/corner-right-up-32.svg?raw';
import CornerRightUpIconSvg40 from '../svg/corner-right-up-40.svg?raw';
import CornerRightUpIconSvg48 from '../svg/corner-right-up-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CORNER_RIGHT_UP_ICON_SVG_BY_SIZE = {
  16: CornerRightUpIconSvg16,
  20: CornerRightUpIconSvg20,
  24: CornerRightUpIconSvg24,
  32: CornerRightUpIconSvg32,
  40: CornerRightUpIconSvg40,
  48: CornerRightUpIconSvg48,
} as const;

export function CornerRightUpIcon({ size = 20, className = '' }: IconProps) {
  const svg = CORNER_RIGHT_UP_ICON_SVG_BY_SIZE[size] ?? CornerRightUpIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
