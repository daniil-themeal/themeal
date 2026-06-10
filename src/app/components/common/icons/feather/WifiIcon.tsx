import WifiIconSvg16 from '../svg/wifi-16.svg?raw';
import WifiIconSvg20 from '../svg/wifi-20.svg?raw';
import WifiIconSvg24 from '../svg/wifi-24.svg?raw';
import WifiIconSvg32 from '../svg/wifi-32.svg?raw';
import WifiIconSvg40 from '../svg/wifi-40.svg?raw';
import WifiIconSvg48 from '../svg/wifi-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const WIFI_ICON_SVG_BY_SIZE = {
  16: WifiIconSvg16,
  20: WifiIconSvg20,
  24: WifiIconSvg24,
  32: WifiIconSvg32,
  40: WifiIconSvg40,
  48: WifiIconSvg48,
} as const;

export function WifiIcon({ size = 20, className = '' }: IconProps) {
  const svg = WIFI_ICON_SVG_BY_SIZE[size] ?? WifiIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
