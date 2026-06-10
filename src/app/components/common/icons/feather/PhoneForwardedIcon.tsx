import PhoneForwardedIconSvg16 from '../svg/phone-forwarded-16.svg?raw';
import PhoneForwardedIconSvg20 from '../svg/phone-forwarded-20.svg?raw';
import PhoneForwardedIconSvg24 from '../svg/phone-forwarded-24.svg?raw';
import PhoneForwardedIconSvg32 from '../svg/phone-forwarded-32.svg?raw';
import PhoneForwardedIconSvg40 from '../svg/phone-forwarded-40.svg?raw';
import PhoneForwardedIconSvg48 from '../svg/phone-forwarded-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const PHONE_FORWARDED_ICON_SVG_BY_SIZE = {
  16: PhoneForwardedIconSvg16,
  20: PhoneForwardedIconSvg20,
  24: PhoneForwardedIconSvg24,
  32: PhoneForwardedIconSvg32,
  40: PhoneForwardedIconSvg40,
  48: PhoneForwardedIconSvg48,
} as const;

export function PhoneForwardedIcon({ size = 20, className = '' }: IconProps) {
  const svg = PHONE_FORWARDED_ICON_SVG_BY_SIZE[size] ?? PhoneForwardedIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
