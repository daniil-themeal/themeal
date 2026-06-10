import PhoneCallIconSvg16 from '../svg/phone-call-16.svg?raw';
import PhoneCallIconSvg20 from '../svg/phone-call-20.svg?raw';
import PhoneCallIconSvg24 from '../svg/phone-call-24.svg?raw';
import PhoneCallIconSvg32 from '../svg/phone-call-32.svg?raw';
import PhoneCallIconSvg40 from '../svg/phone-call-40.svg?raw';
import PhoneCallIconSvg48 from '../svg/phone-call-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const PHONE_CALL_ICON_SVG_BY_SIZE = {
  16: PhoneCallIconSvg16,
  20: PhoneCallIconSvg20,
  24: PhoneCallIconSvg24,
  32: PhoneCallIconSvg32,
  40: PhoneCallIconSvg40,
  48: PhoneCallIconSvg48,
} as const;

export function PhoneCallIcon({ size = 20, className = '' }: IconProps) {
  const svg = PHONE_CALL_ICON_SVG_BY_SIZE[size] ?? PhoneCallIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
