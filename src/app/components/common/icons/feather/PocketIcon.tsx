import PocketIconSvg16 from '../svg/pocket-16.svg?raw';
import PocketIconSvg20 from '../svg/pocket-20.svg?raw';
import PocketIconSvg24 from '../svg/pocket-24.svg?raw';
import PocketIconSvg32 from '../svg/pocket-32.svg?raw';
import PocketIconSvg40 from '../svg/pocket-40.svg?raw';
import PocketIconSvg48 from '../svg/pocket-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const POCKET_ICON_SVG_BY_SIZE = {
  16: PocketIconSvg16,
  20: PocketIconSvg20,
  24: PocketIconSvg24,
  32: PocketIconSvg32,
  40: PocketIconSvg40,
  48: PocketIconSvg48,
} as const;

export function PocketIcon({ size = 20, className = '' }: IconProps) {
  const svg = POCKET_ICON_SVG_BY_SIZE[size] ?? PocketIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
