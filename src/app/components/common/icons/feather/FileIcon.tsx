import FileIconSvg16 from '../svg/file-16.svg?raw';
import FileIconSvg20 from '../svg/file-20.svg?raw';
import FileIconSvg24 from '../svg/file-24.svg?raw';
import FileIconSvg32 from '../svg/file-32.svg?raw';
import FileIconSvg40 from '../svg/file-40.svg?raw';
import FileIconSvg48 from '../svg/file-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const FILE_ICON_SVG_BY_SIZE = {
  16: FileIconSvg16,
  20: FileIconSvg20,
  24: FileIconSvg24,
  32: FileIconSvg32,
  40: FileIconSvg40,
  48: FileIconSvg48,
} as const;

export function FileIcon({ size = 20, className = '' }: IconProps) {
  const svg = FILE_ICON_SVG_BY_SIZE[size] ?? FileIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
