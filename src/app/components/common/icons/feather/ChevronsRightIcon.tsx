import ChevronsRightIconSvg16 from '../svg/chevrons-right-16.svg?raw';
import ChevronsRightIconSvg20 from '../svg/chevrons-right-20.svg?raw';
import ChevronsRightIconSvg24 from '../svg/chevrons-right-24.svg?raw';
import ChevronsRightIconSvg32 from '../svg/chevrons-right-32.svg?raw';
import ChevronsRightIconSvg40 from '../svg/chevrons-right-40.svg?raw';
import ChevronsRightIconSvg48 from '../svg/chevrons-right-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CHEVRONS_RIGHT_ICON_SVG_BY_SIZE = {
  16: ChevronsRightIconSvg16,
  20: ChevronsRightIconSvg20,
  24: ChevronsRightIconSvg24,
  32: ChevronsRightIconSvg32,
  40: ChevronsRightIconSvg40,
  48: ChevronsRightIconSvg48,
} as const;

export function ChevronsRightIcon({ size = 20, className = '' }: IconProps) {
  const svg = CHEVRONS_RIGHT_ICON_SVG_BY_SIZE[size] ?? ChevronsRightIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
