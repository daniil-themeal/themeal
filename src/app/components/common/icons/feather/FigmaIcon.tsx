import FigmaIconSvg16 from '../svg/figma-16.svg?raw';
import FigmaIconSvg20 from '../svg/figma-20.svg?raw';
import FigmaIconSvg24 from '../svg/figma-24.svg?raw';
import FigmaIconSvg32 from '../svg/figma-32.svg?raw';
import FigmaIconSvg40 from '../svg/figma-40.svg?raw';
import FigmaIconSvg48 from '../svg/figma-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const FIGMA_ICON_SVG_BY_SIZE = {
  16: FigmaIconSvg16,
  20: FigmaIconSvg20,
  24: FigmaIconSvg24,
  32: FigmaIconSvg32,
  40: FigmaIconSvg40,
  48: FigmaIconSvg48,
} as const;

export function FigmaIcon({ size = 20, className = '' }: IconProps) {
  const svg = FIGMA_ICON_SVG_BY_SIZE[size] ?? FigmaIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
