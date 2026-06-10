export const Z_INDEX_TOKENS = {
  sticky: 20,
  checkout: 200,
  overlay: 300,
  modal: 400,
  toast: 500,
} as const;

export type ZIndexTokenName = keyof typeof Z_INDEX_TOKENS;
