import CropIconSvg16 from '../svg/crop-16.svg?raw';
import CropIconSvg20 from '../svg/crop-20.svg?raw';
import CropIconSvg24 from '../svg/crop-24.svg?raw';
import CropIconSvg32 from '../svg/crop-32.svg?raw';
import CropIconSvg40 from '../svg/crop-40.svg?raw';
import CropIconSvg48 from '../svg/crop-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CROP_ICON_SVG_BY_SIZE = {
  16: CropIconSvg16,
  20: CropIconSvg20,
  24: CropIconSvg24,
  32: CropIconSvg32,
  40: CropIconSvg40,
  48: CropIconSvg48,
} as const;

export function CropIcon({ size = 20, className = '' }: IconProps) {
  const svg = CROP_ICON_SVG_BY_SIZE[size] ?? CropIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
