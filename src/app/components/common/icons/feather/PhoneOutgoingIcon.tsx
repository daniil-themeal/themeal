import PhoneOutgoingIconSvg16 from '../svg/phone-outgoing-16.svg?raw';
import PhoneOutgoingIconSvg20 from '../svg/phone-outgoing-20.svg?raw';
import PhoneOutgoingIconSvg24 from '../svg/phone-outgoing-24.svg?raw';
import PhoneOutgoingIconSvg32 from '../svg/phone-outgoing-32.svg?raw';
import PhoneOutgoingIconSvg40 from '../svg/phone-outgoing-40.svg?raw';
import PhoneOutgoingIconSvg48 from '../svg/phone-outgoing-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const PHONE_OUTGOING_ICON_SVG_BY_SIZE = {
  16: PhoneOutgoingIconSvg16,
  20: PhoneOutgoingIconSvg20,
  24: PhoneOutgoingIconSvg24,
  32: PhoneOutgoingIconSvg32,
  40: PhoneOutgoingIconSvg40,
  48: PhoneOutgoingIconSvg48,
} as const;

export function PhoneOutgoingIcon({ size = 20, className = '' }: IconProps) {
  const svg = PHONE_OUTGOING_ICON_SVG_BY_SIZE[size] ?? PhoneOutgoingIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
