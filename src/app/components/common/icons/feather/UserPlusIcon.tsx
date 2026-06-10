import UserPlusIconSvg16 from '../svg/user-plus-16.svg?raw';
import UserPlusIconSvg20 from '../svg/user-plus-20.svg?raw';
import UserPlusIconSvg24 from '../svg/user-plus-24.svg?raw';
import UserPlusIconSvg32 from '../svg/user-plus-32.svg?raw';
import UserPlusIconSvg40 from '../svg/user-plus-40.svg?raw';
import UserPlusIconSvg48 from '../svg/user-plus-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const USER_PLUS_ICON_SVG_BY_SIZE = {
  16: UserPlusIconSvg16,
  20: UserPlusIconSvg20,
  24: UserPlusIconSvg24,
  32: UserPlusIconSvg32,
  40: UserPlusIconSvg40,
  48: UserPlusIconSvg48,
} as const;

export function UserPlusIcon({ size = 20, className = '' }: IconProps) {
  const svg = USER_PLUS_ICON_SVG_BY_SIZE[size] ?? UserPlusIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
