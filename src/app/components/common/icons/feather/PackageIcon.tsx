import PackageIconSvg16 from '../svg/package-16.svg?raw';
import PackageIconSvg20 from '../svg/package-20.svg?raw';
import PackageIconSvg24 from '../svg/package-24.svg?raw';
import PackageIconSvg32 from '../svg/package-32.svg?raw';
import PackageIconSvg40 from '../svg/package-40.svg?raw';
import PackageIconSvg48 from '../svg/package-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const PACKAGE_ICON_SVG_BY_SIZE = {
  16: PackageIconSvg16,
  20: PackageIconSvg20,
  24: PackageIconSvg24,
  32: PackageIconSvg32,
  40: PackageIconSvg40,
  48: PackageIconSvg48,
} as const;

export function PackageIcon({ size = 20, className = '' }: IconProps) {
  const svg = PACKAGE_ICON_SVG_BY_SIZE[size] ?? PackageIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
