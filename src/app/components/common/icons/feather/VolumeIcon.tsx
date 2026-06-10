import VolumeIconSvg16 from '../svg/volume-16.svg?raw';
import VolumeIconSvg20 from '../svg/volume-20.svg?raw';
import VolumeIconSvg24 from '../svg/volume-24.svg?raw';
import VolumeIconSvg32 from '../svg/volume-32.svg?raw';
import VolumeIconSvg40 from '../svg/volume-40.svg?raw';
import VolumeIconSvg48 from '../svg/volume-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const VOLUME_ICON_SVG_BY_SIZE = {
  16: VolumeIconSvg16,
  20: VolumeIconSvg20,
  24: VolumeIconSvg24,
  32: VolumeIconSvg32,
  40: VolumeIconSvg40,
  48: VolumeIconSvg48,
} as const;

export function VolumeIcon({ size = 20, className = '' }: IconProps) {
  const svg = VOLUME_ICON_SVG_BY_SIZE[size] ?? VolumeIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
