import { SPACING_TOKENS } from './spacingTokens';
import { TEXT_TRIM_CLASS_NAME } from './textTrimTokens';

// Body text shares the legal page rhythm: 16px / 170% line-height. This styles
// the text block inside each <li>, not the <ul> container — the list element
// only owns layout (markers + spacing).
const proseListBody = 'font-sans text-[16px] leading-[170%] text-[var(--typography-text)]';

/**
 * Spacing rhythm for prose lists. Because the text block is cap-trimmed
 * (text-box-trim), the line-height's leading is removed at the top/bottom of
 * each item, so these gaps render as the exact visual spacing between rows.
 */
export const PROSE_LIST_SPACING = {
  itemGap: SPACING_TOKENS[16],
  nestedGap: SPACING_TOKENS[8],
  nestedIndent: SPACING_TOKENS[20],
} as const;

export const PROSE_LIST_TOKENS = {
  list: {
    label: 'Prose list',
    usage: 'Legal and policy pages — bulleted lists with labeled items',
    className: 'prose-list',
  },
  nestedList: {
    label: 'Prose nested list',
    usage: 'Secondary bullets under a labeled list item',
    className: 'prose-list prose-list--nested',
  },
  item: {
    label: 'Prose list item',
    usage: 'List row with label, description, and optional nested list',
    className: 'prose-list__item',
  },
  content: {
    label: 'Prose list item content',
    usage: 'Cap-trimmed text block (label + description) for even rhythm',
    className: ['prose-list__content', proseListBody, TEXT_TRIM_CLASS_NAME].join(' '),
  },
  itemLabel: {
    label: 'Prose list item label',
    usage: 'Bold category name before the colon in a list item',
    className: 'font-bold',
  },
  itemText: {
    label: 'Prose list item text',
    usage: 'Regular description after the label',
    className: 'font-medium',
  },
} as const;

export type ProseListTokenName = keyof typeof PROSE_LIST_TOKENS;

export const PROSE_LIST_TOKEN_NAMES = Object.keys(PROSE_LIST_TOKENS) as ProseListTokenName[];
