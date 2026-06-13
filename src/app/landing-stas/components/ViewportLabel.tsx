import { useEffect, useState } from 'react';
import { useGridOverlay } from '../useGridOverlay';

export function ViewportLabel() {
  const [size, setSize] = useState({ w: 0, h: 0 });
  const { cols, rows, toggleCols, toggleRows } = useGridOverlay();

  useEffect(() => {
    const update = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (!size.w) return null;

  return (
    <>
      <button
        type="button"
        className={`dev-label grid-label grid-label--cols${cols ? ' is-on' : ''}`}
        aria-pressed={cols}
        aria-label="Toggle column grid"
        title="Column grid · Shift+G"
        onClick={toggleCols}
      >
        G
      </button>

      <div className="dev-label viewport-label" aria-hidden="true">
        <span className="viewport-label__value">{size.w}</span>
        <span className="viewport-label__sep">×</span>
        <span className="viewport-label__value">{size.h}</span>
      </div>

      <button
        type="button"
        className={`dev-label grid-label grid-label--rows${rows ? ' is-on' : ''}`}
        aria-pressed={rows}
        aria-label="Toggle row grid"
        title="Row grid · Shift+H"
        onClick={toggleRows}
      >
        H
      </button>
    </>
  );
}
