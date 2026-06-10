import BatteryChargingIconSvg16 from '../svg/battery-charging-16.svg?raw';
import BatteryChargingIconSvg20 from '../svg/battery-charging-20.svg?raw';
import BatteryChargingIconSvg24 from '../svg/battery-charging-24.svg?raw';
import BatteryChargingIconSvg32 from '../svg/battery-charging-32.svg?raw';
import BatteryChargingIconSvg40 from '../svg/battery-charging-40.svg?raw';
import BatteryChargingIconSvg48 from '../svg/battery-charging-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const BATTERY_CHARGING_ICON_SVG_BY_SIZE = {
  16: BatteryChargingIconSvg16,
  20: BatteryChargingIconSvg20,
  24: BatteryChargingIconSvg24,
  32: BatteryChargingIconSvg32,
  40: BatteryChargingIconSvg40,
  48: BatteryChargingIconSvg48,
} as const;

export function BatteryChargingIcon({ size = 20, className = '' }: IconProps) {
  const svg = BATTERY_CHARGING_ICON_SVG_BY_SIZE[size] ?? BatteryChargingIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
