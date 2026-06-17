import { useEffect, useRef } from 'react';

type EscapeLayer = {
  id: symbol;
  zIndex: number;
  order: number;
  handler: () => void;
};

const layers: EscapeLayer[] = [];
let sequence = 0;
let listenerAttached = false;

function getTopLayer(): EscapeLayer | undefined {
  if (layers.length === 0) return undefined;

  return layers.reduce((top, layer) => {
    if (layer.zIndex > top.zIndex) return layer;
    if (layer.zIndex === top.zIndex && layer.order > top.order) return layer;
    return top;
  });
}

function handleDocumentKeyDown(event: KeyboardEvent) {
  if (event.key !== 'Escape' || event.defaultPrevented) return;

  const top = getTopLayer();
  if (!top) return;

  event.preventDefault();
  event.stopPropagation();
  top.handler();
}

function attachListener() {
  if (listenerAttached || typeof document === 'undefined') return;
  listenerAttached = true;
  document.addEventListener('keydown', handleDocumentKeyDown);
}

function detachListener() {
  if (!listenerAttached || typeof document === 'undefined') return;
  listenerAttached = false;
  document.removeEventListener('keydown', handleDocumentKeyDown);
}

export function registerEscapeLayer(zIndex: number, handler: () => void): () => void {
  const id = Symbol('escape-layer');
  const order = ++sequence;

  layers.push({ id, zIndex, order, handler });
  attachListener();

  return () => {
    const index = layers.findIndex((layer) => layer.id === id);
    if (index >= 0) layers.splice(index, 1);
    if (layers.length === 0) detachListener();
  };
}

export function useEscapeLayer(active: boolean, zIndex: number, onEscape: () => void) {
  const onEscapeRef = useRef(onEscape);
  onEscapeRef.current = onEscape;

  useEffect(() => {
    if (!active) return;

    return registerEscapeLayer(zIndex, () => {
      onEscapeRef.current();
    });
  }, [active, zIndex]);
}
