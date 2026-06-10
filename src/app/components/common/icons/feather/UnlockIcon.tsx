import UnlockIconSvg16 from '../svg/unlock-16.svg?raw';
import UnlockIconSvg20 from '../svg/unlock-20.svg?raw';
import UnlockIconSvg24 from '../svg/unlock-24.svg?raw';
import UnlockIconSvg32 from '../svg/unlock-32.svg?raw';
import UnlockIconSvg40 from '../svg/unlock-40.svg?raw';
import UnlockIconSvg48 from '../svg/unlock-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const UNLOCK_ICON_SVG_BY_SIZE = {
  16: UnlockIconSvg16,
  20: UnlockIconSvg20,
  24: UnlockIconSvg24,
  32: UnlockIconSvg32,
  40: UnlockIconSvg40,
  48: UnlockIconSvg48,
} as const;

export function UnlockIcon({ size = 20, className = '' }: IconProps) {
  const svg = UNLOCK_ICON_SVG_BY_SIZE[size] ?? UnlockIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
