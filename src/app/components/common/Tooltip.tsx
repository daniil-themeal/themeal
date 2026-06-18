import {
  cloneElement,
  isValidElement,
  useState,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { BORDER_RADIUS_TOKENS } from './borderRadiusTokens';
import { COLOR_TOKENS } from './colorTokens';
import { FONT_SIZE_TOKENS } from './fontSizeTokens';
import { Z_INDEX_TOKENS } from './zIndexTokens';

type TooltipSide = 'top' | 'right' | 'bottom' | 'left';

type TooltipProps = {
  content: ReactNode;
  children: ReactElement;
  side?: TooltipSide;
  sideOffset?: number;
};

export function Tooltip({
  content,
  children,
  side = 'top',
  sideOffset = 8,
}: TooltipProps) {
  const [open, setOpen] = useState(false);

  if (!isValidElement(children)) {
    return children;
  }

  const trigger = cloneElement(children, {
    onClick: (event: MouseEvent<HTMLElement>) => {
      children.props.onClick?.(event);
      setOpen((previousOpen) => !previousOpen);
    },
  });

  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      <TooltipPrimitive.Root open={open} onOpenChange={setOpen}>
        <TooltipPrimitive.Trigger asChild>{trigger}</TooltipPrimitive.Trigger>

        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={sideOffset}
            className="max-w-[280px] px-[12px] py-[8px] font-sans text-[length:var(--tooltip-font-size)] font-semibold leading-[150%] text-[var(--tooltip-text)] shadow-[0_8px_24px_rgba(56,62,72,0.16)]"
            style={{
              zIndex: Z_INDEX_TOKENS.checkout,
              backgroundColor: COLOR_TOKENS.neutral[900],
              borderRadius: BORDER_RADIUS_TOKENS[8],
              ['--tooltip-font-size' as string]: FONT_SIZE_TOKENS[12],
              ['--tooltip-text' as string]: COLOR_TOKENS.base.white,
            }}
            onPointerDownOutside={() => setOpen(false)}
            onEscapeKeyDown={() => setOpen(false)}
          >
            {content}
            <TooltipPrimitive.Arrow
              width={12}
              height={6}
              style={{ fill: COLOR_TOKENS.neutral[900] }}
            />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
