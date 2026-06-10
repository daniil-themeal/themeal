import FileMinusIconSvg16 from '../svg/file-minus-16.svg?raw';
import FileMinusIconSvg20 from '../svg/file-minus-20.svg?raw';
import FileMinusIconSvg24 from '../svg/file-minus-24.svg?raw';
import FileMinusIconSvg32 from '../svg/file-minus-32.svg?raw';
import FileMinusIconSvg40 from '../svg/file-minus-40.svg?raw';
import FileMinusIconSvg48 from '../svg/file-minus-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const FILE_MINUS_ICON_SVG_BY_SIZE = {
  16: FileMinusIconSvg16,
  20: FileMinusIconSvg20,
  24: FileMinusIconSvg24,
  32: FileMinusIconSvg32,
  40: FileMinusIconSvg40,
  48: FileMinusIconSvg48,
} as const;

export function FileMinusIcon({ size = 20, className = '' }: IconProps) {
  const svg = FILE_MINUS_ICON_SVG_BY_SIZE[size] ?? FileMinusIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
