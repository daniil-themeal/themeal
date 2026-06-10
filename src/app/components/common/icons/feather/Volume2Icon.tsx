import Volume2IconSvg16 from '../svg/volume-2-16.svg?raw';
import Volume2IconSvg20 from '../svg/volume-2-20.svg?raw';
import Volume2IconSvg24 from '../svg/volume-2-24.svg?raw';
import Volume2IconSvg32 from '../svg/volume-2-32.svg?raw';
import Volume2IconSvg40 from '../svg/volume-2-40.svg?raw';
import Volume2IconSvg48 from '../svg/volume-2-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const VOLUME2ICON_SVG_BY_SIZE = {
  16: Volume2IconSvg16,
  20: Volume2IconSvg20,
  24: Volume2IconSvg24,
  32: Volume2IconSvg32,
  40: Volume2IconSvg40,
  48: Volume2IconSvg48,
} as const;

export function Volume2Icon({ size = 20, className = '' }: IconProps) {
  const svg = VOLUME2ICON_SVG_BY_SIZE[size] ?? Volume2IconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
