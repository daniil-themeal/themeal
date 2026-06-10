import UnderlineIconSvg16 from '../svg/underline-16.svg?raw';
import UnderlineIconSvg20 from '../svg/underline-20.svg?raw';
import UnderlineIconSvg24 from '../svg/underline-24.svg?raw';
import UnderlineIconSvg32 from '../svg/underline-32.svg?raw';
import UnderlineIconSvg40 from '../svg/underline-40.svg?raw';
import UnderlineIconSvg48 from '../svg/underline-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const UNDERLINE_ICON_SVG_BY_SIZE = {
  16: UnderlineIconSvg16,
  20: UnderlineIconSvg20,
  24: UnderlineIconSvg24,
  32: UnderlineIconSvg32,
  40: UnderlineIconSvg40,
  48: UnderlineIconSvg48,
} as const;

export function UnderlineIcon({ size = 20, className = '' }: IconProps) {
  const svg = UNDERLINE_ICON_SVG_BY_SIZE[size] ?? UnderlineIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
