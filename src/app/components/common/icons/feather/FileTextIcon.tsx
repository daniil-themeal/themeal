import FileTextIconSvg16 from '../svg/file-text-16.svg?raw';
import FileTextIconSvg20 from '../svg/file-text-20.svg?raw';
import FileTextIconSvg24 from '../svg/file-text-24.svg?raw';
import FileTextIconSvg32 from '../svg/file-text-32.svg?raw';
import FileTextIconSvg40 from '../svg/file-text-40.svg?raw';
import FileTextIconSvg48 from '../svg/file-text-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const FILE_TEXT_ICON_SVG_BY_SIZE = {
  16: FileTextIconSvg16,
  20: FileTextIconSvg20,
  24: FileTextIconSvg24,
  32: FileTextIconSvg32,
  40: FileTextIconSvg40,
  48: FileTextIconSvg48,
} as const;

export function FileTextIcon({ size = 20, className = '' }: IconProps) {
  const svg = FILE_TEXT_ICON_SVG_BY_SIZE[size] ?? FileTextIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
