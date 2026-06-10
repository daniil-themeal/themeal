import ThermometerIconSvg16 from '../svg/thermometer-16.svg?raw';
import ThermometerIconSvg20 from '../svg/thermometer-20.svg?raw';
import ThermometerIconSvg24 from '../svg/thermometer-24.svg?raw';
import ThermometerIconSvg32 from '../svg/thermometer-32.svg?raw';
import ThermometerIconSvg40 from '../svg/thermometer-40.svg?raw';
import ThermometerIconSvg48 from '../svg/thermometer-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const THERMOMETER_ICON_SVG_BY_SIZE = {
  16: ThermometerIconSvg16,
  20: ThermometerIconSvg20,
  24: ThermometerIconSvg24,
  32: ThermometerIconSvg32,
  40: ThermometerIconSvg40,
  48: ThermometerIconSvg48,
} as const;

export function ThermometerIcon({ size = 20, className = '' }: IconProps) {
  const svg = THERMOMETER_ICON_SVG_BY_SIZE[size] ?? ThermometerIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
