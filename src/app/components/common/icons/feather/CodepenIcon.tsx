import CodepenIconSvg16 from '../svg/codepen-16.svg?raw';
import CodepenIconSvg20 from '../svg/codepen-20.svg?raw';
import CodepenIconSvg24 from '../svg/codepen-24.svg?raw';
import CodepenIconSvg32 from '../svg/codepen-32.svg?raw';
import CodepenIconSvg40 from '../svg/codepen-40.svg?raw';
import CodepenIconSvg48 from '../svg/codepen-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CODEPEN_ICON_SVG_BY_SIZE = {
  16: CodepenIconSvg16,
  20: CodepenIconSvg20,
  24: CodepenIconSvg24,
  32: CodepenIconSvg32,
  40: CodepenIconSvg40,
  48: CodepenIconSvg48,
} as const;

export function CodepenIcon({ size = 20, className = '' }: IconProps) {
  const svg = CODEPEN_ICON_SVG_BY_SIZE[size] ?? CodepenIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
