import FacebookIconSvg16 from '../svg/facebook-16.svg?raw';
import FacebookIconSvg20 from '../svg/facebook-20.svg?raw';
import FacebookIconSvg24 from '../svg/facebook-24.svg?raw';
import FacebookIconSvg32 from '../svg/facebook-32.svg?raw';
import FacebookIconSvg40 from '../svg/facebook-40.svg?raw';
import FacebookIconSvg48 from '../svg/facebook-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const FACEBOOK_ICON_SVG_BY_SIZE = {
  16: FacebookIconSvg16,
  20: FacebookIconSvg20,
  24: FacebookIconSvg24,
  32: FacebookIconSvg32,
  40: FacebookIconSvg40,
  48: FacebookIconSvg48,
} as const;

export function FacebookIcon({ size = 20, className = '' }: IconProps) {
  const svg = FACEBOOK_ICON_SVG_BY_SIZE[size] ?? FacebookIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
