import ItalicIconSvg16 from '../svg/italic-16.svg?raw';
import ItalicIconSvg20 from '../svg/italic-20.svg?raw';
import ItalicIconSvg24 from '../svg/italic-24.svg?raw';
import ItalicIconSvg32 from '../svg/italic-32.svg?raw';
import ItalicIconSvg40 from '../svg/italic-40.svg?raw';
import ItalicIconSvg48 from '../svg/italic-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const ITALIC_ICON_SVG_BY_SIZE = {
  16: ItalicIconSvg16,
  20: ItalicIconSvg20,
  24: ItalicIconSvg24,
  32: ItalicIconSvg32,
  40: ItalicIconSvg40,
  48: ItalicIconSvg48,
} as const;

export function ItalicIcon({ size = 20, className = '' }: IconProps) {
  const svg = ITALIC_ICON_SVG_BY_SIZE[size] ?? ItalicIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
