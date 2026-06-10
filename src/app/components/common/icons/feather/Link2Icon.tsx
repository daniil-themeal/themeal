import Link2IconSvg16 from '../svg/link-2-16.svg?raw';
import Link2IconSvg20 from '../svg/link-2-20.svg?raw';
import Link2IconSvg24 from '../svg/link-2-24.svg?raw';
import Link2IconSvg32 from '../svg/link-2-32.svg?raw';
import Link2IconSvg40 from '../svg/link-2-40.svg?raw';
import Link2IconSvg48 from '../svg/link-2-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const LINK2ICON_SVG_BY_SIZE = {
  16: Link2IconSvg16,
  20: Link2IconSvg20,
  24: Link2IconSvg24,
  32: Link2IconSvg32,
  40: Link2IconSvg40,
  48: Link2IconSvg48,
} as const;

export function Link2Icon({ size = 20, className = '' }: IconProps) {
  const svg = LINK2ICON_SVG_BY_SIZE[size] ?? Link2IconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
