import type { ComponentPropsWithoutRef, CSSProperties, ElementType, ReactNode } from 'react';

import { COLOR_TOKENS } from './colorTokens';
import { FONT_SIZE_TOKENS } from './fontSizeTokens';

type FormLabelElement = 'label' | 'legend' | 'span' | 'div';

type FormLabelProps<TElement extends FormLabelElement = 'label'> = {
  as?: TElement;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
} & Omit<ComponentPropsWithoutRef<TElement>, 'as' | 'children' | 'className' | 'style'>;

type FormLabelCssVariables = CSSProperties & {
  '--form-label-font-size': string;
};

const formLabelStyle: FormLabelCssVariables = {
  '--form-label-font-size': FONT_SIZE_TOKENS[14],
};

export function FormLabel<TElement extends FormLabelElement = 'label'>({
  as,
  children,
  className = '',
  style,
  ...props
}: FormLabelProps<TElement>) {
  const Component = (as ?? 'label') as ElementType;

  const labelClassName = [
    "font-['Quicksand']",
    'text-[length:var(--form-label-font-size)]',
    'font-semibold',
    'leading-[120%]',
    'tracking-[0.14px]',
    'uppercase',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component
      className={labelClassName}
      style={{
        ...formLabelStyle,
        color: COLOR_TOKENS.neutral[500],
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}