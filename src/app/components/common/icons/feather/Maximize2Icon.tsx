import Maximize2IconSvg16 from '../svg/maximize-2-16.svg?raw';
import Maximize2IconSvg20 from '../svg/maximize-2-20.svg?raw';
import Maximize2IconSvg24 from '../svg/maximize-2-24.svg?raw';
import Maximize2IconSvg32 from '../svg/maximize-2-32.svg?raw';
import Maximize2IconSvg40 from '../svg/maximize-2-40.svg?raw';
import Maximize2IconSvg48 from '../svg/maximize-2-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const MAXIMIZE2ICON_SVG_BY_SIZE = {
  16: Maximize2IconSvg16,
  20: Maximize2IconSvg20,
  24: Maximize2IconSvg24,
  32: Maximize2IconSvg32,
  40: Maximize2IconSvg40,
  48: Maximize2IconSvg48,
} as const;

export function Maximize2Icon({ size = 20, className = '' }: IconProps) {
  const svg = MAXIMIZE2ICON_SVG_BY_SIZE[size] ?? Maximize2IconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
