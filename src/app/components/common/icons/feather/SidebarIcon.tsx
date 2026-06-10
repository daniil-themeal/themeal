import SidebarIconSvg16 from '../svg/sidebar-16.svg?raw';
import SidebarIconSvg20 from '../svg/sidebar-20.svg?raw';
import SidebarIconSvg24 from '../svg/sidebar-24.svg?raw';
import SidebarIconSvg32 from '../svg/sidebar-32.svg?raw';
import SidebarIconSvg40 from '../svg/sidebar-40.svg?raw';
import SidebarIconSvg48 from '../svg/sidebar-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const SIDEBAR_ICON_SVG_BY_SIZE = {
  16: SidebarIconSvg16,
  20: SidebarIconSvg20,
  24: SidebarIconSvg24,
  32: SidebarIconSvg32,
  40: SidebarIconSvg40,
  48: SidebarIconSvg48,
} as const;

export function SidebarIcon({ size = 20, className = '' }: IconProps) {
  const svg = SIDEBAR_ICON_SVG_BY_SIZE[size] ?? SidebarIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
