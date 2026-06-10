import ArrowDownRightIconSvg16 from '../svg/arrow-down-right-16.svg?raw';
import ArrowDownRightIconSvg20 from '../svg/arrow-down-right-20.svg?raw';
import ArrowDownRightIconSvg24 from '../svg/arrow-down-right-24.svg?raw';
import ArrowDownRightIconSvg32 from '../svg/arrow-down-right-32.svg?raw';
import ArrowDownRightIconSvg40 from '../svg/arrow-down-right-40.svg?raw';
import ArrowDownRightIconSvg48 from '../svg/arrow-down-right-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const ARROW_DOWN_RIGHT_ICON_SVG_BY_SIZE = {
  16: ArrowDownRightIconSvg16,
  20: ArrowDownRightIconSvg20,
  24: ArrowDownRightIconSvg24,
  32: ArrowDownRightIconSvg32,
  40: ArrowDownRightIconSvg40,
  48: ArrowDownRightIconSvg48,
} as const;

export function ArrowDownRightIcon({ size = 20, className = '' }: IconProps) {
  const svg = ARROW_DOWN_RIGHT_ICON_SVG_BY_SIZE[size] ?? ArrowDownRightIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
