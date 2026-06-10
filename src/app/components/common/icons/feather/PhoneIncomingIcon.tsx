import PhoneIncomingIconSvg16 from '../svg/phone-incoming-16.svg?raw';
import PhoneIncomingIconSvg20 from '../svg/phone-incoming-20.svg?raw';
import PhoneIncomingIconSvg24 from '../svg/phone-incoming-24.svg?raw';
import PhoneIncomingIconSvg32 from '../svg/phone-incoming-32.svg?raw';
import PhoneIncomingIconSvg40 from '../svg/phone-incoming-40.svg?raw';
import PhoneIncomingIconSvg48 from '../svg/phone-incoming-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const PHONE_INCOMING_ICON_SVG_BY_SIZE = {
  16: PhoneIncomingIconSvg16,
  20: PhoneIncomingIconSvg20,
  24: PhoneIncomingIconSvg24,
  32: PhoneIncomingIconSvg32,
  40: PhoneIncomingIconSvg40,
  48: PhoneIncomingIconSvg48,
} as const;

export function PhoneIncomingIcon({ size = 20, className = '' }: IconProps) {
  const svg = PHONE_INCOMING_ICON_SVG_BY_SIZE[size] ?? PhoneIncomingIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
