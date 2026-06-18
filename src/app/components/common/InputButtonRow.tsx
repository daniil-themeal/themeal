import type { ReactNode } from 'react';

import { COLOR_TOKENS } from './colorTokens';
import { FONT_SIZE_TOKENS } from './fontSizeTokens';
import { TEXT_TRIM_CLASS_NAME } from './textTrimTokens';

type InputButtonRowProps = {
  input: ReactNode;
  action: ReactNode;
  error?: ReactNode;
  align?: 'end' | 'center';
  className?: string;
  actionClassName?: string;
};

export function InputButtonRow({
  input,
  action,
  error,
  align = 'end',
  className = '',
  actionClassName = '',
}: InputButtonRowProps) {
  const rowAlignClassName = align === 'center' ? '@[280px]:items-center' : '@[280px]:items-end';
  const actionWrapperClassName = [
    'w-full @[280px]:w-auto',
    align === 'center' ? 'flex items-center @[280px]:h-[48px] @[280px]:self-center' : '',
    actionClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={[
        '@container flex w-full flex-col',
        error ? 'gap-[8px]' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        className={[
          'flex w-full flex-col gap-[12px] @[280px]:flex-row',
          rowAlignClassName,
        ].join(' ')}
      >
        <div className="min-w-0 flex-1">{input}</div>
        <div className={actionWrapperClassName}>
          {action}
        </div>
      </div>

      {error ? (
        <p
          className={[
            TEXT_TRIM_CLASS_NAME,
            'px-[2px] font-sans font-semibold leading-[150%]',
          ].join(' ')}
          style={{
            color: COLOR_TOKENS.danger[400],
            fontSize: FONT_SIZE_TOKENS[12],
          }}
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
