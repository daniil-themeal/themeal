import type { ReactNode } from 'react';

import { COLOR_TOKENS } from './colorTokens';
import { FONT_SIZE_TOKENS } from './fontSizeTokens';
import { TEXT_TRIM_CLASS_NAME } from './textTrimTokens';

type InputButtonRowProps = {
  input: ReactNode;
  action: ReactNode;
  error?: ReactNode;
  className?: string;
  actionClassName?: string;
};

export function InputButtonRow({
  input,
  action,
  error,
  className = '',
  actionClassName = '',
}: InputButtonRowProps) {
  return (
    <div
      className={[
        'flex w-full flex-col',
        error ? 'gap-[8px]' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex w-full flex-col gap-[12px] min-[400px]:flex-row min-[400px]:items-end">
        <div className="min-w-0 flex-1">{input}</div>
        <div
          className={['w-full shrink-0 min-[400px]:w-auto', actionClassName].filter(Boolean).join(' ')}
        >
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
