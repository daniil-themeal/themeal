import ActivityIconSvg16 from '../svg/activity-16.svg?raw';
import ActivityIconSvg20 from '../svg/activity-20.svg?raw';
import ActivityIconSvg24 from '../svg/activity-24.svg?raw';
import ActivityIconSvg32 from '../svg/activity-32.svg?raw';
import ActivityIconSvg40 from '../svg/activity-40.svg?raw';
import ActivityIconSvg48 from '../svg/activity-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const ACTIVITY_ICON_SVG_BY_SIZE = {
  16: ActivityIconSvg16,
  20: ActivityIconSvg20,
  24: ActivityIconSvg24,
  32: ActivityIconSvg32,
  40: ActivityIconSvg40,
  48: ActivityIconSvg48,
} as const;

export function ActivityIcon({ size = 20, className = '' }: IconProps) {
  const svg = ACTIVITY_ICON_SVG_BY_SIZE[size] ?? ActivityIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
