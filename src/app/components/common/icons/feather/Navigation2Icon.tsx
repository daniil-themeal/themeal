import Navigation2IconSvg16 from '../svg/navigation-2-16.svg?raw';
import Navigation2IconSvg20 from '../svg/navigation-2-20.svg?raw';
import Navigation2IconSvg24 from '../svg/navigation-2-24.svg?raw';
import Navigation2IconSvg32 from '../svg/navigation-2-32.svg?raw';
import Navigation2IconSvg40 from '../svg/navigation-2-40.svg?raw';
import Navigation2IconSvg48 from '../svg/navigation-2-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const NAVIGATION2ICON_SVG_BY_SIZE = {
  16: Navigation2IconSvg16,
  20: Navigation2IconSvg20,
  24: Navigation2IconSvg24,
  32: Navigation2IconSvg32,
  40: Navigation2IconSvg40,
  48: Navigation2IconSvg48,
} as const;

export function Navigation2Icon({ size = 20, className = '' }: IconProps) {
  const svg = NAVIGATION2ICON_SVG_BY_SIZE[size] ?? Navigation2IconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
