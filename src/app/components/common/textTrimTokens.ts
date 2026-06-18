/** CSS text-box trim used across form controls and typography surfaces. */
export const TEXT_TRIM_CLASS_NAME =
  '[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]';

/** Text-box trim for display typography that should size to its content. */
export const TEXT_TRIM_FIT_CLASS_NAME =
  '[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] h-fit';

/** Plain CSS pair — also applied globally in src/styles/index.css @layer base. */
export const TEXT_TRIM_CSS = {
  textBoxTrim: 'trim-both',
  textBoxEdge: 'cap alphabetic',
} as const;
