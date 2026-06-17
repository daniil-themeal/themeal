import type { SpacingMeasureContext } from './getSpacingMeasureRoot';
import { isInsideMeasureRoot } from './spacingMeasureContext';

export type HorizontalSpacingLabel = {
  left: number;
  width: number;
  value: number;
  anchorBottom: number;
};

const MIN_SPACING = 4;
const DEDUPE_TOLERANCE = 2;

const OVERLAY_SELECTORS = [
  '.landing-dev-tools',
  '.landing-grid-overlay',
  '.spacing-overlay',
  '.horizontal-spacing-overlay',
  '.dev-label',
  '.grid-labels',
];

function isOverlayElement(el: Element): boolean {
  return OVERLAY_SELECTORS.some((sel) => el.closest(sel));
}

function isVisible(el: Element, context: SpacingMeasureContext | null): el is HTMLElement {
  if (!(el instanceof HTMLElement)) return false;
  if (!isInsideMeasureRoot(el, context)) return false;
  if (isOverlayElement(el)) return false;

  const style = getComputedStyle(el);
  if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
    return false;
  }
  if (style.position === 'fixed') return false;

  const rect = el.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

function getVisibleChildren(el: HTMLElement, context: SpacingMeasureContext | null): HTMLElement[] {
  return [...el.children].filter((child) => isVisible(child, context)) as HTMLElement[];
}

function pushLabel(labels: HorizontalSpacingLabel[], label: HorizontalSpacingLabel) {
  if (label.width < MIN_SPACING && Math.abs(label.value) < MIN_SPACING) return;
  labels.push(label);
}

function addPaddingLabels(el: HTMLElement, style: CSSStyleDeclaration, labels: HorizontalSpacingLabel[]) {
  const rect = el.getBoundingClientRect();
  const paddingLeft = parseFloat(style.paddingLeft);
  const paddingRight = parseFloat(style.paddingRight);

  if (paddingLeft >= MIN_SPACING) {
    pushLabel(labels, {
      left: rect.left + paddingLeft / 2,
      width: paddingLeft,
      value: Math.round(paddingLeft),
      anchorBottom: rect.bottom,
    });
  }

  if (paddingRight >= MIN_SPACING) {
    pushLabel(labels, {
      left: rect.right - paddingRight / 2,
      width: paddingRight,
      value: Math.round(paddingRight),
      anchorBottom: rect.bottom,
    });
  }
}

function addMarginLabels(el: HTMLElement, style: CSSStyleDeclaration, labels: HorizontalSpacingLabel[]) {
  const rect = el.getBoundingClientRect();
  const marginLeft = parseFloat(style.marginLeft);
  const marginRight = parseFloat(style.marginRight);

  if (Math.abs(marginLeft) >= MIN_SPACING) {
    pushLabel(labels, {
      left: rect.left - marginLeft / 2,
      width: Math.abs(marginLeft),
      value: Math.round(marginLeft),
      anchorBottom: rect.bottom,
    });
  }

  if (Math.abs(marginRight) >= MIN_SPACING) {
    pushLabel(labels, {
      left: rect.right + marginRight / 2,
      width: Math.abs(marginRight),
      value: Math.round(marginRight),
      anchorBottom: rect.bottom,
    });
  }
}

function addSiblingGapLabels(children: HTMLElement[], labels: HorizontalSpacingLabel[]) {
  for (let i = 0; i < children.length - 1; i++) {
    const a = children[i].getBoundingClientRect();
    const b = children[i + 1].getBoundingClientRect();
    const gap = Math.round(b.left - a.right);

    if (Math.abs(gap) < MIN_SPACING) continue;

    pushLabel(labels, {
      left: a.right + gap / 2,
      width: Math.abs(gap),
      value: gap,
      anchorBottom: Math.max(a.bottom, b.bottom),
    });
  }
}

function getGridColumnCount(style: CSSStyleDeclaration): number {
  const template = style.gridTemplateColumns;
  if (!template || template === 'none') return 1;

  const repeatMatch = template.trim().match(/repeat\s*\(\s*(\d+)\s*,/i);
  if (repeatMatch) return Number(repeatMatch[1]);

  return template.trim().split(/\s+/).filter((track) => track && track !== 'none').length || 1;
}

function isHorizontalFlow(style: CSSStyleDeclaration): boolean {
  const display = style.display;
  if (display.includes('flex')) {
    const direction = style.flexDirection || 'row';
    return direction === 'row' || direction === 'row-reverse';
  }
  if (display.includes('grid')) {
    return getGridColumnCount(style) > 1;
  }
  return display === 'inline' || display === 'inline-block' || display === 'inline-flex';
}

function walk(el: HTMLElement, labels: HorizontalSpacingLabel[], context: SpacingMeasureContext | null) {
  if (isVisible(el, context)) {
    const style = getComputedStyle(el);
    const children = getVisibleChildren(el, context);

    addPaddingLabels(el, style, labels);
    addMarginLabels(el, style, labels);

    if (children.length >= 2 && isHorizontalFlow(style)) {
      addSiblingGapLabels(children, labels);
    }

    children.forEach((child) => walk(child, labels, context));
    return;
  }

  [...el.children]
    .filter((child): child is HTMLElement => child instanceof HTMLElement)
    .forEach((child) => walk(child, labels, context));
}

function dedupeLabels(labels: HorizontalSpacingLabel[]): HorizontalSpacingLabel[] {
  const result: HorizontalSpacingLabel[] = [];

  for (const label of labels) {
    const duplicate = result.find(
      (existing) =>
        Math.abs(existing.left - label.left) <= DEDUPE_TOLERANCE &&
        Math.abs(existing.value - label.value) <= DEDUPE_TOLERANCE,
    );
    if (!duplicate) result.push(label);
  }

  return result.sort((a, b) => a.left - b.left);
}

export function measureHorizontalSpacings(context: SpacingMeasureContext | null): HorizontalSpacingLabel[] {
  if (!context) return [];
  const labels: HorizontalSpacingLabel[] = [];
  walk(context.root, labels, context);
  return dedupeLabels(labels);
}
