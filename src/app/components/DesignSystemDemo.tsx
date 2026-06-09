import { useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

import { Badge, BADGE_VARIANTS } from './common/Badge';
import { Button, BUTTON_SIZE_LABELS, BUTTON_SIZES, BUTTON_VARIANTS } from './common/Button';
import { Checkbox } from './common/Checkbox';
import { CHECKBOX_SIZE_LABELS, CHECKBOX_SIZES } from './common/checkboxSizeTokens';
import { COLOR_TOKENS } from './common/colorTokens';
import { Divider } from './common/Divider';
import { Dropdown } from './common/Dropdown';
import { FIELD_SIZE_LABELS, FIELD_SIZES } from './common/fieldSizeTokens';
import { BORDER_RADIUS_TOKENS } from './common/borderRadiusTokens';
import {
  FONT_FAMILY_CLASS_NAMES,
  FONT_FAMILY_TOKENS,
  getFontFamilyStyle,
  type FontFamilyTokenName,
} from './common/fontFamilyTokens';
import { FONT_SIZE_TOKENS } from './common/fontSizeTokens';
import { FormLabel } from './common/FormLabel';
import { InputButtonRow } from './common/InputButtonRow';
import { PromoCodeBlock } from './common/PromoCodeBlock';
import { PayMethodCard } from './common/PayMethodCard';
import {
  PAYMENT_METHODS,
  PaymentMethodSelector,
  type PaymentMethodId,
} from './common/PaymentMethodSelector';
import { PlanTariffSummary } from './common/PlanTariffSummary';
import { getPlanTariffChips, getPlanTariffTitle } from './common/planTariffSummaryUtils';
import { TextArea, TEXT_AREA_STATES } from './common/TextArea';
import { TextInput, TEXT_INPUT_STATES } from './common/TextInput';
import {
  PAYMENT_METHOD_BRAND_ICON_IDS,
  PAYMENT_METHOD_CARD_ICON_FILE_NAMES,
  PAYMENT_METHOD_CARD_ICON_SHADE_MAP,
  PAYMENT_METHOD_CARD_ICON_VARIANTS,
  PAYMENT_METHOD_ICON_FILE_NAMES,
  PAYMENT_METHOD_ICON_IDS,
  PAYMENT_METHOD_ICON_LABELS,
  PAYMENT_METHOD_ICON_SLOT_SIZE_PX,
  PAYMENT_METHOD_ICON_TILE_SIZE_PX,
} from './common/paymentMethodIconTokens';
import {
  PaymentMethodBrandIcon,
  PaymentMethodCardIcon,
  PaymentMethodIcon,
} from './common/icons/PaymentMethodIcons';
import { CheckoutHeader } from './checkout/CheckoutHeader';

type DesignSystemDemoProps = {
  onClose: () => void;
};

type PageSectionId = 'foundations' | 'forms' | 'actions' | 'indicators';

type DemoAnchorId =
  | PageSectionId
  | 'color-tokens'
  | 'font-size-tokens'
  | 'border-radius-tokens'
  | 'payment-method-icon-tokens'
  | 'form-label'
  | 'text-input'
  | 'input-button-row'
  | 'promo-code-block'
  | 'text-area'
  | 'checkbox'
  | 'divider'
  | 'dropdown'
  | 'plan-tariff-summary'
  | 'pay-method-card'
  | 'payment-method-selector'
  | 'button-variants'
  | 'button-sizes'
  | 'button-icons'
  | 'badge-variants';

type DemoNavigationItem = {
  id: PageSectionId;
  label: string;
  children: Array<{
    id: DemoAnchorId;
    label: string;
  }>;
};

type DemoCssVariables = CSSProperties & {
  '--demo-page-bg': string;
  '--demo-card-bg': string;
  '--demo-card-soft-bg': string;
  '--demo-card-border': string;
  '--demo-title': string;
  '--demo-body': string;
  '--demo-muted': string;
  '--demo-subtle': string;
  '--demo-shadow': string;
};

const demoNavigationItems: DemoNavigationItem[] = [
  {
    id: 'foundations',
    label: 'Foundations',
    children: [
      { id: 'color-tokens', label: 'Color tokens' },
      { id: 'font-size-tokens', label: 'Font size tokens' },
      { id: 'border-radius-tokens', label: 'Border radius tokens' },
      { id: 'payment-method-icon-tokens', label: 'Payment method icons' },
    ],
  },
  {
    id: 'forms',
    label: 'Forms',
    children: [
      { id: 'form-label', label: 'FormLabel' },
      { id: 'text-input', label: 'TextInput' },
      { id: 'input-button-row', label: 'InputButtonRow' },
      { id: 'promo-code-block', label: 'PromoCodeBlock' },
      { id: 'payment-method-selector', label: 'Payment method selector' },
      { id: 'text-area', label: 'TextArea' },
      { id: 'dropdown', label: 'Dropdown' },
      { id: 'checkbox', label: 'Checkbox' },
      { id: 'divider', label: 'Divider' },
    ],
  },
  {
    id: 'actions',
    label: 'Actions',
    children: [
      { id: 'plan-tariff-summary', label: 'PlanTariffSummary' },
      { id: 'pay-method-card', label: 'PayMethodCard' },
      { id: 'button-variants', label: 'Button variants' },
      { id: 'button-sizes', label: 'Button sizes' },
      { id: 'button-icons', label: 'Button icons' },
    ],
  },
  {
    id: 'indicators',
    label: 'Indicators',
    children: [
      { id: 'badge-variants', label: 'Badge variants' },
    ],
  },
];

function hexToRgba(hex: string, alpha: number) {
  const normalizedHex = hex.replace('#', '');

  const red = Number.parseInt(normalizedHex.slice(0, 2), 16);
  const green = Number.parseInt(normalizedHex.slice(2, 4), 16);
  const blue = Number.parseInt(normalizedHex.slice(4, 6), 16);

  return `rgba(${red},${green},${blue},${alpha})`;
}

const demoCssVariables: DemoCssVariables = {
  '--demo-page-bg': COLOR_TOKENS.neutral[50],
  '--demo-card-bg': COLOR_TOKENS.base.white,
  '--demo-card-soft-bg': COLOR_TOKENS.neutral[50],
  '--demo-card-border': COLOR_TOKENS.neutral[75],
  '--demo-title': COLOR_TOKENS.primary[900],
  '--demo-body': COLOR_TOKENS.neutral[900],
  '--demo-muted': COLOR_TOKENS.neutral[500],
  '--demo-subtle': COLOR_TOKENS.neutral[400],
  '--demo-shadow': hexToRgba(COLOR_TOKENS.neutral[900], 0.08),
};

function PageSection({
  id,
  title,
  description,
  children,
}: {
  id: PageSectionId;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-[96px]">
      <div className="mb-[20px]">
        <p className="mb-[6px] font-sans text-[12px] font-bold uppercase leading-[130%] tracking-[0.12px] text-[var(--demo-subtle)]">
          Section
        </p>

        <h2 className="font-sans text-[32px] font-bold leading-[130%] tracking-[-0.64px] text-[var(--demo-title)]">
          {title}
        </h2>

        <p className="mt-[6px] max-w-[640px] font-sans text-[16px] font-semibold leading-[150%] text-[var(--demo-muted)]">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-2">{children}</div>
    </section>
  );
}

function DemoCard({
  id,
  title,
  description,
  className = '',
  children,
}: {
  id?: DemoAnchorId;
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={[
        'scroll-mt-[96px] rounded-[20px] border border-[var(--demo-card-border)] bg-[var(--demo-card-bg)] p-[24px]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="mb-[20px]">
        <h3 className="font-sans text-[20px] font-bold leading-[130%] text-[var(--demo-title)]">
          {title}
        </h3>

        {description ? (
          <p className="mt-[4px] font-sans text-[14px] font-semibold leading-[145%] text-[var(--demo-muted)]">
            {description}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-[20px]">{children}</div>
    </section>
  );
}

function DemoSubheading({ children }: { children: ReactNode }) {
  return (
    <p className="font-sans text-[14px] font-semibold leading-[140%] text-[var(--demo-muted)]">
      {children}
    </p>
  );
}

function CodeLabel({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-[6px] bg-[var(--demo-card-soft-bg)] px-[6px] py-[2px] font-mono text-[12px] font-semibold text-[var(--demo-body)]">
      {children}
    </code>
  );
}

function capitalizeWord(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function DemoMobileNavigation() {
  const quickLinks = demoNavigationItems.flatMap((item) => item.children);

  return (
    <nav className="sticky top-[56px] z-20 border-b border-[var(--demo-card-border)] bg-[var(--demo-page-bg)] px-[20px] py-[12px] xl:hidden">
      <div className="mx-auto flex max-w-[1200px] gap-[8px] overflow-x-auto pb-[2px] scrollbar-hide">
        {quickLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className="shrink-0 rounded-[999px] border border-[var(--demo-card-border)] bg-[var(--demo-card-bg)] px-[12px] py-[6px] font-sans text-[12px] font-semibold leading-[130%] text-[var(--demo-body)] transition-colors hover:bg-[var(--demo-card-soft-bg)]"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function DemoNavigation() {
  return (
    <aside className="fixed right-[20px] top-[76px] z-20 hidden w-[176px] xl:block">
      <nav className="rounded-[18px] border border-[var(--demo-card-border)] bg-[var(--demo-card-bg)] p-[12px] shadow-[0_12px_32px_var(--demo-shadow)]">
        <p className="mb-[8px] px-[10px] font-sans text-[12px] font-bold uppercase leading-[130%] tracking-[0.12px] text-[var(--demo-subtle)]">
          Sections
        </p>

        <div className="flex flex-col gap-[10px]">
          {demoNavigationItems.map((item) => (
            <div key={item.id} className="flex flex-col gap-[2px]">
              <a
                href={`#${item.id}`}
                className="rounded-[10px] px-[10px] py-[8px] font-sans text-[14px] font-bold leading-[130%] text-[var(--demo-body)] transition-colors hover:bg-[var(--demo-card-soft-bg)]"
              >
                {item.label}
              </a>

              <div className="ml-[10px] flex flex-col border-l border-[var(--demo-card-border)] pl-[8px]">
                {item.children.map((child) => (
                  <a
                    key={child.id}
                    href={`#${child.id}`}
                    className="rounded-[8px] px-[8px] py-[6px] font-sans text-[12px] font-semibold leading-[130%] text-[var(--demo-muted)] transition-colors hover:bg-[var(--demo-card-soft-bg)] hover:text-[var(--demo-body)]"
                  >
                    {child.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
}

function ColorTokenRow({
  name,
  value,
}: {
  name: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-[12px]">
      <span
        className="size-[28px] shrink-0 rounded-full border border-[var(--demo-card-border)]"
        style={{ backgroundColor: value }}
        aria-hidden="true"
      />

      <div className="flex min-w-0 flex-1 items-baseline justify-between gap-[12px]">
        <span className="font-sans text-[14px] font-bold leading-[130%] text-[var(--demo-body)]">
          {name}
        </span>

        <span className="font-sans text-[12px] font-semibold leading-[130%] text-[var(--demo-muted)]">
          {value}
        </span>
      </div>
    </div>
  );
}

function ColorPalette({
  title,
  colors,
}: {
  title: string;
  colors: Record<string, string>;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-[12px] rounded-[12px] bg-[var(--demo-card-soft-bg)] p-[16px]">
      <DemoSubheading>{title}</DemoSubheading>

      <div className="flex flex-col gap-[10px]">
        {Object.entries(colors).map(([token, value]) => (
          <ColorTokenRow key={token} name={`${title}-${token}`} value={value} />
        ))}
      </div>
    </div>
  );
}

function FontFamilyTokenRow({
  token,
  value,
}: {
  token: FontFamilyTokenName;
  value: string;
}) {
  const utilityClass =
    FONT_FAMILY_CLASS_NAMES[token as keyof typeof FONT_FAMILY_CLASS_NAMES];

  return (
    <div className="flex flex-col gap-[8px] rounded-[12px] bg-[var(--demo-card-soft-bg)] p-[16px]">
      <div className="flex items-baseline justify-between gap-[12px]">
        <DemoSubheading>
          <CodeLabel>{`FONT_FAMILY_TOKENS.${token}`}</CodeLabel>
        </DemoSubheading>

        <span className="font-sans text-[12px] font-semibold leading-[130%] text-[var(--demo-muted)]">
          {utilityClass ?? 'style'}
        </span>
      </div>

      <p
        className={[
          utilityClass,
          'text-[20px] font-bold leading-[130%] text-[var(--demo-body)]',
        ]
          .filter(Boolean)
          .join(' ')}
        style={utilityClass ? undefined : getFontFamilyStyle(token)}
      >
        {value}
      </p>
    </div>
  );
}

function FontSizeTokenRow({
  token,
  value,
}: {
  token: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-[8px] rounded-[12px] bg-[var(--demo-card-soft-bg)] p-[16px]">
      <div className="flex items-baseline justify-between gap-[12px]">
        <DemoSubheading>
          <CodeLabel>{`FONT_SIZE_TOKENS[${token}]`}</CodeLabel>
        </DemoSubheading>

        <span className="font-sans text-[12px] font-semibold leading-[130%] text-[var(--demo-muted)]">
          {value}
        </span>
      </div>

      <p
        className="font-sans font-bold leading-[130%] text-[var(--demo-body)]"
        style={{ fontSize: value }}
      >
        The quick brown fox {value}
      </p>
    </div>
  );
}

function getBorderRadiusTokenLabel(token: string) {
  return token === 'full'
    ? "BORDER_RADIUS_TOKENS['full']"
    : `BORDER_RADIUS_TOKENS[${token}]`;
}

function BorderRadiusTokenRow({
  token,
  value,
}: {
  token: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-[8px] rounded-[12px] bg-[var(--demo-card-soft-bg)] p-[16px]">
      <div className="flex items-baseline justify-between gap-[12px]">
        <DemoSubheading>
          <CodeLabel>{getBorderRadiusTokenLabel(token)}</CodeLabel>
        </DemoSubheading>

        <span className="font-sans text-[12px] font-semibold leading-[130%] text-[var(--demo-muted)]">
          {value}
        </span>
      </div>

      <div
        className="h-[56px] w-full border border-[var(--demo-card-border)] bg-[var(--demo-subtle)]"
        style={{ borderRadius: value }}
      />
    </div>
  );
}

function PaymentMethodCardIconTokenRow({
  variant,
}: {
  variant: (typeof PAYMENT_METHOD_CARD_ICON_VARIANTS)[number];
}) {
  const shades = PAYMENT_METHOD_CARD_ICON_SHADE_MAP[variant];

  return (
    <div className="flex items-center gap-[16px] rounded-[12px] bg-[var(--demo-card-soft-bg)] p-[16px]">
      <div
        className="flex shrink-0 items-center justify-center rounded-[8px] border border-[var(--demo-card-border)] bg-[var(--demo-card-bg)]"
        style={{
          width: PAYMENT_METHOD_ICON_SLOT_SIZE_PX,
          height: PAYMENT_METHOD_ICON_SLOT_SIZE_PX,
        }}
      >
        <PaymentMethodCardIcon variant={variant} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-[4px]">
        <DemoSubheading>
          <CodeLabel>{`PAYMENT_METHOD_CARD_ICON_VARIANTS · "${variant}"`}</CodeLabel>
        </DemoSubheading>

        <p className="font-sans text-[14px] font-semibold leading-[140%] text-[var(--demo-body)]">
          {PAYMENT_METHOD_ICON_LABELS.card}
        </p>

        <p className="font-sans text-[12px] font-medium leading-[140%] text-[var(--demo-muted)]">
          {PAYMENT_METHOD_CARD_ICON_FILE_NAMES[variant]}
        </p>

        <p className="font-sans text-[12px] font-medium leading-[140%] text-[var(--demo-muted)]">
          {`fill ${shades.fill} · stripe ${shades.stripe}`}
        </p>
      </div>
    </div>
  );
}

function PaymentMethodIconTokenRow({
  id,
  variant = 'tile',
}: {
  id: (typeof PAYMENT_METHOD_ICON_IDS)[number] | (typeof PAYMENT_METHOD_BRAND_ICON_IDS)[number];
  variant?: 'tile' | 'brand-badge';
}) {
  const tokenLabel =
    variant === 'brand-badge'
      ? `PAYMENT_METHOD_BRAND_ICON_IDS · "${id}"`
      : `PAYMENT_METHOD_ICON_IDS · "${id}"`;

  return (
    <div className="flex items-center gap-[16px] rounded-[12px] bg-[var(--demo-card-soft-bg)] p-[16px]">
      <div
        className="flex shrink-0 items-center justify-center rounded-[8px] border border-[var(--demo-card-border)] bg-[var(--demo-card-bg)]"
        style={{
          width: PAYMENT_METHOD_ICON_SLOT_SIZE_PX,
          height: PAYMENT_METHOD_ICON_SLOT_SIZE_PX,
        }}
      >
        {variant === 'brand-badge' ? (
          <PaymentMethodBrandIcon brand={id} />
        ) : (
          <PaymentMethodIcon method={id} />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-[4px]">
        <DemoSubheading>
          <CodeLabel>{tokenLabel}</CodeLabel>
        </DemoSubheading>

        <p className="font-sans text-[14px] font-semibold leading-[140%] text-[var(--demo-body)]">
          {PAYMENT_METHOD_ICON_LABELS[id]}
        </p>

        <p className="font-sans text-[12px] font-medium leading-[140%] text-[var(--demo-muted)]">
          {PAYMENT_METHOD_ICON_FILE_NAMES[id]}
        </p>
      </div>
    </div>
  );
}

export default function DesignSystemDemo({ onClose }: DesignSystemDemoProps) {
  const [email, setEmail] = useState('email@themeal.menu');
  const [name, setName] = useState('');
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('');
  const [dropdownWithIconValue, setDropdownWithIconValue] = useState('monthly');
  const [instructions, setInstructions] = useState(
    'Tower B, gate 2 from main road, blue door at end of hallway',
  );
  const [promoCode, setPromoCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>('card');

  return (
    <div
      className="fixed inset-0 z-50 overflow-auto bg-[var(--demo-page-bg)]"
      style={demoCssVariables}
    >
      <div className="sticky top-0 z-30 shrink-0">
        <CheckoutHeader
          title="Design System Demo"
          closeAriaLabel="Close design system demo"
          onBack={() => undefined}
          onClose={onClose}
        />
      </div>

      <DemoMobileNavigation />
      <DemoNavigation />

      <main className="mx-auto flex max-w-[1200px] flex-col gap-[56px] px-[20px] py-[48px] xl:mr-[216px]">
        <p className="font-sans text-[14px] font-semibold leading-[140%] text-[var(--demo-muted)]">
          Foundations, form controls, and actions
        </p>
        <PageSection
          id="foundations"
          title="Foundations"
          description="Base design tokens used by components. These are raw palettes and primitive scales, not full component styles."
        >
          <DemoCard
            id="color-tokens"
            title="Color tokens"
            description="Shared palettes exposed as canonical token names."
            className="lg:col-span-2"
          >
            <div className="grid grid-cols-1 gap-[16px] md:grid-cols-2 2xl:grid-cols-3">
              {Object.entries(COLOR_TOKENS).map(([paletteName, colors]) => (
                <ColorPalette
                  key={paletteName}
                  title={paletteName}
                  colors={colors}
                />
              ))}
            </div>
          </DemoCard>

          <DemoCard
            id="font-size-tokens"
            title="Font size tokens"
            description="Current approved primitive font-size scale: 12 / 14 / 16 / 20 / 25 / 32 / 40."
            className="lg:col-span-2"
          >
            <div className="grid grid-cols-1 gap-[16px] md:grid-cols-2">
              {Object.entries(FONT_SIZE_TOKENS).map(([token, value]) => (
                <FontSizeTokenRow key={token} token={token} value={value} />
              ))}
            </div>
          </DemoCard>

          <DemoCard
            id="font-family-tokens"
            title="Font family tokens"
            description="Quicksand is the primary brand font. Arial is the fallback across the project."
            className="lg:col-span-2"
          >
            <div className="grid grid-cols-1 gap-[16px] md:grid-cols-2">
              {(
                Object.entries(FONT_FAMILY_TOKENS) as Array<
                  [FontFamilyTokenName, string]
                >
              ).map(([token, value]) => (
                <FontFamilyTokenRow key={token} token={token} value={value} />
              ))}
            </div>
          </DemoCard>

          <DemoCard
            id="border-radius-tokens"
            title="Border radius tokens"
            description="Current approved primitive border-radius scale: 2 / 4 / 8 / 12 / 16 / 24 / 32 / full."
            className="lg:col-span-2"
          >
            <div className="grid grid-cols-1 gap-[16px] md:grid-cols-2">
              {Object.entries(BORDER_RADIUS_TOKENS).map(([token, value]) => (
                <BorderRadiusTokenRow key={token} token={token} value={value} />
              ))}
            </div>
          </DemoCard>

          <DemoCard
            id="payment-method-icon-tokens"
            title="Payment method icon tokens"
            description={`Figma Property 1 tiles (${PAYMENT_METHOD_ICON_TILE_SIZE_PX}×${PAYMENT_METHOD_ICON_TILE_SIZE_PX}) centered in a ${PAYMENT_METHOD_ICON_SLOT_SIZE_PX}×${PAYMENT_METHOD_ICON_SLOT_SIZE_PX} slot.`}
            className="lg:col-span-2"
          >
            <div className="grid grid-cols-1 gap-[16px] md:grid-cols-2">
              {PAYMENT_METHOD_CARD_ICON_VARIANTS.map((variant) => (
                <PaymentMethodCardIconTokenRow key={variant} variant={variant} />
              ))}

              {PAYMENT_METHOD_ICON_IDS.filter((id) => id !== 'card').map((id) => (
                <PaymentMethodIconTokenRow key={id} id={id} />
              ))}

              {PAYMENT_METHOD_BRAND_ICON_IDS.map((id) => (
                <PaymentMethodIconTokenRow key={id} id={id} variant="brand-badge" />
              ))}
            </div>
          </DemoCard>
        </PageSection>

        <PageSection
          id="forms"
          title="Forms"
          description="Reusable form primitives. TextInput stays single-line; TextArea owns multiline behavior."
        >
          <DemoCard id="form-label" title="FormLabel">
            <div className="flex flex-col gap-[12px]">
              <FormLabel>Email *</FormLabel>
              <FormLabel as="legend">Delivery details</FormLabel>
              <FormLabel as="span">Optional comment</FormLabel>
            </div>
          </DemoCard>

          <DemoCard
            id="text-input"
            title="TextInput"
            description="Sizes: small (40px) and large (48px, default)."
          >
            <div className="grid grid-cols-1 gap-[16px] md:grid-cols-2">
              {FIELD_SIZES.map((size) => (
                <div key={size} className="flex flex-col gap-[8px]">
                  <DemoSubheading>
                    <CodeLabel>{`size="${size}"`}</CodeLabel>
                    <span className="font-sans text-[14px] font-semibold leading-[140%] text-[var(--demo-muted)]">
                      {` · ${FIELD_SIZE_LABELS[size]}`}
                    </span>
                  </DemoSubheading>

                  <TextInput
                    id={`demo-email-${size}`}
                    size={size}
                    label="E-mail *"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="email@themeal.menu"
                  />
                </div>
              ))}
            </div>

            <TextInput
              id="demo-email"
              label="E-mail *"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="email@themeal.menu"
            />

            <TextInput
              id="demo-name"
              label="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              hint="This is a helper text example."
            />

            {TEXT_INPUT_STATES.map((state) => (
              <TextInput
                key={state}
                id={`demo-${state}`}
                label={`${state} state`}
                value={state === 'error' ? '' : 'email@themeal.menu'}
                onChange={() => undefined}
                state={state}
                error={state === 'error' ? 'Please enter a valid value.' : undefined}
                counter={state === 'error' ? '0/500' : undefined}
              />
            ))}

            <TextInput
              id="demo-disabled"
              label="Disabled state"
              value="email@themeal.menu"
              onChange={() => undefined}
              disabled
            />

            <TextInput
              id="demo-left-icon"
              label="With left icon"
              value=""
              onChange={() => undefined}
              placeholder="Search address…"
              leftIcon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path d="M10 1.667A5.833 5.833 0 0 0 4.167 7.5C4.167 12.083 10 18.333 10 18.333s5.833-6.25 5.833-10.833A5.833 5.833 0 0 0 10 1.667Z" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="10" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              }
            />

            <TextInput
              id="demo-right-icon"
              label="With right icon"
              value="email@themeal.menu"
              onChange={() => undefined}
              rightIcon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              }
            />
          </DemoCard>

          <DemoCard
            id="input-button-row"
            title="InputButtonRow"
            description="Primitive row: TextInput and Button aligned to the bottom. Compose into higher-level blocks such as PromoCodeBlock."
          >
            <InputButtonRow
              input={
                <TextInput
                  id="demo-input-button-row"
                  label="Field label"
                  placeholder="Placeholder"
                />
              }
              action={
                <Button type="button" variant="neutral" size="48" className="w-full sm:w-[140px]">
                  Action
                </Button>
              }
            />
          </DemoCard>

          <DemoCard
            id="promo-code-block"
            title="PromoCodeBlock"
            description="Checkout promo code section built from FormLabel, TextInput, PromoCodeIcon, InputButtonRow, and Button."
          >
            <PromoCodeBlock
              id="demo-promo-code"
              value={promoCode}
              onChange={setPromoCode}
            />
          </DemoCard>

          <DemoCard
            id="payment-method-selector"
            title="PaymentMethodSelector"
            description="Selectable payment method row with icon, title, optional subtitle, and radio check indicator."
            className="lg:col-span-2"
          >
            <div className="flex flex-col gap-[16px]">
              <div className="flex flex-col gap-[8px]">
                <DemoSubheading>
                  <CodeLabel>default</CodeLabel>
                </DemoSubheading>

                {PAYMENT_METHODS.map((method) => (
                  <PaymentMethodSelector
                    key={method}
                    method={method}
                    selected={paymentMethod === method}
                    onSelect={() => setPaymentMethod(method)}
                  />
                ))}
              </div>

              <div className="flex flex-col gap-[8px]">
                <DemoSubheading>
                  <CodeLabel>disabled</CodeLabel>
                </DemoSubheading>

                <PaymentMethodSelector
                  method="apple-pay"
                  selected={false}
                  disabled
                  onSelect={() => undefined}
                />

                <PaymentMethodSelector
                  method="tabby"
                  selected={false}
                  disabled
                  onSelect={() => undefined}
                />
              </div>
            </div>
          </DemoCard>

          <DemoCard
            id="text-area"
            title="TextArea"
            description="Sizes: small (14px text) and large (16px text, default)."
          >
            <div className="grid grid-cols-1 gap-[16px] md:grid-cols-2">
              {FIELD_SIZES.map((size) => (
                <div key={size} className="flex flex-col gap-[8px]">
                  <DemoSubheading>
                    <CodeLabel>{`size="${size}"`}</CodeLabel>
                    <span className="font-sans text-[14px] font-semibold leading-[140%] text-[var(--demo-muted)]">
                      {` · ${FIELD_SIZE_LABELS[size]}`}
                    </span>
                  </DemoSubheading>

                  <TextArea
                    id={`demo-instructions-${size}`}
                    size={size}
                    label="How can the courier find you?"
                    value={instructions}
                    onChange={(event) => setInstructions(event.target.value)}
                    placeholder="Add delivery instructions"
                    rows={4}
                    counter={`${instructions.length}/500`}
                  />
                </div>
              ))}
            </div>

            <TextArea
              id="demo-instructions"
              label="How can the courier find you?"
              value={instructions}
              onChange={(event) => setInstructions(event.target.value)}
              placeholder="Add delivery instructions"
              rows={4}
              counter={`${instructions.length}/500`}
            />

            {TEXT_AREA_STATES.map((state) => (
              <TextArea
                key={state}
                id={`demo-textarea-${state}`}
                label={`${state} textarea`}
                value={state === 'error' ? '' : 'Tower B, gate 2 from main road'}
                onChange={() => undefined}
                placeholder="Add delivery instructions"
                rows={4}
                state={state}
                error={state === 'error' ? 'Delivery instructions are too short.' : undefined}
                counter={state === 'error' ? '0/500' : undefined}
              />
            ))}

            <TextArea
              id="demo-textarea-disabled"
              label="Disabled textarea"
              value="Tower B, gate 2 from main road"
              onChange={() => undefined}
              rows={4}
              disabled
            />
          </DemoCard>

          <DemoCard
            id="dropdown"
            title="Dropdown"
            description="Select-based field. Sizes: small and large (default). Chevron always on right; left icon optional."
          >
            <div className="grid grid-cols-1 gap-[16px] md:grid-cols-2">
              {FIELD_SIZES.map((size) => (
                <div key={size} className="flex flex-col gap-[8px]">
                  <DemoSubheading>
                    <CodeLabel>{`size="${size}"`}</CodeLabel>
                    <span className="font-sans text-[14px] font-semibold leading-[140%] text-[var(--demo-muted)]">
                      {` · ${FIELD_SIZE_LABELS[size]}`}
                    </span>
                  </DemoSubheading>

                  <Dropdown
                    id={`demo-dropdown-size-${size}`}
                    size={size}
                    label="Subscription duration"
                    placeholder="Select duration…"
                    value={dropdownValue}
                    onChange={setDropdownValue}
                    options={[
                      { value: 'weekly', label: 'Weekly' },
                      { value: 'monthly', label: 'Monthly' },
                      { value: '2months', label: '2 months' },
                    ]}
                  />
                </div>
              ))}
            </div>

            <Dropdown
              id="demo-dropdown-default"
              label="Subscription duration"
              placeholder="Select duration…"
              value={dropdownValue}
              onChange={setDropdownValue}
              options={[
                { value: 'weekly', label: 'Weekly' },
                { value: 'monthly', label: 'Monthly' },
                { value: '2months', label: '2 months' },
              ]}
            />

            <Dropdown
              id="demo-dropdown-icon"
              label="With left icon"
              placeholder="Select plan…"
              value={dropdownWithIconValue}
              onChange={setDropdownWithIconValue}
              leftIcon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path d="M10 1.667A5.833 5.833 0 0 0 4.167 7.5C4.167 12.083 10 18.333 10 18.333s5.833-6.25 5.833-10.833A5.833 5.833 0 0 0 10 1.667Z" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="10" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              }
              options={[
                { value: 'weekly', label: 'Weekly' },
                { value: 'monthly', label: 'Monthly' },
                { value: '2months', label: '2 months' },
              ]}
            />

            <Dropdown
              id="demo-dropdown-error"
              label="Error state"
              placeholder="Select…"
              value=""
              onChange={() => undefined}
              error="Please select a duration."
              options={[
                { value: 'weekly', label: 'Weekly' },
                { value: 'monthly', label: 'Monthly' },
              ]}
            />

            <Dropdown
              id="demo-dropdown-hint"
              label="With hint"
              placeholder="Select…"
              value=""
              onChange={() => undefined}
              hint="You can change this later."
              options={[
                { value: 'weekly', label: 'Weekly' },
                { value: 'monthly', label: 'Monthly' },
              ]}
            />

            <Dropdown
              id="demo-dropdown-disabled"
              label="Disabled state"
              placeholder="Select…"
              value="monthly"
              onChange={() => undefined}
              disabled
              options={[
                { value: 'weekly', label: 'Weekly' },
                { value: 'monthly', label: 'Monthly' },
              ]}
            />
          </DemoCard>

          <DemoCard
            id="checkbox"
            title="Checkbox"
            description="Sizes: small (16×16, 12px label, 4px gap) and large (20×20, 16px label, 8px gap, default)."
          >
            <div className="grid grid-cols-1 gap-[16px] md:grid-cols-2">
              {CHECKBOX_SIZES.map((size) => (
                <div key={size} className="flex flex-col gap-[8px]">
                  <DemoSubheading>
                    <CodeLabel>{`size="${size}"`}</CodeLabel>
                    <span className="font-sans text-[14px] font-semibold leading-[140%] text-[var(--demo-muted)]">
                      {` · ${CHECKBOX_SIZE_LABELS[size]}`}
                    </span>
                  </DemoSubheading>

                  <Checkbox
                    size={size}
                    checked={checkboxChecked}
                    onChange={setCheckboxChecked}
                    label="Leave the bag at the door"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-[8px]">
              <DemoSubheading><CodeLabel>unchecked</CodeLabel></DemoSubheading>
              <Checkbox checked={false} onChange={() => undefined} label="Leave the bag at the door" />
            </div>

            <div className="flex flex-col gap-[8px]">
              <DemoSubheading><CodeLabel>checked</CodeLabel></DemoSubheading>
              <Checkbox checked={true} onChange={() => undefined} label="Leave the bag at the door" />
            </div>

            <div className="flex flex-col gap-[8px]">
              <DemoSubheading><CodeLabel>disabled unchecked</CodeLabel></DemoSubheading>
              <Checkbox checked={false} onChange={() => undefined} label="Leave the bag at the door" disabled />
            </div>

            <div className="flex flex-col gap-[8px]">
              <DemoSubheading><CodeLabel>disabled checked</CodeLabel></DemoSubheading>
              <Checkbox checked={true} onChange={() => undefined} label="Leave the bag at the door" disabled />
            </div>

            <div className="flex flex-col gap-[8px]">
              <DemoSubheading><CodeLabel>interactive</CodeLabel></DemoSubheading>
              <Checkbox
                id="demo-checkbox-interactive"
                checked={checkboxChecked}
                onChange={setCheckboxChecked}
                label="Leave the bag at the door"
              />
            </div>
          </DemoCard>

          <DemoCard
            id="divider"
            title="Divider"
            description="Horizontal 1px separator with no built-in margin or padding. Default color is neutral[100]. Spacing is controlled by the parent."
          >
            <div className="flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[8px]">
                <DemoSubheading>
                  <CodeLabel>default</CodeLabel>
                </DemoSubheading>

                <div className="flex flex-col rounded-[12px] border border-[var(--demo-card-border)] p-[16px]">
                  <p className="font-sans text-[14px] font-semibold leading-[140%] text-[var(--demo-body)]">
                    Content above
                  </p>
                  <Divider />
                  <p className="font-sans text-[14px] font-semibold leading-[140%] text-[var(--demo-body)]">
                    Content below
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-[8px]">
                <DemoSubheading>
                  <CodeLabel>parent gap-[16px]</CodeLabel>
                </DemoSubheading>

                <div className="flex flex-col gap-[16px] rounded-[12px] border border-[var(--demo-card-border)] p-[16px]">
                  <p className="font-sans text-[14px] font-semibold leading-[140%] text-[var(--demo-body)]">
                    Content above
                  </p>
                  <Divider />
                  <p className="font-sans text-[14px] font-semibold leading-[140%] text-[var(--demo-body)]">
                    Content below
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-[8px]">
                <DemoSubheading>
                  <CodeLabel>{`color={COLOR_TOKENS.neutral[200]}`}</CodeLabel>
                </DemoSubheading>

                <div className="flex flex-col rounded-[12px] border border-[var(--demo-card-border)] p-[16px]">
                  <p className="font-sans text-[14px] font-semibold leading-[140%] text-[var(--demo-body)]">
                    Content above
                  </p>
                  <Divider color={COLOR_TOKENS.neutral[200]} />
                  <p className="font-sans text-[14px] font-semibold leading-[140%] text-[var(--demo-body)]">
                    Content below
                  </p>
                </div>
              </div>
            </div>
          </DemoCard>
        </PageSection>

        <PageSection
          id="actions"
          title="Actions"
          description="Button variants, size tokens, selection cards, and icon behavior grouped in one place."
        >
          <DemoCard
            id="plan-tariff-summary"
            title="PlanTariffSummary"
            description="Plan title with option chips. Used in order summary and payment review."
          >
            <div className="flex flex-col gap-[12px]">
              <PlanTariffSummary
                title={getPlanTariffTitle('base')}
                chips={getPlanTariffChips({
                  plan: 'base',
                  days: 'weekdays',
                  duration: 'monthly',
                  ingredients: ['no-fish'],
                  lightMealOption: 'lunch-dinner',
                })}
              />

              <div className="flex flex-col gap-[8px]">
                <DemoSubheading>
                  <CodeLabel>with Edit action</CodeLabel>
                </DemoSubheading>

                <PlanTariffSummary
                  title={getPlanTariffTitle('base')}
                  chips={getPlanTariffChips({
                    plan: 'base',
                    days: 'weekdays',
                    duration: 'monthly',
                    ingredients: [],
                    lightMealOption: 'lunch-dinner',
                  })}
                  actionLabel="Edit"
                  onAction={() => undefined}
                />
              </div>
            </div>
          </DemoCard>

          <DemoCard
            id="pay-method-card"
            title="PayMethodCard"
            description="Full-width selectable row for payment methods, delivery address, and similar pickers."
          >
            <div className="flex flex-col gap-[12px]">
              <PayMethodCard
                title="Debit/Credit Card"
                leftIcon={
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <rect x="1.5" y="4.5" width="17" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M1.5 8.5H18.5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                }
                actionLabel="✓"
                onClick={() => undefined}
              />

              <PayMethodCard
                title="Dubai Creek Harbour Residences"
                subtitle="Dubai Creek Harbour, Dubai, United Arab Emirates"
                actionLabel="Change"
                leftIcon={
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <path
                      d="M10 1.667A5.833 5.833 0 0 0 4.167 7.5C4.167 12.083 10 18.333 10 18.333s5.833-6.25 5.833-10.833A5.833 5.833 0 0 0 10 1.667Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <circle cx="10" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                }
                onClick={() => undefined}
              />

              <div className="flex flex-col gap-[8px]">
                <DemoSubheading>
                  <CodeLabel>with subtitle</CodeLabel>
                </DemoSubheading>

                <PayMethodCard
                  title="Tabby"
                  subtitle="4 payments, 0% interest"
                  onClick={() => undefined}
                  actionLabel={null}
                />
              </div>

              <div className="flex flex-col gap-[8px]">
                <DemoSubheading>
                  <CodeLabel>disabled</CodeLabel>
                </DemoSubheading>

                <PayMethodCard
                  title="Delivery address"
                  subtitle="Select your delivery address"
                  actionLabel="Change"
                  disabled
                  onClick={() => undefined}
                />
              </div>
            </div>
          </DemoCard>

          <DemoCard
            id="button-variants"
            title="Button variants"
            description="Color variants with filled and outline styles. Outline uses transparent background and 1px border in the same palette."
          >
            <div className="grid grid-cols-1 gap-[16px] md:grid-cols-2">
              {BUTTON_VARIANTS.map((variant) => (
                <div key={variant} className="flex flex-col gap-[8px]">
                  <DemoSubheading>
                    <CodeLabel>{`variant="${variant}"`}</CodeLabel>
                  </DemoSubheading>

                  <Button variant={variant} fullWidth>
                    {capitalizeWord(variant)} Button
                  </Button>

                  <Button variant={variant} fullWidth disabled>
                    {capitalizeWord(variant)} Disabled
                  </Button>

                  <Button variant={variant} outline fullWidth>
                    {capitalizeWord(variant)} Outline
                  </Button>

                  <Button variant={variant} outline fullWidth disabled>
                    {capitalizeWord(variant)} Outline Disabled
                  </Button>
                </div>
              ))}
            </div>
          </DemoCard>

          <DemoCard
            id="button-sizes"
            title="Button sizes"
            description="Agreed size tokens: Small 32 / Medium 40 / Large 48 / Extra large 64 / Hero 80. Border radius: Small & Medium 4 / Large & Extra large 8 / Hero 12."
          >
            <div className="flex flex-col gap-[16px]">
              {BUTTON_SIZES.map((size) => (
                <div key={size} className="flex flex-col gap-[8px]">
                  <DemoSubheading>
                    <CodeLabel>{`size="${size}"`}</CodeLabel>
                    <span className="font-sans text-[14px] font-semibold leading-[140%] text-[var(--demo-muted)]">
                      {` · ${BUTTON_SIZE_LABELS[size]}`}
                    </span>
                  </DemoSubheading>

                  <Button size={size} fullWidth>
                    {BUTTON_SIZE_LABELS[size]} Button
                  </Button>
                </div>
              ))}
            </div>
          </DemoCard>

          <DemoCard
            id="button-icons"
            title="Button icons"
            description="One icon per button: left or right. Icon size is controlled by button size."
          >
            <div className="flex flex-col gap-[12px]">
              <Button
                fullWidth
                leftIcon={
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              >
                Left icon
              </Button>

              <Button
                variant="secondary"
                fullWidth
                rightIcon={
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              >
                Right icon
              </Button>

              <Button
                variant="primary"
                outline
                fullWidth
                leftIcon={
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              >
                Outline + left icon
              </Button>
            </div>
          </DemoCard>
        </PageSection>

        <PageSection
          id="indicators"
          title="Indicators"
          description="Non-interactive labels that communicate status or rank at a glance. Used on plan cards, meal cards, and similar surfaces."
        >
          <DemoCard
            id="badge-variants"
            title="Badge variants"
            description="Two semantic variants tied to business intent — not generic color aliases."
          >
            <div className="flex flex-wrap items-end gap-[24px]">
              {BADGE_VARIANTS.map((variant) => (
                <div key={variant} className="flex w-fit flex-col gap-[8px]">
                  <DemoSubheading>
                    <CodeLabel>{`variant="${variant}"`}</CodeLabel>
                  </DemoSubheading>

                  <Badge variant={variant} />
                </div>
              ))}
            </div>
          </DemoCard>
        </PageSection>
      </main>
    </div>
  );
}