import { isDevToolsEnabled } from '../devToolsEnabled';

export const SPACING_ROOT_ATTR = 'data-spacing-root';
export const SPACING_CONTENT_ATTR = 'data-spacing-content';

export type SpacingMeasureContext = {
  root: HTMLElement;
  windowOpen: boolean;
  bounds: DOMRect;
};

function getTopModalRoot(): HTMLElement | null {
  const modalRoots = [...document.querySelectorAll(`[${SPACING_ROOT_ATTR}]`)].filter(
    (el): el is HTMLElement => el instanceof HTMLElement,
  );

  if (modalRoots.length === 0) return null;

  return modalRoots.sort((a, b) => {
    const za = Number.parseInt(getComputedStyle(a).zIndex, 10) || 0;
    const zb = Number.parseInt(getComputedStyle(b).zIndex, 10) || 0;
    return zb - za;
  })[0];
}

function resolveContentRoot(shell: HTMLElement): HTMLElement {
  const marked = [...shell.querySelectorAll(`[${SPACING_CONTENT_ATTR}]`)].filter(
    (el): el is HTMLElement => el instanceof HTMLElement,
  );

  if (marked.length === 0) return shell;

  return marked.reduce((deepest, el) => (deepest.contains(el) ? el : deepest));
}

export function getSpacingMeasureContext(): SpacingMeasureContext | null {
  const topRoot = getTopModalRoot();

  if (topRoot) {
    const root = resolveContentRoot(topRoot);

    if (root === topRoot && isDevToolsEnabled) {
      console.warn('[spacing] data-spacing-content missing inside open window', topRoot);
    }

    return {
      root,
      windowOpen: true,
      bounds: root.getBoundingClientRect(),
    };
  }

  const landing = document.querySelector('.landing-stas') as HTMLElement | null;
  if (!landing) return null;

  return {
    root: landing,
    windowOpen: false,
    bounds: landing.getBoundingClientRect(),
  };
}

/** @deprecated Prefer getSpacingMeasureContext() */
export function getSpacingMeasureRoot(): HTMLElement | null {
  return getSpacingMeasureContext()?.root ?? null;
}
