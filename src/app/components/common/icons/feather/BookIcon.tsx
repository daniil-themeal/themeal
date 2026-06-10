import BookIconSvg16 from '../svg/book-16.svg?raw';
import BookIconSvg20 from '../svg/book-20.svg?raw';
import BookIconSvg24 from '../svg/book-24.svg?raw';
import BookIconSvg32 from '../svg/book-32.svg?raw';
import BookIconSvg40 from '../svg/book-40.svg?raw';
import BookIconSvg48 from '../svg/book-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const BOOK_ICON_SVG_BY_SIZE = {
  16: BookIconSvg16,
  20: BookIconSvg20,
  24: BookIconSvg24,
  32: BookIconSvg32,
  40: BookIconSvg40,
  48: BookIconSvg48,
} as const;

export function BookIcon({ size = 20, className = '' }: IconProps) {
  const svg = BOOK_ICON_SVG_BY_SIZE[size] ?? BookIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
