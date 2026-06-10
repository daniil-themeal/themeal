import SmartphoneIconSvg16 from '../svg/smartphone-16.svg?raw';
import SmartphoneIconSvg20 from '../svg/smartphone-20.svg?raw';
import SmartphoneIconSvg24 from '../svg/smartphone-24.svg?raw';
import SmartphoneIconSvg32 from '../svg/smartphone-32.svg?raw';
import SmartphoneIconSvg40 from '../svg/smartphone-40.svg?raw';
import SmartphoneIconSvg48 from '../svg/smartphone-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const SMARTPHONE_ICON_SVG_BY_SIZE = {
  16: SmartphoneIconSvg16,
  20: SmartphoneIconSvg20,
  24: SmartphoneIconSvg24,
  32: SmartphoneIconSvg32,
  40: SmartphoneIconSvg40,
  48: SmartphoneIconSvg48,
} as const;

export function SmartphoneIcon({ size = 20, className = '' }: IconProps) {
  const svg = SMARTPHONE_ICON_SVG_BY_SIZE[size] ?? SmartphoneIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
