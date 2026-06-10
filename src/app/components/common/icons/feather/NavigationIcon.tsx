import NavigationIconSvg16 from '../svg/navigation-16.svg?raw';
import NavigationIconSvg20 from '../svg/navigation-20.svg?raw';
import NavigationIconSvg24 from '../svg/navigation-24.svg?raw';
import NavigationIconSvg32 from '../svg/navigation-32.svg?raw';
import NavigationIconSvg40 from '../svg/navigation-40.svg?raw';
import NavigationIconSvg48 from '../svg/navigation-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const NAVIGATION_ICON_SVG_BY_SIZE = {
  16: NavigationIconSvg16,
  20: NavigationIconSvg20,
  24: NavigationIconSvg24,
  32: NavigationIconSvg32,
  40: NavigationIconSvg40,
  48: NavigationIconSvg48,
} as const;

export function NavigationIcon({ size = 20, className = '' }: IconProps) {
  const svg = NAVIGATION_ICON_SVG_BY_SIZE[size] ?? NavigationIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
