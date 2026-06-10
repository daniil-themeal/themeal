import BatteryIconSvg16 from '../svg/battery-16.svg?raw';
import BatteryIconSvg20 from '../svg/battery-20.svg?raw';
import BatteryIconSvg24 from '../svg/battery-24.svg?raw';
import BatteryIconSvg32 from '../svg/battery-32.svg?raw';
import BatteryIconSvg40 from '../svg/battery-40.svg?raw';
import BatteryIconSvg48 from '../svg/battery-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const BATTERY_ICON_SVG_BY_SIZE = {
  16: BatteryIconSvg16,
  20: BatteryIconSvg20,
  24: BatteryIconSvg24,
  32: BatteryIconSvg32,
  40: BatteryIconSvg40,
  48: BatteryIconSvg48,
} as const;

export function BatteryIcon({ size = 20, className = '' }: IconProps) {
  const svg = BATTERY_ICON_SVG_BY_SIZE[size] ?? BatteryIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
