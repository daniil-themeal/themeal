import PhoneOffIconSvg16 from '../svg/phone-off-16.svg?raw';
import PhoneOffIconSvg20 from '../svg/phone-off-20.svg?raw';
import PhoneOffIconSvg24 from '../svg/phone-off-24.svg?raw';
import PhoneOffIconSvg32 from '../svg/phone-off-32.svg?raw';
import PhoneOffIconSvg40 from '../svg/phone-off-40.svg?raw';
import PhoneOffIconSvg48 from '../svg/phone-off-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const PHONE_OFF_ICON_SVG_BY_SIZE = {
  16: PhoneOffIconSvg16,
  20: PhoneOffIconSvg20,
  24: PhoneOffIconSvg24,
  32: PhoneOffIconSvg32,
  40: PhoneOffIconSvg40,
  48: PhoneOffIconSvg48,
} as const;

export function PhoneOffIcon({ size = 20, className = '' }: IconProps) {
  const svg = PHONE_OFF_ICON_SVG_BY_SIZE[size] ?? PhoneOffIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
