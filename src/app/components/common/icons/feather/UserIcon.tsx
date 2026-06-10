import UserIconSvg16 from '../svg/user-16.svg?raw';
import UserIconSvg20 from '../svg/user-20.svg?raw';
import UserIconSvg24 from '../svg/user-24.svg?raw';
import UserIconSvg32 from '../svg/user-32.svg?raw';
import UserIconSvg40 from '../svg/user-40.svg?raw';
import UserIconSvg48 from '../svg/user-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const USER_ICON_SVG_BY_SIZE = {
  16: UserIconSvg16,
  20: UserIconSvg20,
  24: UserIconSvg24,
  32: UserIconSvg32,
  40: UserIconSvg40,
  48: UserIconSvg48,
} as const;

export function UserIcon({ size = 20, className = '' }: IconProps) {
  const svg = USER_ICON_SVG_BY_SIZE[size] ?? UserIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
