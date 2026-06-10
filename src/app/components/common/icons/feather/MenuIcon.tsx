import MenuIconSvg16 from '../svg/menu-16.svg?raw';
import MenuIconSvg20 from '../svg/menu-20.svg?raw';
import MenuIconSvg24 from '../svg/menu-24.svg?raw';
import MenuIconSvg32 from '../svg/menu-32.svg?raw';
import MenuIconSvg40 from '../svg/menu-40.svg?raw';
import MenuIconSvg48 from '../svg/menu-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const MENU_ICON_SVG_BY_SIZE = {
  16: MenuIconSvg16,
  20: MenuIconSvg20,
  24: MenuIconSvg24,
  32: MenuIconSvg32,
  40: MenuIconSvg40,
  48: MenuIconSvg48,
} as const;

export function MenuIcon({ size = 20, className = '' }: IconProps) {
  const svg = MENU_ICON_SVG_BY_SIZE[size] ?? MenuIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
