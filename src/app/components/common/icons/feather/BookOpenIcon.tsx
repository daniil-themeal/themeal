import BookOpenIconSvg16 from '../svg/book-open-16.svg?raw';
import BookOpenIconSvg20 from '../svg/book-open-20.svg?raw';
import BookOpenIconSvg24 from '../svg/book-open-24.svg?raw';
import BookOpenIconSvg32 from '../svg/book-open-32.svg?raw';
import BookOpenIconSvg40 from '../svg/book-open-40.svg?raw';
import BookOpenIconSvg48 from '../svg/book-open-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const BOOK_OPEN_ICON_SVG_BY_SIZE = {
  16: BookOpenIconSvg16,
  20: BookOpenIconSvg20,
  24: BookOpenIconSvg24,
  32: BookOpenIconSvg32,
  40: BookOpenIconSvg40,
  48: BookOpenIconSvg48,
} as const;

export function BookOpenIcon({ size = 20, className = '' }: IconProps) {
  const svg = BOOK_OPEN_ICON_SVG_BY_SIZE[size] ?? BookOpenIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
