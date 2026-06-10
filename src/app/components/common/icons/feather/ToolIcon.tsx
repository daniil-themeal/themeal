import ToolIconSvg16 from '../svg/tool-16.svg?raw';
import ToolIconSvg20 from '../svg/tool-20.svg?raw';
import ToolIconSvg24 from '../svg/tool-24.svg?raw';
import ToolIconSvg32 from '../svg/tool-32.svg?raw';
import ToolIconSvg40 from '../svg/tool-40.svg?raw';
import ToolIconSvg48 from '../svg/tool-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const TOOL_ICON_SVG_BY_SIZE = {
  16: ToolIconSvg16,
  20: ToolIconSvg20,
  24: ToolIconSvg24,
  32: ToolIconSvg32,
  40: ToolIconSvg40,
  48: ToolIconSvg48,
} as const;

export function ToolIcon({ size = 20, className = '' }: IconProps) {
  const svg = TOOL_ICON_SVG_BY_SIZE[size] ?? ToolIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
