import LockIconSvg16 from '../svg/lock-16.svg?raw';
import LockIconSvg20 from '../svg/lock-20.svg?raw';
import LockIconSvg24 from '../svg/lock-24.svg?raw';
import LockIconSvg32 from '../svg/lock-32.svg?raw';
import LockIconSvg40 from '../svg/lock-40.svg?raw';
import LockIconSvg48 from '../svg/lock-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const LOCK_ICON_SVG_BY_SIZE = {
  16: LockIconSvg16,
  20: LockIconSvg20,
  24: LockIconSvg24,
  32: LockIconSvg32,
  40: LockIconSvg40,
  48: LockIconSvg48,
} as const;

export function LockIcon({ size = 20, className = '' }: IconProps) {
  const svg = LOCK_ICON_SVG_BY_SIZE[size] ?? LockIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
