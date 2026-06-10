import HardDriveIconSvg16 from '../svg/hard-drive-16.svg?raw';
import HardDriveIconSvg20 from '../svg/hard-drive-20.svg?raw';
import HardDriveIconSvg24 from '../svg/hard-drive-24.svg?raw';
import HardDriveIconSvg32 from '../svg/hard-drive-32.svg?raw';
import HardDriveIconSvg40 from '../svg/hard-drive-40.svg?raw';
import HardDriveIconSvg48 from '../svg/hard-drive-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const HARD_DRIVE_ICON_SVG_BY_SIZE = {
  16: HardDriveIconSvg16,
  20: HardDriveIconSvg20,
  24: HardDriveIconSvg24,
  32: HardDriveIconSvg32,
  40: HardDriveIconSvg40,
  48: HardDriveIconSvg48,
} as const;

export function HardDriveIcon({ size = 20, className = '' }: IconProps) {
  const svg = HARD_DRIVE_ICON_SVG_BY_SIZE[size] ?? HardDriveIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
