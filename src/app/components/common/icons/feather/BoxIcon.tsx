import BoxIconSvg16 from '../svg/box-16.svg?raw';
import BoxIconSvg20 from '../svg/box-20.svg?raw';
import BoxIconSvg24 from '../svg/box-24.svg?raw';
import BoxIconSvg32 from '../svg/box-32.svg?raw';
import BoxIconSvg40 from '../svg/box-40.svg?raw';
import BoxIconSvg48 from '../svg/box-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const BOX_ICON_SVG_BY_SIZE = {
  16: BoxIconSvg16,
  20: BoxIconSvg20,
  24: BoxIconSvg24,
  32: BoxIconSvg32,
  40: BoxIconSvg40,
  48: BoxIconSvg48,
} as const;

export function BoxIcon({ size = 20, className = '' }: IconProps) {
  const svg = BOX_ICON_SVG_BY_SIZE[size] ?? BoxIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
