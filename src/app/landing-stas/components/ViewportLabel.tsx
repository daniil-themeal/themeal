import { useEffect, useState } from 'react';
import { useGridOverlay } from '../useGridOverlay';

export function ViewportLabel() {
  const [size, setSize] = useState({ w: 0, h: 0 });
  const { cols, rows, devLabelsVisible, toggleCols, toggleRows } = useGridOverlay();

  useEffect(() => {
    const update = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (!size.w || !devLabelsVisible) return null;

  return (
    <>
      <div className="grid-labels">
        <button
          type="button"
          className={`dev-label grid-label${cols ? ' is-on' : ''}`}
          aria-pressed={cols}
          aria-label="Toggle column grid"
          title="Column grid · Shift+G"
          onClick={toggleCols}
        >
          G
        </button>
        <button
          type="button"
          className={`dev-label grid-label${rows ? ' is-on' : ''}`}
          aria-pressed={rows}
          aria-label="Toggle row grid"
          title="Row grid · Shift+H"
          onClick={toggleRows}
        >
          H
        </button>
      </div>

      <div className="dev-label viewport-label" aria-hidden="true">
        <span className="viewport-label__value">{size.w}</span>
        <span className="viewport-label__sep">×</span>
        <span className="viewport-label__value">{size.h}</span>
      </div>

    </>
  );
}
