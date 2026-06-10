import Volume1IconSvg16 from '../svg/volume-1-16.svg?raw';
import Volume1IconSvg20 from '../svg/volume-1-20.svg?raw';
import Volume1IconSvg24 from '../svg/volume-1-24.svg?raw';
import Volume1IconSvg32 from '../svg/volume-1-32.svg?raw';
import Volume1IconSvg40 from '../svg/volume-1-40.svg?raw';
import Volume1IconSvg48 from '../svg/volume-1-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const VOLUME1ICON_SVG_BY_SIZE = {
  16: Volume1IconSvg16,
  20: Volume1IconSvg20,
  24: Volume1IconSvg24,
  32: Volume1IconSvg32,
  40: Volume1IconSvg40,
  48: Volume1IconSvg48,
} as const;

export function Volume1Icon({ size = 20, className = '' }: IconProps) {
  const svg = VOLUME1ICON_SVG_BY_SIZE[size] ?? Volume1IconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
