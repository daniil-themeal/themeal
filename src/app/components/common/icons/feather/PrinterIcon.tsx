import PrinterIconSvg16 from '../svg/printer-16.svg?raw';
import PrinterIconSvg20 from '../svg/printer-20.svg?raw';
import PrinterIconSvg24 from '../svg/printer-24.svg?raw';
import PrinterIconSvg32 from '../svg/printer-32.svg?raw';
import PrinterIconSvg40 from '../svg/printer-40.svg?raw';
import PrinterIconSvg48 from '../svg/printer-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const PRINTER_ICON_SVG_BY_SIZE = {
  16: PrinterIconSvg16,
  20: PrinterIconSvg20,
  24: PrinterIconSvg24,
  32: PrinterIconSvg32,
  40: PrinterIconSvg40,
  48: PrinterIconSvg48,
} as const;

export function PrinterIcon({ size = 20, className = '' }: IconProps) {
  const svg = PRINTER_ICON_SVG_BY_SIZE[size] ?? PrinterIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
