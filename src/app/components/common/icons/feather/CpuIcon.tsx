import CpuIconSvg16 from '../svg/cpu-16.svg?raw';
import CpuIconSvg20 from '../svg/cpu-20.svg?raw';
import CpuIconSvg24 from '../svg/cpu-24.svg?raw';
import CpuIconSvg32 from '../svg/cpu-32.svg?raw';
import CpuIconSvg40 from '../svg/cpu-40.svg?raw';
import CpuIconSvg48 from '../svg/cpu-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CPU_ICON_SVG_BY_SIZE = {
  16: CpuIconSvg16,
  20: CpuIconSvg20,
  24: CpuIconSvg24,
  32: CpuIconSvg32,
  40: CpuIconSvg40,
  48: CpuIconSvg48,
} as const;

export function CpuIcon({ size = 20, className = '' }: IconProps) {
  const svg = CPU_ICON_SVG_BY_SIZE[size] ?? CpuIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
