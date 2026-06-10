import CalendarIconSvg16 from '../svg/calendar-16.svg?raw';
import CalendarIconSvg20 from '../svg/calendar-20.svg?raw';
import CalendarIconSvg24 from '../svg/calendar-24.svg?raw';
import CalendarIconSvg32 from '../svg/calendar-32.svg?raw';
import CalendarIconSvg40 from '../svg/calendar-40.svg?raw';
import CalendarIconSvg48 from '../svg/calendar-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const CALENDAR_ICON_SVG_BY_SIZE = {
  16: CalendarIconSvg16,
  20: CalendarIconSvg20,
  24: CalendarIconSvg24,
  32: CalendarIconSvg32,
  40: CalendarIconSvg40,
  48: CalendarIconSvg48,
} as const;

export function CalendarIcon({ size = 20, className = '' }: IconProps) {
  const svg = CALENDAR_ICON_SVG_BY_SIZE[size] ?? CalendarIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
