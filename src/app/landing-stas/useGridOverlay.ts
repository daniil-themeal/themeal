import { useSyncExternalStore } from 'react';

const COLS_KEY = 'landing-stas-grid-cols';
const ROWS_KEY = 'landing-stas-grid-rows';
const LEGACY_KEY = 'landing-stas-grid';
const LABELS_KEY = 'landing-stas-dev-labels';

export type GridState = { cols: boolean; rows: boolean };

function readInitialState(): GridState {
  if (typeof window === 'undefined') return { cols: false, rows: false };

  const params = new URLSearchParams(window.location.search);
  if (params.has('grid')) {
    const mode = params.get('grid');
    if (mode === 'rows' || mode === 'h') return { cols: false, rows: true };
    if (mode === 'cols' || mode === 'v') return { cols: true, rows: false };
    return { cols: true, rows: true };
  }

  const legacy = sessionStorage.getItem(LEGACY_KEY) === '1';
  return {
    cols: sessionStorage.getItem(COLS_KEY) === '1' || legacy,
    rows: sessionStorage.getItem(ROWS_KEY) === '1',
  };
}

let state: GridState = readInitialState();
const listeners = new Set<() => void>();

function readLabelsVisible(): boolean {
  if (typeof window === 'undefined') return true;
  return sessionStorage.getItem(LABELS_KEY) !== '0';
}

let labelsVisible = readLabelsVisible();
const labelListeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function emitLabels() {
  labelListeners.forEach((listener) => listener());
}

function subscribeLabels(listener: () => void) {
  labelListeners.add(listener);
  return () => labelListeners.delete(listener);
}

function getLabelsSnapshot() {
  return labelsVisible;
}

function getLabelsServerSnapshot() {
  return true;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return state;
}

function getServerSnapshot(): GridState {
  return { cols: false, rows: false };
}

function isTypingTarget(target: EventTarget | null) {
  const tag = (target as HTMLElement | null)?.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
}

export function toggleGridCols() {
  state = { ...state, cols: !state.cols };
  sessionStorage.setItem(COLS_KEY, state.cols ? '1' : '0');
  sessionStorage.removeItem(LEGACY_KEY);
  emit();
}

export function toggleGridRows() {
  state = { ...state, rows: !state.rows };
  sessionStorage.setItem(ROWS_KEY, state.rows ? '1' : '0');
  emit();
}

export function toggleDevLabels() {
  labelsVisible = !labelsVisible;
  sessionStorage.setItem(LABELS_KEY, labelsVisible ? '1' : '0');
  emitLabels();
}

function onKeyDown(event: KeyboardEvent) {
  if (!event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) return;
  if (isTypingTarget(event.target)) return;

  if (event.key === 'G') {
    event.preventDefault();
    toggleGridCols();
    return;
  }

  if (event.key === 'H') {
    event.preventDefault();
    toggleGridRows();
    return;
  }

  if (event.key === 'D') {
    event.preventDefault();
    toggleDevLabels();
  }
}

let keyboardAttached = false;

function attachKeyboard() {
  if (keyboardAttached || typeof window === 'undefined') return;
  keyboardAttached = true;
  window.addEventListener('keydown', onKeyDown);
}

export function useGridOverlay() {
  attachKeyboard();
  const grid = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const devLabelsVisible = useSyncExternalStore(subscribeLabels, getLabelsSnapshot, getLabelsServerSnapshot);

  return {
    cols: grid.cols,
    rows: grid.rows,
    devLabelsVisible,
    toggleCols: toggleGridCols,
    toggleRows: toggleGridRows,
    toggleDevLabels,
  };
}
