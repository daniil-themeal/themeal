import AlignRightIconSvg16 from '../svg/align-right-16.svg?raw';
import AlignRightIconSvg20 from '../svg/align-right-20.svg?raw';
import AlignRightIconSvg24 from '../svg/align-right-24.svg?raw';
import AlignRightIconSvg32 from '../svg/align-right-32.svg?raw';
import AlignRightIconSvg40 from '../svg/align-right-40.svg?raw';
import AlignRightIconSvg48 from '../svg/align-right-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const ALIGN_RIGHT_ICON_SVG_BY_SIZE = {
  16: AlignRightIconSvg16,
  20: AlignRightIconSvg20,
  24: AlignRightIconSvg24,
  32: AlignRightIconSvg32,
  40: AlignRightIconSvg40,
  48: AlignRightIconSvg48,
} as const;

export function AlignRightIcon({ size = 20, className = '' }: IconProps) {
  const svg = ALIGN_RIGHT_ICON_SVG_BY_SIZE[size] ?? AlignRightIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
