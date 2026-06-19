export const Z_INDEX_TOKENS = {
  sticky: 20,
  checkout: 200,
  overlay: 300,
  modal: 400,
  toast: 500,
} as const;

/** Z-index scale inside the checkout shell (relative to checkout root). */
export const CHECKOUT_LAYER_Z_INDEX = {
  step: 0,
  stepFloat: 10,
  stepNotice: 20,
  resultOverlay: 30,
} as const;

export type ZIndexTokenName = keyof typeof Z_INDEX_TOKENS;
export type CheckoutLayerZIndexName = keyof typeof CHECKOUT_LAYER_Z_INDEX;
