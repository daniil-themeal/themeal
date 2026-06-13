import { useGridOverlay } from '../useGridOverlay';

export function GridOverlay() {
  const { cols, rows } = useGridOverlay();

  if (!cols && !rows) return null;

  return (
    <div className="landing-grid-overlay" aria-hidden="true">
      {rows && <div className="landing-grid-overlay__rows" />}
      {cols && (
        <div className="landing-grid-overlay__wrap">
          <div className="landing-grid-overlay__columns">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="landing-grid-overlay__col" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
