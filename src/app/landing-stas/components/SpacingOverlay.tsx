import { useCallback, useEffect, useState } from 'react';
import { measureVerticalSpacings, type SpacingLabel } from '../measureVerticalSpacings';
import { getSpacingMeasureContext } from '../getSpacingMeasureRoot';
import { useSpacingMeasureSchedule } from '../useSpacingMeasureSchedule';
import { useGridOverlay } from '../useGridOverlay';

function useSpacingLabels(enabled: boolean) {
  const [labels, setLabels] = useState<SpacingLabel[]>([]);

  const measure = useCallback(() => {
    setLabels(measureVerticalSpacings(getSpacingMeasureContext()));
  }, []);

  useSpacingMeasureSchedule(enabled, measure);

  useEffect(() => {
    if (!enabled) setLabels([]);
  }, [enabled]);

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
