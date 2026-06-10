import Minimize2IconSvg16 from '../svg/minimize-2-16.svg?raw';
import Minimize2IconSvg20 from '../svg/minimize-2-20.svg?raw';
import Minimize2IconSvg24 from '../svg/minimize-2-24.svg?raw';
import Minimize2IconSvg32 from '../svg/minimize-2-32.svg?raw';
import Minimize2IconSvg40 from '../svg/minimize-2-40.svg?raw';
import Minimize2IconSvg48 from '../svg/minimize-2-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const MINIMIZE2ICON_SVG_BY_SIZE = {
  16: Minimize2IconSvg16,
  20: Minimize2IconSvg20,
  24: Minimize2IconSvg24,
  32: Minimize2IconSvg32,
  40: Minimize2IconSvg40,
  48: Minimize2IconSvg48,
} as const;

export function Minimize2Icon({ size = 20, className = '' }: IconProps) {
  const svg = MINIMIZE2ICON_SVG_BY_SIZE[size] ?? Minimize2IconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
