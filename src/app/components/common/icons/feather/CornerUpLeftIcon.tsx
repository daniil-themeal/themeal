import CornerUpLeftIconSvg16 from '../svg/corner-up-left-16.svg?raw';
import CornerUpLeftIconSvg20 from '../svg/corner-up-left-20.svg?raw';
import CornerUpLeftIconSvg24 from '../svg/corner-up-left-24.svg?raw';
import CornerUpLeftIconSvg32 from '../svg/corner-up-left-32.svg?raw';
import CornerUpLeftIconSvg40 from '../svg/corner-up-left-40.svg?raw';
import CornerUpLeftIconSvg48 from '../svg/corner-up-left-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CORNER_UP_LEFT_ICON_SVG_BY_SIZE = {
  16: CornerUpLeftIconSvg16,
  20: CornerUpLeftIconSvg20,
  24: CornerUpLeftIconSvg24,
  32: CornerUpLeftIconSvg32,
  40: CornerUpLeftIconSvg40,
  48: CornerUpLeftIconSvg48,
} as const;

export function CornerUpLeftIcon({ size = 20, className = '' }: IconProps) {
  const svg = CORNER_UP_LEFT_ICON_SVG_BY_SIZE[size] ?? CornerUpLeftIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
