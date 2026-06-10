import AtSignIconSvg16 from '../svg/at-sign-16.svg?raw';
import AtSignIconSvg20 from '../svg/at-sign-20.svg?raw';
import AtSignIconSvg24 from '../svg/at-sign-24.svg?raw';
import AtSignIconSvg32 from '../svg/at-sign-32.svg?raw';
import AtSignIconSvg40 from '../svg/at-sign-40.svg?raw';
import AtSignIconSvg48 from '../svg/at-sign-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const AT_SIGN_ICON_SVG_BY_SIZE = {
  16: AtSignIconSvg16,
  20: AtSignIconSvg20,
  24: AtSignIconSvg24,
  32: AtSignIconSvg32,
  40: AtSignIconSvg40,
  48: AtSignIconSvg48,
} as const;

export function AtSignIcon({ size = 20, className = '' }: IconProps) {
  const svg = AT_SIGN_ICON_SVG_BY_SIZE[size] ?? AtSignIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
