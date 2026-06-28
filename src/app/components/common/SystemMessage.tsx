import type { CSSProperties, ReactNode } from 'react';

import { Button } from './Button';
import { BORDER_RADIUS_TOKENS } from './borderRadiusTokens';
import { COLOR_TOKENS } from './colorTokens';
import { AlertTriangleIcon } from './icons/feather/AlertTriangleIcon';
import { CheckCircleIcon } from './icons/feather/CheckCircleIcon';
import { InfoIcon } from './icons/feather/InfoIcon';
import { TEXT_TRIM_CLASS_NAME } from './textTrimTokens';

export const SYSTEM_MESSAGE_VARIANTS = ['success', 'warning', 'info'] as const;

export type SystemMessageVariant = (typeof SYSTEM_MESSAGE_VARIANTS)[number];

type SystemMessageAction = {
  label: ReactNode;
  onClick: () => void;
};

type SystemMessageCssVariables = CSSProperties & {
  '--system-message-bg': string;
  '--system-message-icon': string;
  '--system-message-title': string;
  '--system-message-text': string;
};

const VARIANT_STYLES: Record<SystemMessageVariant, SystemMessageCssVariables> = {
  success: {
    '--system-message-bg': COLOR_TOKENS.success[50],
    '--system-message-icon': COLOR_TOKENS.success[500],
    '--system-message-title': COLOR_TOKENS.neutral[900],
    '--system-message-text': COLOR_TOKENS.neutral[700],
  },
  warning: {
    '--system-message-bg': COLOR_TOKENS.warning[50],
    '--system-message-icon': COLOR_TOKENS.warning[600],
    '--system-message-title': COLOR_TOKENS.neutral[900],
    '--system-message-text': COLOR_TOKENS.neutral[700],
  },
  info: {
    '--system-message-bg': COLOR_TOKENS.info[50],
    '--system-message-icon': COLOR_TOKENS.info[500],
    '--system-message-title': COLOR_TOKENS.neutral[900],
    '--system-message-text': COLOR_TOKENS.neutral[700],
  },
};

const DEFAULT_ICONS: Record<SystemMessageVariant, ReactNode> = {
  success: <CheckCircleIcon size={20} />,
  warning: <AlertTriangleIcon size={20} />,
  info: <InfoIcon size={20} />,
};

type SystemMessageProps = {
  variant?: SystemMessageVariant;
  title?: ReactNode;
  children?: ReactNode;
  icon?: ReactNode;
  showIcon?: boolean;
  primaryAction?: SystemMessageAction;
  secondaryAction?: SystemMessageAction;
  className?: string;
};

export function SystemMessage({
  variant = 'info',
  title,
  children,
  icon,
  showIcon = true,
  primaryAction,
  secondaryAction,
  className = '',
}: SystemMessageProps) {
  const hasActions = Boolean(primaryAction || secondaryAction);
  const resolvedIcon = icon ?? DEFAULT_ICONS[variant];

  return (
    <div
      className={[
        'flex w-full items-start gap-[12px] rounded-[length:var(--system-message-radius)] bg-[var(--system-message-bg)] p-[16px]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        ...VARIANT_STYLES[variant],
        '--system-message-radius': BORDER_RADIUS_TOKENS[12],
      }}
      role={variant === 'warning' ? 'alert' : 'status'}
    >
      {showIcon ? (
        <span
          className="flex shrink-0 items-center justify-center [&>svg]:size-[20px]"
          style={{ color: 'var(--system-message-icon)' }}
          aria-hidden
        >
          {resolvedIcon}
        </span>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col gap-[8px]">
        {title ? (
          <p
            className={[
              TEXT_TRIM_CLASS_NAME,
              'font-sans text-[16px] font-semibold leading-[130%]',
            ].join(' ')}
            style={{ color: 'var(--system-message-title)' }}
          >
            {title}
          </p>
        ) : null}

        {children ? (
          <div
            className={[
              TEXT_TRIM_CLASS_NAME,
              'font-sans text-[14px] font-semibold leading-[140%]',
            ].join(' ')}
            style={{ color: 'var(--system-message-text)' }}
          >
            {children}
          </div>
        ) : null}

        {hasActions ? (
          <div className="flex flex-wrap items-center gap-[8px] pt-[4px]">
            {primaryAction ? (
              <Button type="button" variant="primary" size="small" onClick={primaryAction.onClick}>
                {primaryAction.label}
              </Button>
            ) : null}

            {secondaryAction ? (
              <Button
                type="button"
                variant="neutral"
                outline
                size="small"
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.label}
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
