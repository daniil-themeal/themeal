import LayersIconSvg16 from '../svg/layers-16.svg?raw';
import LayersIconSvg20 from '../svg/layers-20.svg?raw';
import LayersIconSvg24 from '../svg/layers-24.svg?raw';
import LayersIconSvg32 from '../svg/layers-32.svg?raw';
import LayersIconSvg40 from '../svg/layers-40.svg?raw';
import LayersIconSvg48 from '../svg/layers-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const LAYERS_ICON_SVG_BY_SIZE = {
  16: LayersIconSvg16,
  20: LayersIconSvg20,
  24: LayersIconSvg24,
  32: LayersIconSvg32,
  40: LayersIconSvg40,
  48: LayersIconSvg48,
} as const;

export function LayersIcon({ size = 20, className = '' }: IconProps) {
  const svg = LAYERS_ICON_SVG_BY_SIZE[size] ?? LayersIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
