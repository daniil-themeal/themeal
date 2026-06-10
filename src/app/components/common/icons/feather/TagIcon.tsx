import TagIconSvg16 from '../svg/tag-16.svg?raw';
import TagIconSvg20 from '../svg/tag-20.svg?raw';
import TagIconSvg24 from '../svg/tag-24.svg?raw';
import TagIconSvg32 from '../svg/tag-32.svg?raw';
import TagIconSvg40 from '../svg/tag-40.svg?raw';
import TagIconSvg48 from '../svg/tag-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const TAG_ICON_SVG_BY_SIZE = {
  16: TagIconSvg16,
  20: TagIconSvg20,
  24: TagIconSvg24,
  32: TagIconSvg32,
  40: TagIconSvg40,
  48: TagIconSvg48,
} as const;

export function TagIcon({ size = 20, className = '' }: IconProps) {
  const svg = TAG_ICON_SVG_BY_SIZE[size] ?? TagIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
