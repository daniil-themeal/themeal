import LinkIconSvg16 from '../svg/link-16.svg?raw';
import LinkIconSvg20 from '../svg/link-20.svg?raw';
import LinkIconSvg24 from '../svg/link-24.svg?raw';
import LinkIconSvg32 from '../svg/link-32.svg?raw';
import LinkIconSvg40 from '../svg/link-40.svg?raw';
import LinkIconSvg48 from '../svg/link-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const LINK_ICON_SVG_BY_SIZE = {
  16: LinkIconSvg16,
  20: LinkIconSvg20,
  24: LinkIconSvg24,
  32: LinkIconSvg32,
  40: LinkIconSvg40,
  48: LinkIconSvg48,
} as const;

export function LinkIcon({ size = 20, className = '' }: IconProps) {
  const svg = LINK_ICON_SVG_BY_SIZE[size] ?? LinkIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
