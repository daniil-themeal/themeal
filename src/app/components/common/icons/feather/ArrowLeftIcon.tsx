import ArrowLeftIconSvg16 from '../svg/arrow-left-16.svg?raw';
import ArrowLeftIconSvg20 from '../svg/arrow-left-20.svg?raw';
import ArrowLeftIconSvg24 from '../svg/arrow-left-24.svg?raw';
import ArrowLeftIconSvg32 from '../svg/arrow-left-32.svg?raw';
import ArrowLeftIconSvg40 from '../svg/arrow-left-40.svg?raw';
import ArrowLeftIconSvg48 from '../svg/arrow-left-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const ARROW_LEFT_ICON_SVG_BY_SIZE = {
  16: ArrowLeftIconSvg16,
  20: ArrowLeftIconSvg20,
  24: ArrowLeftIconSvg24,
  32: ArrowLeftIconSvg32,
  40: ArrowLeftIconSvg40,
  48: ArrowLeftIconSvg48,
} as const;

export function ArrowLeftIcon({ size = 20, className = '' }: IconProps) {
  const svg = ARROW_LEFT_ICON_SVG_BY_SIZE[size] ?? ArrowLeftIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
