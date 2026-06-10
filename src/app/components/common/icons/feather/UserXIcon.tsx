import UserXIconSvg16 from '../svg/user-x-16.svg?raw';
import UserXIconSvg20 from '../svg/user-x-20.svg?raw';
import UserXIconSvg24 from '../svg/user-x-24.svg?raw';
import UserXIconSvg32 from '../svg/user-x-32.svg?raw';
import UserXIconSvg40 from '../svg/user-x-40.svg?raw';
import UserXIconSvg48 from '../svg/user-x-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const USER_XICON_SVG_BY_SIZE = {
  16: UserXIconSvg16,
  20: UserXIconSvg20,
  24: UserXIconSvg24,
  32: UserXIconSvg32,
  40: UserXIconSvg40,
  48: UserXIconSvg48,
} as const;

export function UserXIcon({ size = 20, className = '' }: IconProps) {
  const svg = USER_XICON_SVG_BY_SIZE[size] ?? UserXIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
