import WifiOffIconSvg16 from '../svg/wifi-off-16.svg?raw';
import WifiOffIconSvg20 from '../svg/wifi-off-20.svg?raw';
import WifiOffIconSvg24 from '../svg/wifi-off-24.svg?raw';
import WifiOffIconSvg32 from '../svg/wifi-off-32.svg?raw';
import WifiOffIconSvg40 from '../svg/wifi-off-40.svg?raw';
import WifiOffIconSvg48 from '../svg/wifi-off-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const WIFI_OFF_ICON_SVG_BY_SIZE = {
  16: WifiOffIconSvg16,
  20: WifiOffIconSvg20,
  24: WifiOffIconSvg24,
  32: WifiOffIconSvg32,
  40: WifiOffIconSvg40,
  48: WifiOffIconSvg48,
} as const;

export function WifiOffIcon({ size = 20, className = '' }: IconProps) {
  const svg = WIFI_OFF_ICON_SVG_BY_SIZE[size] ?? WifiOffIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
