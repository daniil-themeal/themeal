import type { SpacingMeasureContext } from './getSpacingMeasureRoot';

export function isInsideMeasureRoot(el: Element, context: SpacingMeasureContext | null): boolean {
  if (!context?.windowOpen) return true;
  return context.root.contains(el);
}
