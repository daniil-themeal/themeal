import CodeIconSvg16 from '../svg/code-16.svg?raw';
import CodeIconSvg20 from '../svg/code-20.svg?raw';
import CodeIconSvg24 from '../svg/code-24.svg?raw';
import CodeIconSvg32 from '../svg/code-32.svg?raw';
import CodeIconSvg40 from '../svg/code-40.svg?raw';
import CodeIconSvg48 from '../svg/code-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CODE_ICON_SVG_BY_SIZE = {
  16: CodeIconSvg16,
  20: CodeIconSvg20,
  24: CodeIconSvg24,
  32: CodeIconSvg32,
  40: CodeIconSvg40,
  48: CodeIconSvg48,
} as const;

export function CodeIcon({ size = 20, className = '' }: IconProps) {
  const svg = CODE_ICON_SVG_BY_SIZE[size] ?? CodeIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
