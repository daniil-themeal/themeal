import PhoneIconSvg16 from '../svg/phone-16.svg?raw';
import PhoneIconSvg20 from '../svg/phone-20.svg?raw';
import PhoneIconSvg24 from '../svg/phone-24.svg?raw';
import PhoneIconSvg32 from '../svg/phone-32.svg?raw';
import PhoneIconSvg40 from '../svg/phone-40.svg?raw';
import PhoneIconSvg48 from '../svg/phone-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const PHONE_ICON_SVG_BY_SIZE = {
  16: PhoneIconSvg16,
  20: PhoneIconSvg20,
  24: PhoneIconSvg24,
  32: PhoneIconSvg32,
  40: PhoneIconSvg40,
  48: PhoneIconSvg48,
} as const;

export function PhoneIcon({ size = 20, className = '' }: IconProps) {
  const svg = PHONE_ICON_SVG_BY_SIZE[size] ?? PhoneIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
