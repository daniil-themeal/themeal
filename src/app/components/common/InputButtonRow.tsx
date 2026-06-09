import type { ReactNode } from 'react';

type InputButtonRowProps = {
  input: ReactNode;
  action: ReactNode;
  className?: string;
};

export function InputButtonRow({ input, action, className = '' }: InputButtonRowProps) {
  return (
    <div
      className={[
        'flex w-full flex-col gap-[12px] sm:flex-row sm:items-end',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="min-w-0 flex-1">{input}</div>
      <div className="w-full shrink-0 sm:w-auto">{action}</div>
    </div>
  );
}
