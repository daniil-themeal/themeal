import UserMinusIconSvg16 from '../svg/user-minus-16.svg?raw';
import UserMinusIconSvg20 from '../svg/user-minus-20.svg?raw';
import UserMinusIconSvg24 from '../svg/user-minus-24.svg?raw';
import UserMinusIconSvg32 from '../svg/user-minus-32.svg?raw';
import UserMinusIconSvg40 from '../svg/user-minus-40.svg?raw';
import UserMinusIconSvg48 from '../svg/user-minus-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const USER_MINUS_ICON_SVG_BY_SIZE = {
  16: UserMinusIconSvg16,
  20: UserMinusIconSvg20,
  24: UserMinusIconSvg24,
  32: UserMinusIconSvg32,
  40: UserMinusIconSvg40,
  48: UserMinusIconSvg48,
} as const;

export function UserMinusIcon({ size = 20, className = '' }: IconProps) {
  const svg = USER_MINUS_ICON_SVG_BY_SIZE[size] ?? UserMinusIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
