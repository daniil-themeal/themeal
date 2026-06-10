import FilmIconSvg16 from '../svg/film-16.svg?raw';
import FilmIconSvg20 from '../svg/film-20.svg?raw';
import FilmIconSvg24 from '../svg/film-24.svg?raw';
import FilmIconSvg32 from '../svg/film-32.svg?raw';
import FilmIconSvg40 from '../svg/film-40.svg?raw';
import FilmIconSvg48 from '../svg/film-48.svg?raw';

import type { IconProps } from '../iconProps';
import { RawSvgIcon } from '../RawSvgIcon';

const FILM_ICON_SVG_BY_SIZE = {
  16: FilmIconSvg16,
  20: FilmIconSvg20,
  24: FilmIconSvg24,
  32: FilmIconSvg32,
  40: FilmIconSvg40,
  48: FilmIconSvg48,
} as const;

export function FilmIcon({ size = 20, className = '' }: IconProps) {
  const svg = FILM_ICON_SVG_BY_SIZE[size] ?? FilmIconSvg20;
  return <RawSvgIcon svg={svg} size={size} className={className} />;
}
