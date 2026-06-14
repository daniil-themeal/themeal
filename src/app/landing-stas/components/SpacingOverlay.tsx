import { useCallback, useEffect, useState } from 'react';
import { measureVerticalSpacings, type SpacingLabel } from '../measureVerticalSpacings';
import { useGridOverlay } from '../useGridOverlay';

function useSpacingLabels(enabled: boolean) {
  const [labels, setLabels] = useState<SpacingLabel[]>([]);

  const measure = useCallback(() => {
    const root = document.querySelector('.landing-stas') as HTMLElement | null;
    setLabels(measureVerticalSpacings(root));
  }, []);

  useEffect(() => {
    if (!enabled) {
      setLabels([]);
      return;
    }

    let timeout = 0;
    const schedule = () => {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(measure, 100);
    };

    schedule();

    window.addEventListener('resize', schedule, { passive: true });
    window.addEventListener('scroll', schedule, { passive: true });

    const root = document.querySelector('.landing-stas');
    const observer = root ? new ResizeObserver(schedule) : null;
    if (root && observer) observer.observe(root);

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('scroll', schedule);
      observer?.disconnect();
    };
  }, [enabled, measure]);

  return labels;
}

export function SpacingOverlay() {
  const { spacing } = useGridOverlay();
  const labels = useSpacingLabels(spacing);

  if (!spacing || !labels.length) return null;

  return (
    <div className="spacing-overlay" aria-hidden="true">
      {labels.map((label, index) => (
        <div key={`${label.top}-${label.value}-${index}`}>
          <div
            className="spacing-overlay__zone"
            style={{
              top: label.top - label.height / 2,
              height: label.height,
            }}
          />
          <div
            className="spacing-overlay__label"
            style={{
              top: label.top,
              left: label.anchorRight + 4,
            }}
          >
            {label.value}px
          </div>
        </div>
      ))}
    </div>
  );
}
