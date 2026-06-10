import UsersIconSvg16 from '../svg/users-16.svg?raw';
import UsersIconSvg20 from '../svg/users-20.svg?raw';
import UsersIconSvg24 from '../svg/users-24.svg?raw';
import UsersIconSvg32 from '../svg/users-32.svg?raw';
import UsersIconSvg40 from '../svg/users-40.svg?raw';
import UsersIconSvg48 from '../svg/users-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const USERS_ICON_SVG_BY_SIZE = {
  16: UsersIconSvg16,
  20: UsersIconSvg20,
  24: UsersIconSvg24,
  32: UsersIconSvg32,
  40: UsersIconSvg40,
  48: UsersIconSvg48,
} as const;

export function UsersIcon({ size = 20, className = '' }: IconProps) {
  const svg = USERS_ICON_SVG_BY_SIZE[size] ?? UsersIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
