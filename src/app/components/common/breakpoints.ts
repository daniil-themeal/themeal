/**
 * Project breakpoints — must stay in sync with --breakpoint-* in src/styles/theme.css
 *
 * | Key | Tailwind | Min width | max-width (below) |
 * |-----|----------|-----------|-------------------|
 * | xs  | xs:      | 390px     | 389px             |
 * | sm  | sm:      | 576px     | 575px             |
 * | md  | md:      | 768px     | 767px             |
 * | lg  | lg:      | 1024px    | 1023px            |
 * | xl  | xl:      | 1200px    | 1199px            |
 * | 2xl | 2xl:     | 1440px    | 1439px            |
 */
export const BREAKPOINTS = {
  xs: 390,
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1200,
  '2xl': 1440,
} as const;

export type BreakpointKey = keyof typeof BREAKPOINTS;

export const BREAKPOINT_TAILWIND_PREFIX = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  '2xl': '2xl',
} as const satisfies Record<BreakpointKey, string>;

export function minWidthQuery(breakpoint: BreakpointKey): string {
  return `(min-width: ${BREAKPOINTS[breakpoint]}px)`;
}

export function maxWidthQuery(breakpoint: BreakpointKey): string {
  return `(max-width: ${BREAKPOINTS[breakpoint] - 1}px)`;
}

export function belowBreakpointQuery(breakpoint: BreakpointKey): string {
  return maxWidthQuery(breakpoint);
}

export function atOrAboveBreakpointQuery(breakpoint: BreakpointKey): string {
  return minWidthQuery(breakpoint);
}
