import { COLOR_TOKENS } from './colorTokens';

export const NEUTRAL_USAGE_ROLES = [
  {
    role: 'text',
    token: 'neutral[900]',
    value: COLOR_TOKENS.neutral[900],
    usage: 'Primary text, headings, selected values',
  },
  {
    role: 'meta',
    token: 'neutral[500]',
    value: COLOR_TOKENS.neutral[500],
    usage: 'Subtitles, captions, secondary labels',
  },
  {
    role: 'placeholder',
    token: 'neutral[400]',
    value: COLOR_TOKENS.neutral[400],
    usage: 'Input placeholders, disabled hints',
  },
  {
    role: 'iconCatalog',
    token: 'neutral[900]',
    value: COLOR_TOKENS.neutral[900],
    usage: 'Reference display in Design System catalog (inherit via currentColor)',
  },
  {
    role: 'iconInline',
    token: 'neutral[500]',
    value: COLOR_TOKENS.neutral[500],
    usage: 'Icons in rows, hints, secondary UI (inherit via currentColor)',
  },
  {
    role: 'border',
    token: 'neutral[100]',
    value: COLOR_TOKENS.neutral[100],
    usage: 'Card borders, dividers, pill outlines',
  },
  {
    role: 'surface',
    token: 'neutral[50]',
    value: COLOR_TOKENS.neutral[50],
    usage: 'Field backgrounds, hover fills, page canvas',
  },
] as const;
