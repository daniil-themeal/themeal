import UserCheckIconSvg16 from '../svg/user-check-16.svg?raw';
import UserCheckIconSvg20 from '../svg/user-check-20.svg?raw';
import UserCheckIconSvg24 from '../svg/user-check-24.svg?raw';
import UserCheckIconSvg32 from '../svg/user-check-32.svg?raw';
import UserCheckIconSvg40 from '../svg/user-check-40.svg?raw';
import UserCheckIconSvg48 from '../svg/user-check-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const USER_CHECK_ICON_SVG_BY_SIZE = {
  16: UserCheckIconSvg16,
  20: UserCheckIconSvg20,
  24: UserCheckIconSvg24,
  32: UserCheckIconSvg32,
  40: UserCheckIconSvg40,
  48: UserCheckIconSvg48,
} as const;

export function UserCheckIcon({ size = 20, className = '' }: IconProps) {
  const svg = USER_CHECK_ICON_SVG_BY_SIZE[size] ?? UserCheckIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
