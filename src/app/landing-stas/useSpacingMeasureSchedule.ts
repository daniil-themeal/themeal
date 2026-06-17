import { useEffect } from 'react';

import { getSpacingMeasureContext, SPACING_CONTENT_ATTR, SPACING_ROOT_ATTR } from './getSpacingMeasureRoot';

export function useSpacingMeasureSchedule(enabled: boolean, measure: () => void) {
  useEffect(() => {
    if (!enabled) return;

    let timeout = 0;
    let observedRoot: HTMLElement | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const schedule = () => {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(measure, 100);
    };

    const attachRootObserver = () => {
      const context = getSpacingMeasureContext();
      const root = context?.root ?? null;
      if (root === observedRoot) return;

      resizeObserver?.disconnect();
      observedRoot = root;

      if (!root) return;

      resizeObserver = new ResizeObserver(schedule);
      resizeObserver.observe(root);
    };

    const scheduleWithRoot = () => {
      attachRootObserver();
      schedule();
    };

    measure();
    scheduleWithRoot();

    window.addEventListener('resize', scheduleWithRoot, { passive: true });
    window.addEventListener('scroll', scheduleWithRoot, { passive: true, capture: true });

    const mutationObserver = new MutationObserver(scheduleWithRoot);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: [SPACING_ROOT_ATTR, SPACING_CONTENT_ATTR, 'class'],
    });

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener('resize', scheduleWithRoot);
      window.removeEventListener('scroll', scheduleWithRoot, true);
      mutationObserver.disconnect();
      resizeObserver?.disconnect();
    };
  }, [enabled, measure]);
}
