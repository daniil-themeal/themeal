import BluetoothIconSvg16 from '../svg/bluetooth-16.svg?raw';
import BluetoothIconSvg20 from '../svg/bluetooth-20.svg?raw';
import BluetoothIconSvg24 from '../svg/bluetooth-24.svg?raw';
import BluetoothIconSvg32 from '../svg/bluetooth-32.svg?raw';
import BluetoothIconSvg40 from '../svg/bluetooth-40.svg?raw';
import BluetoothIconSvg48 from '../svg/bluetooth-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const BLUETOOTH_ICON_SVG_BY_SIZE = {
  16: BluetoothIconSvg16,
  20: BluetoothIconSvg20,
  24: BluetoothIconSvg24,
  32: BluetoothIconSvg32,
  40: BluetoothIconSvg40,
  48: BluetoothIconSvg48,
} as const;

export function BluetoothIcon({ size = 20, className = '' }: IconProps) {
  const svg = BLUETOOTH_ICON_SVG_BY_SIZE[size] ?? BluetoothIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
