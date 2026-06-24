/**
 * TEMP: dev-tools master switch.
 * Defaults to ON for live testing, but can be toggled off at runtime via the
 * "Disable dev tools" button in the site navigation drawer. The choice is
 * persisted to localStorage and applied on the next page load.
 *
 * Revert this file to a hard-coded env-flag check before public launch.
 */

const STORAGE_KEY = 'dev-tools-enabled';
const DEFAULT_ENABLED = true;

function readStoredValue(): boolean {
  if (typeof window === 'undefined') return DEFAULT_ENABLED;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === '0') return false;
    if (raw === '1') return true;
  } catch {
    /* localStorage unavailable — fall through to default */
  }
  return DEFAULT_ENABLED;
}

export const isDevToolsEnabled = readStoredValue();

export function setDevToolsEnabled(value: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, value ? '1' : '0');
  } catch {
    /* ignore — without persistence the reload below would be useless */
    return;
  }
  window.location.reload();
}

export function toggleDevToolsEnabled(): void {
  setDevToolsEnabled(!isDevToolsEnabled);
}
