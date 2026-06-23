import type { CSSProperties, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { CircularCloseButton } from './CircularCloseButton';
import { ModalShell, type ModalShellVariant } from './ModalShell';
import {
  MODAL_HEADER_HEIGHT,
  MODAL_INNER_CLASSNAME,
  modalTokensStyle,
  type ModalTokensCssVariables,
} from './modalTokens';
import { Z_INDEX_TOKENS } from './zIndexTokens';

type ModalShellPassthroughProps = {
  variant?: ModalShellVariant;
  zIndex?: number;
  rootClassName?: string;
  overlayClassName?: string;
  panelClassName?: string;
  panelStyle?: CSSProperties;
  sheetVerticalAlign?: 'bottom' | 'center-on-sm' | 'center-on-md';
  disableOverlayClick?: boolean;
  pointerEventsNoneWhenClosing?: boolean;
  onEscape?: () => boolean;
};

type ModalProps = ModalShellPassthroughProps & {
  isOpen: boolean;
  onClose: () => void;
  portal?: boolean;
  ariaLabel: string;
  title?: string;
  subtitle?: string;
  titleId?: string;
  closeAriaLabel?: string;
  showHeader?: boolean;
  showClose?: boolean;
  headerClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  headerStyle?: CSSProperties;
  innerClassName?: string;
  bodyClassName?: string;
  bodyWrapper?: boolean;
  footer?: ReactNode;
  footerClassName?: string;
  style?: ModalTokensCssVariables;
  children: ReactNode | ((requestClose: () => void) => ReactNode);
};

type ModalHeaderProps = {
  title?: string;
  subtitle?: string;
  titleId?: string;
  onClose?: () => void;
  closeAriaLabel?: string;
  showClose?: boolean;
  closeColors?: CSSProperties;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  style?: CSSProperties;
};

type ModalBodyProps = {
  children: ReactNode;
  className?: string;
};

type ModalFooterProps = {
  children: ReactNode;
  className?: string;
};

type ModalDialogProps = {
  children: ReactNode;
  ariaLabel: string;
  titleId?: string;
  className?: string;
  style?: CSSProperties;
};

type ModalCloseOverlayProps = {
  onClose: () => void;
  'aria-label': string;
  closeColors?: CSSProperties;
  iconClassName?: string;
  className?: string;
};

export function ModalHeader({
  title,
  subtitle,
  titleId,
  onClose,
  closeAriaLabel = 'Close',
  showClose = true,
  closeColors,
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  style,
}: ModalHeaderProps) {
  return (
    <div
      style={{
        ...style,
        height: MODAL_HEADER_HEIGHT,
        minHeight: MODAL_HEADER_HEIGHT,
        alignItems: 'center',
      }}
      className={[
        'flex shrink-0 gap-[8px] border-b border-[var(--modal-border)] bg-[var(--modal-bg)] items-center',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {title ? (
        <div className="flex min-w-0 flex-1 flex-col gap-[8px] self-center pl-[16px] sm:pl-[20px]">
          <p
            id={titleId}
            className={[
              'font-sans text-[length:var(--full-menu-heading-font-size,18px)] font-bold leading-[130%] text-[var(--modal-title)]',
              titleClassName,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {title}
          </p>
          {subtitle ? (
            <p
              className={[
                'font-sans text-[14px] font-medium leading-[140%] text-[var(--modal-muted)]',
                subtitleClassName,
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {subtitle}
            </p>
          ) : null}
        </div>
      ) : (
        <div className="min-w-0 flex-1" />
      )}

      {showClose && onClose ? (
        <CircularCloseButton
          onClick={onClose}
          aria-label={closeAriaLabel}
          style={closeColors}
        />
      ) : null}
    </div>
  );
}

export function ModalBody({ children, className = '' }: ModalBodyProps) {
  return (
    <div
      className={[
        'flex min-h-0 grow flex-col overflow-y-auto scrollbar-hide',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}

export function ModalFooter({ children, className = '' }: ModalFooterProps) {
  return (
    <div
      className={[
        'w-full shrink-0 border-t border-[var(--modal-border)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}

export function ModalDialog({
  children,
  ariaLabel,
  titleId,
  className = '',
  style,
}: ModalDialogProps) {
  return (
    <div
      style={style}
      className={className}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      aria-labelledby={titleId ?? undefined}
    >
      {children}
    </div>
  );
}

export function ModalCloseOverlay({
  onClose,
  'aria-label': ariaLabel,
  closeColors,
  iconClassName,
  className = '',
}: ModalCloseOverlayProps) {
  return (
    <CircularCloseButton
      onClick={onClose}
      aria-label={ariaLabel}
      style={closeColors}
      iconClassName={iconClassName}
      className={[
        'absolute top-0 right-0 z-10',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
}

export function Modal({
  isOpen,
  onClose,
  portal = true,
  ariaLabel,
  title,
  subtitle,
  titleId,
  closeAriaLabel = 'Close',
  showHeader = true,
  showClose = true,
  headerClassName = '',
  titleClassName = '',
  subtitleClassName = '',
  headerStyle,
  innerClassName = '',
  bodyClassName = '',
  bodyWrapper = true,
  footer,
  footerClassName = '',
  style,
  children,
  variant = 'bottom-sheet',
  zIndex = Z_INDEX_TOKENS.modal,
  rootClassName = '',
  overlayClassName = '',
  panelClassName = '',
  panelStyle,
  sheetVerticalAlign = 'center-on-md',
  disableOverlayClick = false,
  pointerEventsNoneWhenClosing = true,
  onEscape,
}: ModalProps) {
  if (!isOpen) return null;

  const mergedStyle = { ...modalTokensStyle, ...style };

  const content = (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      variant={variant}
      zIndex={zIndex}
      rootClassName={rootClassName}
      overlayClassName={overlayClassName}
      panelClassName={panelClassName}
      panelStyle={panelStyle}
      sheetVerticalAlign={sheetVerticalAlign}
      disableOverlayClick={disableOverlayClick}
      pointerEventsNoneWhenClosing={pointerEventsNoneWhenClosing}
      onEscape={onEscape}
    >
      {(requestClose) => {
        const resolvedChildren =
          typeof children === 'function' ? children(requestClose) : children;

        const hasBuiltInHeader = showHeader && Boolean(title || subtitle || showClose);

        return (
          <ModalDialog
            ariaLabel={ariaLabel}
            titleId={titleId}
            style={mergedStyle}
            className={[MODAL_INNER_CLASSNAME, innerClassName].filter(Boolean).join(' ')}
          >
            {hasBuiltInHeader ? (
              <ModalHeader
                title={title}
                subtitle={subtitle}
                titleId={titleId}
                onClose={requestClose}
                closeAriaLabel={closeAriaLabel}
                showClose={showClose}
                className={headerClassName}
                titleClassName={titleClassName}
                subtitleClassName={subtitleClassName}
                style={headerStyle}
              />
            ) : null}

            {bodyWrapper ? (
              <ModalBody className={bodyClassName}>{resolvedChildren}</ModalBody>
            ) : (
              resolvedChildren
            )}

            {footer ? (
              <ModalFooter className={footerClassName}>{footer}</ModalFooter>
            ) : null}
          </ModalDialog>
        );
      }}
    </ModalShell>
  );

  return portal ? createPortal(content, document.body) : content;
}
