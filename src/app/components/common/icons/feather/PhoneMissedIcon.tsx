import PhoneMissedIconSvg16 from '../svg/phone-missed-16.svg?raw';
import PhoneMissedIconSvg20 from '../svg/phone-missed-20.svg?raw';
import PhoneMissedIconSvg24 from '../svg/phone-missed-24.svg?raw';
import PhoneMissedIconSvg32 from '../svg/phone-missed-32.svg?raw';
import PhoneMissedIconSvg40 from '../svg/phone-missed-40.svg?raw';
import PhoneMissedIconSvg48 from '../svg/phone-missed-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const PHONE_MISSED_ICON_SVG_BY_SIZE = {
  16: PhoneMissedIconSvg16,
  20: PhoneMissedIconSvg20,
  24: PhoneMissedIconSvg24,
  32: PhoneMissedIconSvg32,
  40: PhoneMissedIconSvg40,
  48: PhoneMissedIconSvg48,
} as const;

export function PhoneMissedIcon({ size = 20, className = '' }: IconProps) {
  const svg = PHONE_MISSED_ICON_SVG_BY_SIZE[size] ?? PhoneMissedIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
