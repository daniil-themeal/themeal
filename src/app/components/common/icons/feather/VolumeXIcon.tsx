import VolumeXIconSvg16 from '../svg/volume-x-16.svg?raw';
import VolumeXIconSvg20 from '../svg/volume-x-20.svg?raw';
import VolumeXIconSvg24 from '../svg/volume-x-24.svg?raw';
import VolumeXIconSvg32 from '../svg/volume-x-32.svg?raw';
import VolumeXIconSvg40 from '../svg/volume-x-40.svg?raw';
import VolumeXIconSvg48 from '../svg/volume-x-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const VOLUME_XICON_SVG_BY_SIZE = {
  16: VolumeXIconSvg16,
  20: VolumeXIconSvg20,
  24: VolumeXIconSvg24,
  32: VolumeXIconSvg32,
  40: VolumeXIconSvg40,
  48: VolumeXIconSvg48,
} as const;

export function VolumeXIcon({ size = 20, className = '' }: IconProps) {
  const svg = VOLUME_XICON_SVG_BY_SIZE[size] ?? VolumeXIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
