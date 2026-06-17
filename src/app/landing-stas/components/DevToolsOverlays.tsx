import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { GridOverlay } from './GridOverlay';
import { HorizontalSpacingOverlay } from './HorizontalSpacingOverlay';
import { SpacingOverlay } from './SpacingOverlay';
import { ViewportLabel } from './ViewportLabel';

export function DevToolsOverlays() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="landing-dev-tools">
      <GridOverlay />
      <SpacingOverlay />
      <HorizontalSpacingOverlay />
      <ViewportLabel />
    </div>,
    document.body,
  );
}
