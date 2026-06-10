import FilePlusIconSvg16 from '../svg/file-plus-16.svg?raw';
import FilePlusIconSvg20 from '../svg/file-plus-20.svg?raw';
import FilePlusIconSvg24 from '../svg/file-plus-24.svg?raw';
import FilePlusIconSvg32 from '../svg/file-plus-32.svg?raw';
import FilePlusIconSvg40 from '../svg/file-plus-40.svg?raw';
import FilePlusIconSvg48 from '../svg/file-plus-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const FILE_PLUS_ICON_SVG_BY_SIZE = {
  16: FilePlusIconSvg16,
  20: FilePlusIconSvg20,
  24: FilePlusIconSvg24,
  32: FilePlusIconSvg32,
  40: FilePlusIconSvg40,
  48: FilePlusIconSvg48,
} as const;

export function FilePlusIcon({ size = 20, className = '' }: IconProps) {
  const svg = FILE_PLUS_ICON_SVG_BY_SIZE[size] ?? FilePlusIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
