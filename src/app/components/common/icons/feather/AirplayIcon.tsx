import AirplayIconSvg16 from '../svg/airplay-16.svg?raw';
import AirplayIconSvg20 from '../svg/airplay-20.svg?raw';
import AirplayIconSvg24 from '../svg/airplay-24.svg?raw';
import AirplayIconSvg32 from '../svg/airplay-32.svg?raw';
import AirplayIconSvg40 from '../svg/airplay-40.svg?raw';
import AirplayIconSvg48 from '../svg/airplay-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const AIRPLAY_ICON_SVG_BY_SIZE = {
  16: AirplayIconSvg16,
  20: AirplayIconSvg20,
  24: AirplayIconSvg24,
  32: AirplayIconSvg32,
  40: AirplayIconSvg40,
  48: AirplayIconSvg48,
} as const;

export function AirplayIcon({ size = 20, className = '' }: IconProps) {
  const svg = AIRPLAY_ICON_SVG_BY_SIZE[size] ?? AirplayIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
