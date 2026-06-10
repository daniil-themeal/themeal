import ArchiveIconSvg16 from '../svg/archive-16.svg?raw';
import ArchiveIconSvg20 from '../svg/archive-20.svg?raw';
import ArchiveIconSvg24 from '../svg/archive-24.svg?raw';
import ArchiveIconSvg32 from '../svg/archive-32.svg?raw';
import ArchiveIconSvg40 from '../svg/archive-40.svg?raw';
import ArchiveIconSvg48 from '../svg/archive-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const ARCHIVE_ICON_SVG_BY_SIZE = {
  16: ArchiveIconSvg16,
  20: ArchiveIconSvg20,
  24: ArchiveIconSvg24,
  32: ArchiveIconSvg32,
  40: ArchiveIconSvg40,
  48: ArchiveIconSvg48,
} as const;

export function ArchiveIcon({ size = 20, className = '' }: IconProps) {
  const svg = ARCHIVE_ICON_SVG_BY_SIZE[size] ?? ArchiveIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
