import PenToolIconSvg16 from '../svg/pen-tool-16.svg?raw';
import PenToolIconSvg20 from '../svg/pen-tool-20.svg?raw';
import PenToolIconSvg24 from '../svg/pen-tool-24.svg?raw';
import PenToolIconSvg32 from '../svg/pen-tool-32.svg?raw';
import PenToolIconSvg40 from '../svg/pen-tool-40.svg?raw';
import PenToolIconSvg48 from '../svg/pen-tool-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const PEN_TOOL_ICON_SVG_BY_SIZE = {
  16: PenToolIconSvg16,
  20: PenToolIconSvg20,
  24: PenToolIconSvg24,
  32: PenToolIconSvg32,
  40: PenToolIconSvg40,
  48: PenToolIconSvg48,
} as const;

export function PenToolIcon({ size = 20, className = '' }: IconProps) {
  const svg = PEN_TOOL_ICON_SVG_BY_SIZE[size] ?? PenToolIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
