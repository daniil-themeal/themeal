import type { ReactNode } from 'react';

import { COLOR_TOKENS } from './colorTokens';
import { FONT_SIZE_TOKENS } from './fontSizeTokens';
import { TEXT_TRIM_CLASS_NAME } from './textTrimTokens';

type RowBreakpoint = 280 | 400;
type InputButtonRowLayoutMode = 'responsive' | 'row';

const ROW_LAYOUT_CLASSES: Record<
  RowBreakpoint,
  {
    flexRow: string;
    itemsStart: string;
    itemsCenter: string;
    itemsEnd: string;
    selfCenter: string;
    actionWidth: string;
    actionStart: string;
    actionCenter: string;
  }
> = {
  280: {
    flexRow: '@[280px]:flex-row',
    itemsStart: '@[280px]:items-start',
    itemsCenter: '@[280px]:items-center',
    itemsEnd: '@[280px]:items-end',
    selfCenter: '@[280px]:self-center',
    actionWidth: 'w-full @[280px]:w-auto @[280px]:shrink-0',
    actionStart: '@[280px]:self-start',
    actionCenter: 'flex items-center @[280px]:h-[48px] @[280px]:self-center',
  },
  400: {
    flexRow: '@[400px]:flex-row',
    itemsStart: '@[400px]:items-start',
    itemsCenter: '@[400px]:items-center',
    itemsEnd: '@[400px]:items-end',
    selfCenter: '@[400px]:self-center',
    actionWidth: 'w-full @[400px]:w-auto @[400px]:shrink-0',
    actionStart: '@[400px]:self-start',
    actionCenter: 'flex items-center @[400px]:h-[48px] @[400px]:self-center',
  },
};

type InputButtonRowProps = {
  input: ReactNode;
  action: ReactNode;
  error?: ReactNode;
  align?: 'start' | 'end' | 'center';
  layoutMode?: InputButtonRowLayoutMode;
  rowBreakpoint?: RowBreakpoint;
  className?: string;
  actionClassName?: string;
};

export function InputButtonRow({
  input,
  action,
  error,
  align = 'end',
  layoutMode = 'responsive',
  rowBreakpoint = 280,
  className = '',
  actionClassName = '',
}: InputButtonRowProps) {
  const rowLayout = ROW_LAYOUT_CLASSES[rowBreakpoint];
  const isFixedRow = layoutMode === 'row';
  const rowAlignClassName = isFixedRow
    ? align === 'start'
      ? 'items-start'
      : align === 'center'
        ? 'items-center'
        : 'items-end'
    : align === 'start'
      ? rowLayout.itemsStart
      : align === 'center'
        ? rowLayout.itemsCenter
        : rowLayout.itemsEnd;
  const inputWrapperClassName = [
    'min-w-0 flex-1',
    isFixedRow ? 'transition-[flex-basis,max-width] duration-200 ease-out' : '',
    !isFixedRow && align === 'center' ? rowLayout.selfCenter : '',
  ]
    .filter(Boolean)
    .join(' ');
  const actionWrapperClassName = isFixedRow
    ? [
        'w-auto shrink-0',
        align === 'start'
          ? 'self-start'
          : align === 'center'
            ? 'flex items-center h-[48px] self-center'
            : '',
        actionClassName,
      ]
        .filter(Boolean)
        .join(' ')
    : [
        rowLayout.actionWidth,
        align === 'start'
          ? rowLayout.actionStart
          : align === 'center'
            ? rowLayout.actionCenter
            : '',
        actionClassName,
      ]
        .filter(Boolean)
        .join(' ');
  const rowClassName = isFixedRow
    ? ['flex w-full flex-row gap-[12px]', rowAlignClassName].join(' ')
    : ['flex w-full flex-col gap-[12px]', rowLayout.flexRow, rowAlignClassName].join(' ');

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
      <div className={rowClassName}>
        <div className={inputWrapperClassName}>{input}</div>
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
