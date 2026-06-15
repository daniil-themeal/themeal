export const COLOR_TOKENS = {
  base: {
    white: '#FFFFFF',
    cream: '#FBF8F3',
  },

  brand: {
    logoYellow: '#FCDE02',
  },

  primary: {
    50: '#F5EBFD',
    75: '#F0DFFF',
    100: '#E0C1FA',
    200: '#D1A3F8',
    300: '#BB7AF4',
    400: '#AE60F2',
    500: '#9A38EF',
    600: '#8C33D9',
    700: '#6D28AA',
    800: '#551F83',
    900: '#411864',
  },

  secondary: {
    50: '#FEEAF6',
    75: '#FAD8EE',
    100: '#FABDE4',
    200: '#F89DD7',
    300: '#F570C5',
    400: '#F354B9',
    500: '#F029A8',
    600: '#DA2599',
    700: '#AA1D77',
    800: '#84175C',
    900: '#651147',
  },

  neutral: {
    50: '#F3F4F7',
    75: '#E8EBEF',
    100: '#D9DEE5',
    200: '#C7CED9',
    300: '#ADB7C7',
    400: '#9DA9BD',
    500: '#8594AC',
    600: '#79879D',
    700: '#5E697A',
    800: '#49515F',
    900: '#383E48',
  },

  success: {
    50: '#F2FBEC',
    75: '#EEFFE1',
    100: '#D8F0C4',
    200: '#C4EAA9',
    300: '#A9E182',
    400: '#99DB6B',
    500: '#7FD24C',
    600: '#74BF45',
    700: '#5A9536',
    800: '#467329',
    900: '#36581F',
  },

  warning: {
    50: '#FFFBEF',
    75: '#FFF7E1',
    100: '#FEF2CF',
    200: '#FDECB8',
    300: '#FCE298',
    400: '#FCDD85',
    500: '#FBD569',
    600: '#E4C260',
    700: '#B2984B',
    800: '#8A753A',
    900: '#69592B',
  },

  orange: {
    50: '#FEF0EB',
    75: '#FFE9E0',
    100: '#FACEBE',
    200: '#F8B79F',
    300: '#F59575',
    400: '#F3815B',
    500: '#F06136',
    600: '#DA5931',
    700: '#A84526',
    800: '#84361D',
    900: '#652916',
  },

  danger: {
    50: '#FDE9E9',
    75: '#FFD2D3',
    100: '#F9BABB',
    200: '#F6989A',
    300: '#F2696C',
    400: '#EF4B51',
    500: '#EB1B2A',
    600: '#D61926',
    700: '#A8141E',
    800: '#821016',
    900: '#630C11',
  },

  info: {
    50: '#E6EEFD',
    75: '#C7D9F8',
    100: '#B0CAF7',
    200: '#89B1F4',
    300: '#528EEF',
    400: '#2F78ED',
    500: '#0058E9',
    600: '#0050D4',
    700: '#003EA5',
    800: '#003080',
    900: '#002562',
  },

  blue: {
    50: '#EFF9FE',
    75: '#DFF5FE',
    100: '#CCEDFA',
    200: '#B4E5F7',
    300: '#92D9F4',
    400: '#7DD2F2',
    500: '#5CC6EF',
    600: '#54B4D9',
    700: '#418DAA',
    800: '#336D83',
    900: '#275465',
  },
} as const;

export type ColorPaletteName = keyof typeof COLOR_TOKENS;

export type ColorTokenName<TPalette extends ColorPaletteName> =
  keyof (typeof COLOR_TOKENS)[TPalette];