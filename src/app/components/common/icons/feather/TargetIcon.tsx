import TargetIconSvg16 from '../svg/target-16.svg?raw';
import TargetIconSvg20 from '../svg/target-20.svg?raw';
import TargetIconSvg24 from '../svg/target-24.svg?raw';
import TargetIconSvg32 from '../svg/target-32.svg?raw';
import TargetIconSvg40 from '../svg/target-40.svg?raw';
import TargetIconSvg48 from '../svg/target-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const TARGET_ICON_SVG_BY_SIZE = {
  16: TargetIconSvg16,
  20: TargetIconSvg20,
  24: TargetIconSvg24,
  32: TargetIconSvg32,
  40: TargetIconSvg40,
  48: TargetIconSvg48,
} as const;

export function TargetIcon({ size = 20, className = '' }: IconProps) {
  const svg = TARGET_ICON_SVG_BY_SIZE[size] ?? TargetIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
