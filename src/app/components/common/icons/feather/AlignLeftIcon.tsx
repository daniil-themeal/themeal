import AlignLeftIconSvg16 from '../svg/align-left-16.svg?raw';
import AlignLeftIconSvg20 from '../svg/align-left-20.svg?raw';
import AlignLeftIconSvg24 from '../svg/align-left-24.svg?raw';
import AlignLeftIconSvg32 from '../svg/align-left-32.svg?raw';
import AlignLeftIconSvg40 from '../svg/align-left-40.svg?raw';
import AlignLeftIconSvg48 from '../svg/align-left-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const ALIGN_LEFT_ICON_SVG_BY_SIZE = {
  16: AlignLeftIconSvg16,
  20: AlignLeftIconSvg20,
  24: AlignLeftIconSvg24,
  32: AlignLeftIconSvg32,
  40: AlignLeftIconSvg40,
  48: AlignLeftIconSvg48,
} as const;

export function AlignLeftIcon({ size = 20, className = '' }: IconProps) {
  const svg = ALIGN_LEFT_ICON_SVG_BY_SIZE[size] ?? AlignLeftIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
