export type SpacingLabel = {
  top: number;
  height: number;
  value: number;
  anchorRight: number;
};

const MIN_SPACING = 4;
const DEDUPE_TOLERANCE = 2;

const OVERLAY_SELECTORS = [
  '.landing-grid-overlay',
  '.spacing-overlay',
  '.dev-label',
  '.grid-labels',
];

function isOverlayElement(el: Element): boolean {
  return OVERLAY_SELECTORS.some((sel) => el.closest(sel));
}

function isVisible(el: Element): el is HTMLElement {
  if (!(el instanceof HTMLElement)) return false;
  if (isOverlayElement(el)) return false;

  const style = getComputedStyle(el);
  if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
    return false;
  }
  if (style.position === 'fixed') return false;

  const rect = el.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

function getVisibleChildren(el: HTMLElement): HTMLElement[] {
  return [...el.children].filter(isVisible) as HTMLElement[];
}

function pushLabel(labels: SpacingLabel[], label: SpacingLabel) {
  if (label.height < MIN_SPACING && Math.abs(label.value) < MIN_SPACING) return;
  labels.push(label);
}

function addPaddingLabels(el: HTMLElement, style: CSSStyleDeclaration, labels: SpacingLabel[]) {
  const rect = el.getBoundingClientRect();
  const paddingTop = parseFloat(style.paddingTop);
  const paddingBottom = parseFloat(style.paddingBottom);

  if (paddingTop >= MIN_SPACING) {
    pushLabel(labels, {
      top: rect.top + paddingTop / 2,
      height: paddingTop,
      value: Math.round(paddingTop),
      anchorRight: rect.right,
    });
  }

  if (paddingBottom >= MIN_SPACING) {
    pushLabel(labels, {
      top: rect.bottom - paddingBottom / 2,
      height: paddingBottom,
      value: Math.round(paddingBottom),
      anchorRight: rect.right,
    });
  }
}

function addMarginLabels(el: HTMLElement, style: CSSStyleDeclaration, labels: SpacingLabel[]) {
  const rect = el.getBoundingClientRect();
  const marginTop = parseFloat(style.marginTop);
  const marginBottom = parseFloat(style.marginBottom);

  if (Math.abs(marginTop) >= MIN_SPACING) {
    pushLabel(labels, {
      top: rect.top - marginTop / 2,
      height: Math.abs(marginTop),
      value: Math.round(marginTop),
      anchorRight: rect.right,
    });
  }

  if (Math.abs(marginBottom) >= MIN_SPACING) {
    pushLabel(labels, {
      top: rect.bottom + marginBottom / 2,
      height: Math.abs(marginBottom),
      value: Math.round(marginBottom),
      anchorRight: rect.right,
    });
  }
}

function addSiblingGapLabels(children: HTMLElement[], labels: SpacingLabel[]) {
  for (let i = 0; i < children.length - 1; i++) {
    const a = children[i].getBoundingClientRect();
    const b = children[i + 1].getBoundingClientRect();
    const gap = Math.round(b.top - a.bottom);

    if (Math.abs(gap) < MIN_SPACING) continue;

    pushLabel(labels, {
      top: a.bottom + gap / 2,
      height: Math.abs(gap),
      value: gap,
      anchorRight: Math.max(a.right, b.right),
    });
  }
}

function isVerticalFlow(style: CSSStyleDeclaration): boolean {
  const display = style.display;
  if (display.includes('flex')) {
    const direction = style.flexDirection;
    return direction === 'column' || direction === 'column-reverse';
  }
  if (display.includes('grid')) {
    return true;
  }
  return display === 'block' || display === 'list-item' || display === 'flow-root';
}

function walk(el: HTMLElement, labels: SpacingLabel[]) {
  if (!isVisible(el)) return;

  const style = getComputedStyle(el);
  const children = getVisibleChildren(el);

  addPaddingLabels(el, style, labels);
  addMarginLabels(el, style, labels);

  if (children.length >= 2 && isVerticalFlow(style)) {
    addSiblingGapLabels(children, labels);
  }

  children.forEach((child) => walk(child, labels));
}

function dedupeLabels(labels: SpacingLabel[]): SpacingLabel[] {
  const result: SpacingLabel[] = [];

  for (const label of labels) {
    const duplicate = result.find(
      (existing) =>
        Math.abs(existing.top - label.top) <= DEDUPE_TOLERANCE &&
        Math.abs(existing.value - label.value) <= DEDUPE_TOLERANCE,
    );
    if (!duplicate) result.push(label);
  }

  return result.sort((a, b) => a.top - b.top);
}

export function measureVerticalSpacings(root: HTMLElement | null): SpacingLabel[] {
  if (!root) return [];
  const labels: SpacingLabel[] = [];
  walk(root, labels);
  return dedupeLabels(labels);
}
