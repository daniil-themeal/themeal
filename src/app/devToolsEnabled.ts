/** Temporarily enable dev overlays in production via VITE_ENABLE_DEV_TOOLS=true */
export const isDevToolsEnabled =
  import.meta.env.DEV || import.meta.env.VITE_ENABLE_DEV_TOOLS === 'true';
