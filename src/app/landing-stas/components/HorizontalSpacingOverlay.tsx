import { useCallback, useEffect, useState } from 'react';
import { measureHorizontalSpacings, type HorizontalSpacingLabel } from '../measureHorizontalSpacings';
import { getSpacingMeasureContext } from '../getSpacingMeasureRoot';
import { useSpacingMeasureSchedule } from '../useSpacingMeasureSchedule';
import { useGridOverlay } from '../useGridOverlay';

function useHorizontalSpacingLabels(enabled: boolean) {
  const [labels, setLabels] = useState<HorizontalSpacingLabel[]>([]);

  const measure = useCallback(() => {
    setLabels(measureHorizontalSpacings(getSpacingMeasureContext()));
  }, []);

  useSpacingMeasureSchedule(enabled, measure);

  useEffect(() => {
    if (!enabled) setLabels([]);
  }, [enabled]);

  return labels;
}

export function HorizontalSpacingOverlay() {
  const { horizontalSpacing } = useGridOverlay();
  const labels = useHorizontalSpacingLabels(horizontalSpacing);

  if (!horizontalSpacing || !labels.length) return null;

  return (
    <div className="horizontal-spacing-overlay" aria-hidden="true">
      {labels.map((label, index) => (
        <div key={`${label.left}-${label.value}-${index}`}>
          <div
            className="horizontal-spacing-overlay__zone"
            style={{
              left: label.left - label.width / 2,
              width: label.width,
            }}
          />
          <div
            className="horizontal-spacing-overlay__label"
            style={{
              left: label.left,
              top: label.anchorBottom + 4,
            }}
          >
            {label.value}px
          </div>
        </div>
      ))}
    </div>
  );
}
