import { useMemo, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

import { useEscapeLayer } from './common/escapeStack';
import { CHECKOUT_LAYER_Z_INDEX, Z_INDEX_TOKENS } from './common/zIndexTokens';

import { Badge, BADGE_VARIANTS } from './common/Badge';
import { Button, BUTTON_SIZE_LABELS, BUTTON_SIZES, BUTTON_VARIANTS } from './common/Button';
import { GhostButton } from './common/GhostButton';
import { IconButton } from './common/IconButton';
import { VerifiedPhoneLogoutButton } from './common/VerifiedPhoneLogoutButton';
import { Checkbox } from './common/Checkbox';
import { CHECKBOX_SIZE_LABELS, CHECKBOX_SIZES, RADIO_SIZE_LABELS, RADIO_SIZES } from './common/checkboxSizeTokens';
import { Radio, RadioGroup } from './common/Radio';
import { COLOR_TOKENS } from './common/colorTokens';
import { Divider } from './common/Divider';
import { Dropdown } from './common/Dropdown';
import { FIELD_SIZE_LABELS, FIELD_SIZES } from './common/fieldSizeTokens';
import { BORDER_RADIUS_TOKENS } from './common/borderRadiusTokens';
import { Chip, CHIP_VARIANTS } from './common/Chip';
import { CheckoutTodayTotal } from './common/CheckoutTodayTotal';
import { DatePill } from './common/DatePill';
import { FormSectionHeading } from './common/FormSectionHeading';
import { IconTextRow } from './common/IconTextRow';
import { PayMethodCard } from './common/PayMethodCard';
import {
  ClearIcon,
  DeliveryIcon,
  DesignSystemIcon,
  MapPinIcon,
  PromoCodeIcon,
  RadioCheckIcon,
  SuccessIcon,
  TruckIcon,
  XIcon,
  LogOutIcon,
} from './common/icons';
import { InfoIcon } from './common/icons/feather/InfoIcon';
import type { IconSize } from './common/icons/iconSize';
import { FEATHER_ICON_CATALOG_ENTRIES } from './common/icons/feather/iconCatalog';
import { iconColorClassName, iconColorStyle } from './common/iconColorTokens';
import { NEUTRAL_USAGE_ROLES } from './common/neutralUsageTokens';
import { PhoneInput } from './common/PhoneInput';
import { SPACING_TOKENS } from './common/spacingTokens';
import { ProseList } from './common/ProseList';
import { PROSE_LIST_TOKEN_NAMES, PROSE_LIST_SPACING, PROSE_LIST_TOKENS } from './common/proseListTokens';
import {
  TYPOGRAPHY_ROLE_NAMES,
  TYPOGRAPHY_ROLES,
  typographyRoleStyle,
} from './common/typographyTokens';
import { TextLink, TEXT_LINK_SIZES } from './common/TextLink';
import { formatUaePhoneInput } from './checkout/phoneValidation';
import {
  FONT_FAMILY_CLASS_NAMES,
  FONT_FAMILY_TOKENS,
  getFontFamilyStyle,
  type FontFamilyTokenName,
} from './common/fontFamilyTokens';
import { FONT_SIZE_TOKENS } from './common/fontSizeTokens';
import { FormLabel } from './common/FormLabel';
import { InputButtonRow } from './common/InputButtonRow';
import { DeliveryAddressCard } from './common/DeliveryAddressCard';
import {
  PAYMENT_METHODS,
  PaymentMethodSelector,
  type PaymentMethodId,
} from './common/PaymentMethodSelector';
import { PlanTariffSummary } from './common/PlanTariffSummary';
import { getPlanTariffChips, getPlanTariffTitle } from './common/planTariffSummaryUtils';
import { TextArea, TEXT_AREA_STATES } from './common/TextArea';
import { TextInput, TEXT_INPUT_STATES } from './common/TextInput';
import { Tooltip } from './common/Tooltip';
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
import { QuizValueSlider } from './quiz/QuizValueSlider';
import { quizTokensStyle } from './quiz/quizTokens';

type DesignSystemDemoProps = {
  onClose: () => void;
};

type PageSectionId = 'foundations' | 'forms' | 'actions' | 'indicators';

type DemoAnchorId =
  | PageSectionId
  | 'color-tokens'
  | 'font-size-tokens'
  | 'font-family-tokens'
  | 'border-radius-tokens'
  | 'spacing-tokens'
  | 'z-index-tokens'
  | 'payment-method-icon-tokens'
  | 'icon-catalog'
  | 'typography-roles'
  | 'prose-list'
  | 'neutral-usage'
  | 'form-label'
  | 'phone-input'
  | 'form-section-heading'
  | 'chip'
  | 'date-pill'
  | 'icon-text-row'
  | 'text-link'
  | 'checkout-today-total'
  | 'pay-method-card'
  | 'text-input'
  | 'input-button-row'
  | 'text-area'
  | 'checkbox'
  | 'radio'
  | 'divider'
  | 'dropdown'
  | 'quiz-value-slider'
  | 'plan-tariff-summary'
  | 'delivery-address-card'
  | 'payment-method-selector'
  | 'button-variants'
  | 'button-sizes'
  | 'button-icons'
  | 'icon-button-variants'
  | 'icon-button-soft'
  | 'icon-button-sizes'
  | 'badge-variants'
  | 'tooltip';

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
  '--demo-description': string;
  '--demo-shadow': string;
};

const DEMO_DESCRIPTION_CLASS_NAME =
  'font-sans text-[14px] font-semibold leading-[145%] text-[var(--demo-description)]';

const DEMO_DESCRIPTION_LABEL_CLASS_NAME =
  'font-sans text-[12px] font-bold uppercase leading-[130%] tracking-[0.12px] text-[var(--demo-description)]';

const DEMO_DESCRIPTION_META_CLASS_NAME =
  'font-sans text-[12px] font-medium leading-[140%] text-[var(--demo-description)]';

const DEMO_HEADING_BOTTOM_GAP_CLASS = 'mb-[12px]';

const demoNavigationItems: DemoNavigationItem[] = [
  {
    id: 'foundations',
    label: 'Foundations',
    children: [
      { id: 'color-tokens', label: 'Color tokens' },
      { id: 'font-size-tokens', label: 'Font size tokens' },
      { id: 'font-family-tokens', label: 'Font family tokens' },
      { id: 'border-radius-tokens', label: 'Border radius tokens' },
      { id: 'spacing-tokens', label: 'Spacing tokens' },
      { id: 'z-index-tokens', label: 'Z-index tokens' },
      { id: 'payment-method-icon-tokens', label: 'Payment method icons' },
      { id: 'icon-catalog', label: 'Icon catalog' },
      { id: 'typography-roles', label: 'Typography roles' },
      { id: 'prose-list', label: 'Prose list' },
      { id: 'neutral-usage', label: 'Neutral usage' },
    ],
  },
  {
    id: 'forms',
    label: 'Forms',
    children: [
      { id: 'form-label', label: 'FormLabel' },
      { id: 'phone-input', label: 'PhoneInput' },
      { id: 'form-section-heading', label: 'FormSectionHeading' },
      { id: 'text-input', label: 'TextInput' },
      { id: 'input-button-row', label: 'InputButtonRow' },
      { id: 'payment-method-selector', label: 'Payment method selector' },
      { id: 'text-area', label: 'TextArea' },
      { id: 'dropdown', label: 'Dropdown' },
      { id: 'quiz-value-slider', label: 'QuizValueSlider' },
      { id: 'checkbox', label: 'Checkbox' },
      { id: 'radio', label: 'Radio' },
      { id: 'divider', label: 'Divider' },
    ],
  },
  {
    id: 'actions',
    label: 'Actions',
    children: [
      { id: 'plan-tariff-summary', label: 'PlanTariffSummary' },
      { id: 'chip', label: 'Chip' },
      { id: 'date-pill', label: 'DatePill' },
      { id: 'icon-text-row', label: 'IconTextRow' },
      { id: 'text-link', label: 'TextLink' },
      { id: 'checkout-today-total', label: 'Order summary' },
      { id: 'pay-method-card', label: 'PayMethodCard' },
      { id: 'delivery-address-card', label: 'DeliveryAddressCard' },
      { id: 'button-variants', label: 'Button variants' },
      { id: 'button-sizes', label: 'Button sizes' },
      { id: 'button-icons', label: 'Button icons' },
      { id: 'icon-button-variants', label: 'IconButton variants' },
      { id: 'icon-button-soft', label: 'IconButton soft' },
      { id: 'icon-button-sizes', label: 'IconButton sizes' },
    ],
  },
  {
    id: 'indicators',
    label: 'Indicators',
    children: [
      { id: 'badge-variants', label: 'Badge variants' },
      { id: 'tooltip', label: 'Tooltip' },
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
  '--demo-description': COLOR_TOKENS.neutral[500],
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
      <div className="mb-[24px]">
        <p className={['mb-[8px]', DEMO_DESCRIPTION_LABEL_CLASS_NAME].join(' ')}>
          Section
        </p>

        <h2
          className={[
            'font-sans text-[32px] font-bold leading-[130%] tracking-[-0.64px] text-[var(--demo-title)]',
            DEMO_HEADING_BOTTOM_GAP_CLASS,
          ].join(' ')}
        >
          {title}
        </h2>

        <p className={['max-w-[640px]', DEMO_DESCRIPTION_CLASS_NAME].join(' ')}>
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
      <div className="mb-[24px]">
        <h3
          className={[
            'font-sans text-[20px] font-bold leading-[130%] text-[var(--demo-title)]',
            description ? DEMO_HEADING_BOTTOM_GAP_CLASS : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {title}
        </h3>

        {description ? (
          <p className={DEMO_DESCRIPTION_CLASS_NAME}>{description}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-[24px]">{children}</div>
    </section>
  );
}

function DemoSubheading({
  children,
  inline = false,
}: {
  children: ReactNode;
  inline?: boolean;
}) {
  return (
    <p
      className={[
        DEMO_DESCRIPTION_CLASS_NAME,
        inline ? '' : DEMO_HEADING_BOTTOM_GAP_CLASS,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </p>
  );
}

function CodeLabel({ children }: { children: ReactNode }) {
  return (
    <code className="font-mono text-[12px] font-semibold text-[var(--neutral-300)]">
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
      <div className="mx-auto max-h-[132px] max-w-[1200px] overflow-y-auto pb-[2px] scrollbar-hide">
        <div className="flex flex-wrap gap-[8px]">
          {quickLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="rounded-[999px] border border-[var(--demo-card-border)] bg-[var(--demo-card-bg)] px-[12px] py-[6px] font-sans text-[12px] font-semibold leading-[130%] text-[var(--demo-body)] transition-colors hover:bg-[var(--demo-card-soft-bg)]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function DemoNavigation() {
  return (
    <aside className="fixed right-[20px] top-[76px] z-20 hidden w-[220px] max-h-[calc(100vh-92px)] xl:block">
      <nav className="flex max-h-[inherit] flex-col overflow-y-auto rounded-[18px] border border-[var(--demo-card-border)] bg-[var(--demo-card-bg)] p-[12px] shadow-[0_12px_32px_var(--demo-shadow)] scrollbar-hide">
        <p className={['mb-[8px] shrink-0 px-[10px]', DEMO_DESCRIPTION_LABEL_CLASS_NAME].join(' ')}>
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
                    className="rounded-[8px] px-[8px] py-[6px] font-sans text-[12px] font-semibold leading-[140%] text-[var(--demo-description)] transition-colors hover:bg-[var(--demo-card-soft-bg)] hover:text-[var(--demo-body)]"
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

        <span className="font-sans text-[12px] font-semibold leading-[130%] text-[var(--demo-description)]">
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
    <div className="flex min-w-0 flex-col">
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
    <div className="flex flex-col gap-[8px]">
      <div className="flex items-baseline justify-between gap-[12px]">
        <DemoSubheading inline>
          <CodeLabel>{`FONT_FAMILY_TOKENS.${token}`}</CodeLabel>
        </DemoSubheading>

        <span className="font-sans text-[12px] font-semibold leading-[130%] text-[var(--demo-description)]">
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
    <div className="flex flex-col gap-[8px]">
      <div className="flex items-baseline justify-between gap-[12px]">
        <DemoSubheading inline>
          <CodeLabel>{`FONT_SIZE_TOKENS[${token}]`}</CodeLabel>
        </DemoSubheading>

        <span className="font-sans text-[12px] font-semibold leading-[130%] text-[var(--demo-description)]">
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
    <div className="flex flex-col gap-[8px]">
      <div className="flex items-baseline justify-between gap-[12px]">
        <DemoSubheading inline>
          <CodeLabel>{getBorderRadiusTokenLabel(token)}</CodeLabel>
        </DemoSubheading>

        <span className="font-sans text-[12px] font-semibold leading-[130%] text-[var(--demo-description)]">
          {value}
        </span>
      </div>

      <div
        className="h-[56px] w-full border border-[var(--demo-card-border)] bg-[var(--demo-card-bg)]"
        style={{ borderRadius: value }}
      />
    </div>
  );
}

function SpacingTokenRow({
  token,
  value,
}: {
  token: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex items-baseline justify-between gap-[12px]">
        <DemoSubheading inline>
          <CodeLabel>{`SPACING_TOKENS[${token}]`}</CodeLabel>
        </DemoSubheading>

        <span className="font-sans text-[12px] font-semibold leading-[130%] text-[var(--demo-description)]">
          {value}
        </span>
      </div>

      <div className="flex items-center gap-[8px]">
        <div
          className="h-[16px] shrink-0 rounded-[4px] bg-[var(--demo-title)]"
          style={{ width: value }}
        />
        <span className="font-sans text-[12px] font-medium text-[var(--demo-description)]">gap / padding / margin</span>
      </div>
    </div>
  );
}

function ZIndexTokenRow({
  token,
  value,
}: {
  token: string;
  value: number;
}) {
  return (
    <div className="flex items-baseline justify-between gap-[12px] rounded-[12px] border border-[var(--demo-card-border)] px-[16px] py-[12px]">
      <DemoSubheading inline>
        <CodeLabel>{token}</CodeLabel>
      </DemoSubheading>

      <span className="font-sans text-[12px] font-semibold leading-[130%] text-[var(--demo-description)]">
        {value}
      </span>
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
    <div className="flex items-center gap-[16px]">
      <div
        className="flex shrink-0 items-center justify-center rounded-[8px] border border-[var(--demo-card-border)] bg-[var(--demo-card-bg)]"
        style={{
          width: PAYMENT_METHOD_ICON_SLOT_SIZE_PX,
          height: PAYMENT_METHOD_ICON_SLOT_SIZE_PX,
        }}
      >
        <PaymentMethodCardIcon variant={variant} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <DemoSubheading>
          <CodeLabel>{`PAYMENT_METHOD_CARD_ICON_VARIANTS · "${variant}"`}</CodeLabel>
        </DemoSubheading>

        <div className="flex flex-col gap-[4px]">

        <p className="mb-[4px] font-sans text-[14px] font-semibold leading-[140%] text-[var(--demo-body)]">
          {PAYMENT_METHOD_ICON_LABELS.card}
        </p>

        <p className="mb-[4px] font-sans text-[12px] font-medium leading-[140%] text-[var(--demo-description)]">
          {PAYMENT_METHOD_CARD_ICON_FILE_NAMES[variant]}
        </p>

        <p className="font-sans text-[12px] font-medium leading-[140%] text-[var(--demo-description)]">
          {`fill ${shades.fill} · stripe ${shades.stripe}`}
        </p>
        </div>
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
    <div className="flex items-center gap-[16px]">
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

      <div className="flex min-w-0 flex-1 flex-col">
        <DemoSubheading>
          <CodeLabel>{tokenLabel}</CodeLabel>
        </DemoSubheading>

        <div className="flex flex-col gap-[4px]">
        <p className="mb-[4px] font-sans text-[14px] font-semibold leading-[140%] text-[var(--demo-body)]">
          {PAYMENT_METHOD_ICON_LABELS[id]}
        </p>

        <p className="font-sans text-[12px] font-medium leading-[140%] text-[var(--demo-description)]">
          {PAYMENT_METHOD_ICON_FILE_NAMES[id]}
        </p>
        </div>
      </div>
    </div>
  );
}

const ICON_CATALOG_SIZES: IconSize[] = [16, 20, 24, 32, 40, 48];
const ICON_CATALOG_SIZE_COLUMNS = ICON_CATALOG_SIZES.length;

const APP_ICON_CATALOG_ENTRIES: Array<{
  name: string;
  figmaName?: string;
  defaultSize: IconSize;
  render: (size: IconSize) => ReactNode;
}> = [
  { name: 'PromoCodeIcon', figmaName: 'Custom promocode', defaultSize: 24, render: (size) => <PromoCodeIcon size={size} /> },
  { name: 'RadioCheckIcon', figmaName: 'Custom radio check', defaultSize: 20, render: (size) => <RadioCheckIcon size={size} /> },
  { name: 'DesignSystemIcon', figmaName: 'Custom design system', defaultSize: 20, render: (size) => <DesignSystemIcon size={size} /> },
  { name: 'DeliveryIcon', figmaName: 'Alias → TruckIcon', defaultSize: 20, render: (size) => <DeliveryIcon size={size} /> },
  { name: 'ClearIcon', figmaName: 'Alias → XIcon', defaultSize: 24, render: (size) => <ClearIcon size={size} /> },
  { name: 'SuccessIcon', figmaName: 'Alias → CheckCircleIcon', defaultSize: 20, render: (size) => <SuccessIcon size={size} /> },
];

function IconCatalogRow({
  name,
  figmaName,
  defaultSize,
  render,
}: {
  name: string;
  figmaName?: string;
  defaultSize: IconSize;
  render: (size: IconSize) => ReactNode;
}) {
  return (
    <div
      className="grid items-center gap-[12px] border-b border-[var(--demo-card-border)] py-[12px] last:border-b-0"
      style={{
        gridTemplateColumns: `minmax(140px, 1fr) repeat(${ICON_CATALOG_SIZE_COLUMNS}, 56px)`,
      }}
    >
      <div>
        <p className={[DEMO_HEADING_BOTTOM_GAP_CLASS, 'font-sans text-[14px] font-semibold leading-[140%] text-[var(--demo-body)]'].join(' ')}>
          {name}
        </p>
        <p className="font-sans text-[12px] font-medium leading-[140%] text-[var(--demo-description)]">
          {figmaName
            ? `${figmaName} · default ${defaultSize}px`
            : `default ${defaultSize}px · inherits color from wrapper`}
        </p>
      </div>

      {ICON_CATALOG_SIZES.map((size) => (
        <div
          key={size}
          className={[
            'flex size-[56px] items-center justify-center rounded-[8px] border border-[var(--demo-card-border)]',
            iconColorClassName.catalog,
          ].join(' ')}
          style={iconColorStyle.catalog}
        >
          {render(size)}
        </div>
      ))}
    </div>
  );
}

export default function DesignSystemDemo({ onClose }: DesignSystemDemoProps) {
  useEscapeLayer(true, Z_INDEX_TOKENS.checkout, onClose);

  const [email, setEmail] = useState('email@themeal.menu');
  const [name, setName] = useState('');
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('lunch-dinner');
  const [dropdownValue, setDropdownValue] = useState('');
  const [dropdownWithIconValue, setDropdownWithIconValue] = useState('monthly');
  const [instructions, setInstructions] = useState(
    'Tower B, gate 2 from main road, blue door at end of hallway',
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>('card');
  const [demoPhone, setDemoPhone] = useState('50 123 4567');
  const [demoPhoneError, setDemoPhoneError] = useState<string | undefined>();
  const [demoSelectedDate, setDemoSelectedDate] = useState(() => new Date(2026, 5, 14));
  const [iconCatalogQuery, setIconCatalogQuery] = useState('');
  const [demoQuizFreqCook, setDemoQuizFreqCook] = useState(7);
  const [demoQuizCostCook, setDemoQuizCostCook] = useState(15);
  const [demoQuizCostOrder, setDemoQuizCostOrder] = useState(45);
  const [demoQuizCostRest, setDemoQuizCostRest] = useState(60);
  const filteredFeatherIconCatalog = useMemo(() => {
    const query = iconCatalogQuery.trim().toLowerCase();

    if (!query) {
      return FEATHER_ICON_CATALOG_ENTRIES;
    }

    return FEATHER_ICON_CATALOG_ENTRIES.filter(
      (entry) =>
        entry.name.toLowerCase().includes(query) ||
        entry.figmaName.toLowerCase().includes(query) ||
        entry.slug.includes(query),
    );
  }, [iconCatalogQuery]);
  const demoDatePills = useMemo(
    () => [
      new Date(2026, 5, 14),
      new Date(2026, 5, 17),
      new Date(2026, 5, 21),
      new Date(2026, 5, 24),
      new Date(2026, 5, 28),
    ],
    [],
  );

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

      <main className="mx-auto flex max-w-[1200px] flex-col gap-[56px] px-[20px] py-[48px] xl:mr-[260px]">
        <div className="-mb-[32px]">
          <p className={['mb-[8px]', DEMO_DESCRIPTION_LABEL_CLASS_NAME].join(' ')}>
            Design system
          </p>
          <p className="font-sans text-[14px] font-semibold leading-[140%] text-[var(--demo-description)]">
            Foundations, form controls, and actions
          </p>
        </div>
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
            <div className="grid grid-cols-1 gap-[28px] md:grid-cols-2 md:gap-[32px] 2xl:grid-cols-3">
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
            <div className="grid grid-cols-1 gap-[24px] md:grid-cols-2 md:gap-[28px]">
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
            <div className="grid grid-cols-1 gap-[24px] md:grid-cols-2 md:gap-[28px]">
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
            <div className="grid grid-cols-1 gap-[24px] md:grid-cols-2 md:gap-[28px]">
              {Object.entries(BORDER_RADIUS_TOKENS).map(([token, value]) => (
                <BorderRadiusTokenRow key={token} token={token} value={value} />
              ))}
            </div>
          </DemoCard>

          <DemoCard
            id="spacing-tokens"
            title="Spacing tokens"
            description="Approved spacing scale for gap, padding, and margin: 4–48 for component rhythm, 64–128 for section and page layout."
            className="lg:col-span-2"
          >
            <div className="grid grid-cols-1 gap-[24px] md:grid-cols-2 md:gap-[28px]">
              {Object.entries(SPACING_TOKENS).map(([token, value]) => (
                <SpacingTokenRow key={token} token={token} value={value} />
              ))}
            </div>
          </DemoCard>

          <DemoCard
            id="z-index-tokens"
            title="Z-index tokens"
            description="Layering scale for sticky UI, checkout shell, overlays, modals, and toasts."
            className="lg:col-span-2"
          >
            <div className="grid grid-cols-1 gap-[12px] md:grid-cols-2">
              {(
                Object.entries(Z_INDEX_TOKENS) as Array<
                  [keyof typeof Z_INDEX_TOKENS, number]
                >
              ).map(([token, value]) => (
                <ZIndexTokenRow key={token} token={`Z_INDEX_TOKENS.${token}`} value={value} />
              ))}
            </div>
            <p className="mt-[16px] font-sans text-[14px] font-medium leading-[140%] text-[#6b7280]">
              Checkout shell internal layers (relative to checkout root)
            </p>
            <div className="mt-[8px] grid grid-cols-1 gap-[12px] md:grid-cols-2">
              {(
                Object.entries(CHECKOUT_LAYER_Z_INDEX) as Array<
                  [keyof typeof CHECKOUT_LAYER_Z_INDEX, number]
                >
              ).map(([token, value]) => (
                <ZIndexTokenRow
                  key={token}
                  token={`CHECKOUT_LAYER_Z_INDEX.${token}`}
                  value={value}
                />
              ))}
            </div>
          </DemoCard>

          <DemoCard
            id="payment-method-icon-tokens"
            title="Payment method icon tokens"
            description={`Figma Property 1 tiles (${PAYMENT_METHOD_ICON_TILE_SIZE_PX}×${PAYMENT_METHOD_ICON_TILE_SIZE_PX}) centered in a ${PAYMENT_METHOD_ICON_SLOT_SIZE_PX}×${PAYMENT_METHOD_ICON_SLOT_SIZE_PX} slot.`}
            className="lg:col-span-2"
          >
            <div className="grid grid-cols-1 gap-[24px] md:grid-cols-2 md:gap-[28px]">
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

          <DemoCard
            id="icon-catalog"
            title="Feather icon catalog"
            description={`${FEATHER_ICON_CATALOG_ENTRIES.length} SVG components in common/icons/feather. Sizes 16 / 20 / 24 / 32 / 40 / 48, catalog color neutral[900] via wrapper.`}
            className="lg:col-span-2"
          >
            <div className="mb-[16px]">
              <TextInput
                id="icon-catalog-search"
                label="Search icons"
                placeholder="Activity, map-pin, TruckIcon…"
                value={iconCatalogQuery}
                onChange={(event) => setIconCatalogQuery(event.target.value)}
              />
              <p className="mt-[8px] font-sans text-[12px] font-medium leading-[140%] text-[var(--demo-description)]">
                {`Showing ${filteredFeatherIconCatalog.length} of ${FEATHER_ICON_CATALOG_ENTRIES.length}`}
              </p>
            </div>

            <div className="max-h-[480px] overflow-auto">
              <div className="min-w-[600px] overflow-x-auto">
                <div
                  className="grid gap-[12px] border-b border-[var(--demo-card-border)] pb-[8px]"
                  style={{
                    gridTemplateColumns: `minmax(140px, 1fr) repeat(${ICON_CATALOG_SIZE_COLUMNS}, 56px)`,
                  }}
                >
                  <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--demo-description)]">
                    Icon
                  </p>
                  {ICON_CATALOG_SIZES.map((size) => (
                    <p
                      key={size}
                      className="text-center font-sans text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--demo-description)]"
                    >
                      {size}px
                    </p>
                  ))}
                </div>

                {filteredFeatherIconCatalog.map((entry) => {
                  const Icon = entry.Icon;

                  return (
                    <IconCatalogRow
                      key={entry.slug}
                      name={entry.name}
                      figmaName={entry.figmaName}
                      defaultSize={entry.defaultSize}
                      render={(size) => <Icon size={size} />}
                    />
                  );
                })}
              </div>
            </div>
          </DemoCard>

          <DemoCard
            id="app-icon-catalog"
            title="App-specific icons"
            description="Custom icons and checkout aliases not in the Feather set."
            className="lg:col-span-2"
          >
            <div className="overflow-x-auto">
              <div className="min-w-[600px]">
                <div
                  className="grid gap-[12px] border-b border-[var(--demo-card-border)] pb-[8px]"
                  style={{
                    gridTemplateColumns: `minmax(140px, 1fr) repeat(${ICON_CATALOG_SIZE_COLUMNS}, 56px)`,
                  }}
                >
                  <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--demo-description)]">
                    Icon
                  </p>
                  {ICON_CATALOG_SIZES.map((size) => (
                    <p
                      key={size}
                      className="text-center font-sans text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--demo-description)]"
                    >
                      {size}px
                    </p>
                  ))}
                </div>

                {APP_ICON_CATALOG_ENTRIES.map((entry) => (
                  <IconCatalogRow key={entry.name} {...entry} />
                ))}
              </div>
            </div>
          </DemoCard>

          <DemoCard
            id="typography-roles"
            title="Typography roles"
            description="Semantic text styles for checkout and payment screens."
            className="lg:col-span-2"
          >
            <div className="flex flex-col gap-[16px]" style={typographyRoleStyle}>
              {TYPOGRAPHY_ROLE_NAMES.map((role) => {
                const token = TYPOGRAPHY_ROLES[role];

                return (
                  <div
                    key={role}
                    className="flex flex-col gap-[4px] border-b border-[var(--demo-card-border)] pb-[12px] last:border-b-0"
                  >
                    <p className={`${token.className} mb-[8px]`}>
                      {role === 'price' ? '1,299 AED' : 'The quick brown fox'}
                    </p>
                    <p className="font-sans text-[12px] font-medium leading-[140%] text-[var(--demo-description)]">
                      <CodeLabel>{role}</CodeLabel>
                      {` · ${token.usage}`}
                    </p>
                  </div>
                );
              })}
            </div>
          </DemoCard>

          <DemoCard
            id="prose-list"
            title="Prose list"
            description="Bulleted lists with bold labels for legal and policy content."
            className="lg:col-span-2"
          >
            <div
              className="flex flex-col gap-[16px]"
              style={{
                ...typographyRoleStyle,
                '--legal-gap-md': PROSE_LIST_SPACING.itemGap,
                '--legal-gap-xs': PROSE_LIST_SPACING.nestedGap,
              }}
            >
              <ProseList
                items={[
                  {
                    label: 'Personal Identification Information',
                    description:
                      'This is information that can identify you as an individual. For example: your name, address, email address, phone number, date of birth.',
                  },
                  {
                    label: 'Contact Data',
                    description:
                      'Such as your phone number and email, which we use to communicate with you (e.g., order updates, support).',
                  },
                  {
                    label: 'Usage Data',
                    description:
                      'We automatically collect certain information when you interact with our website:',
                    children: [
                      {
                        label: 'Log and Device Data',
                        description:
                          'IP address, browser type, device type, operating system, referring URLs, pages viewed, and the dates/times of access.',
                      },
                    ],
                  },
                ]}
              />

              <div className="flex flex-col gap-[8px] border-t border-[var(--demo-card-border)] pt-[12px]">
                {PROSE_LIST_TOKEN_NAMES.map((tokenName) => {
                  const token = PROSE_LIST_TOKENS[tokenName];

                  return (
                    <p
                      key={tokenName}
                      className="font-sans text-[12px] font-medium leading-[140%] text-[var(--demo-description)]"
                    >
                      <CodeLabel>{tokenName}</CodeLabel>
                      {` · ${token.usage}`}
                    </p>
                  );
                })}
              </div>
            </div>
          </DemoCard>

          <DemoCard
            id="neutral-usage"
            title="Neutral usage"
            description="Guideline for neutral palette roles in text, icons, borders, and surfaces."
            className="lg:col-span-2"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-[var(--demo-card-border)]">
                    {['Role', 'Token', 'Sample', 'Usage'].map((heading) => (
                      <th
                        key={heading}
                        className="pb-[8px] pr-[16px] font-sans text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--demo-description)]"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {NEUTRAL_USAGE_ROLES.map((item) => (
                    <tr key={item.role} className="border-b border-[var(--demo-card-border)] last:border-b-0">
                      <td className="py-[12px] pr-[16px] font-sans text-[14px] font-semibold text-[var(--demo-body)]">
                        {item.role}
                      </td>
                      <td className="py-[12px] pr-[16px]">
                        <CodeLabel>{item.token}</CodeLabel>
                      </td>
                      <td className="py-[12px] pr-[16px]">
                        <div className="flex items-center gap-[8px]">
                          <span
                            className="inline-block size-[20px] rounded-[4px] border border-[var(--demo-card-border)]"
                            style={{ backgroundColor: item.value }}
                          />
                          {item.role === 'iconCatalog' || item.role === 'iconInline' ? (
                            <span style={{ color: item.value }}>
                              <DeliveryIcon size={20} />
                            </span>
                          ) : (
                            <span
                              className="font-sans text-[14px] font-semibold"
                              style={{ color: item.value }}
                            >
                              Aa
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-[12px] font-sans text-[12px] font-medium leading-[140%] text-[var(--demo-description)]">
                        {item.usage}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
            id="phone-input"
            title="PhoneInput"
            description="UAE phone field with +971 prefix, digit formatting, and inline error state."
          >
            <div className="flex flex-col gap-[16px]">
              <PhoneInput
                id="demo-phone"
                value={demoPhone}
                onChange={(value) => {
                  setDemoPhone(formatUaePhoneInput(value));
                  setDemoPhoneError(undefined);
                }}
              />

              <div className="flex flex-col">
                <DemoSubheading>
                  <CodeLabel>error</CodeLabel>
                </DemoSubheading>

                <PhoneInput
                  id="demo-phone-error"
                  value=""
                  onChange={() => undefined}
                  error="Enter a valid UAE mobile number"
                />
              </div>
            </div>
          </DemoCard>

          <DemoCard
            id="form-section-heading"
            title="FormSectionHeading"
            description="Section title with optional subtitle for checkout steps and calendar blocks."
          >
            <FormSectionHeading title="Choose the preferred first delivery date" />
          </DemoCard>

          <DemoCard
            id="text-input"
            title="TextInput"
            description="Sizes: small (40px) and large (48px, default)."
          >
            <div className="grid grid-cols-1 gap-[16px] md:grid-cols-2">
              {FIELD_SIZES.map((size) => (
                <div key={size} className="flex flex-col">
                  <DemoSubheading>
                    <CodeLabel>{`size="${size}"`}</CodeLabel>
                    <span className="font-sans text-[14px] font-semibold leading-[140%] text-[var(--demo-description)]">
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
            description="Primitive row: TextInput and Button aligned to the bottom."
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
                <Button type="button" variant="neutral" size="medium" className="w-full @[280px]:w-[140px]">
                  Action
                </Button>
              }
            />
          </DemoCard>

          <DemoCard
            id="payment-method-selector"
            title="PaymentMethodSelector"
            description="Selectable payment method row with icon, title, optional subtitle, and radio check indicator."
            className="lg:col-span-2"
          >
            <div className="flex flex-col gap-[16px]">
              <div className="flex flex-col">
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

              <div className="flex flex-col">
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
                <div key={size} className="flex flex-col">
                  <DemoSubheading>
                    <CodeLabel>{`size="${size}"`}</CodeLabel>
                    <span className="font-sans text-[14px] font-semibold leading-[140%] text-[var(--demo-description)]">
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
                <div key={size} className="flex flex-col">
                  <DemoSubheading>
                    <CodeLabel>{`size="${size}"`}</CodeLabel>
                    <span className="font-sans text-[14px] font-semibold leading-[140%] text-[var(--demo-description)]">
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
            id="quiz-value-slider"
            title="QuizValueSlider"
            description="Quiz step slider with value label above the track. 8px track, 32×16 pill thumb, primary fill. Optional caption for cost questions. Step is always 1."
          >
            <div
              className="mx-auto flex w-full max-w-[520px] flex-col gap-[24px] rounded-[16px] border border-[var(--demo-card-border)] bg-[var(--demo-card-soft-bg)] p-[24px]"
              style={quizTokensStyle}
            >
              <div className="flex flex-col gap-[8px]">
                <DemoSubheading>
                  <CodeLabel>frequency</CodeLabel>
                </DemoSubheading>

                <QuizValueSlider
                  label={`${demoQuizFreqCook} times/week`}
                  value={demoQuizFreqCook}
                  min={0}
                  max={28}
                  onChange={setDemoQuizFreqCook}
                />
              </div>

              <div className="flex flex-col gap-[20px]">
                <DemoSubheading>
                  <CodeLabel>meal cost</CodeLabel>
                </DemoSubheading>

                <QuizValueSlider
                  caption="Groceries for one home-cooked meal"
                  label={`${demoQuizCostCook} AED`}
                  value={demoQuizCostCook}
                  min={6}
                  max={30}
                  onChange={setDemoQuizCostCook}
                />

                <QuizValueSlider
                  caption="One delivery order"
                  label={`${demoQuizCostOrder} AED`}
                  value={demoQuizCostOrder}
                  min={25}
                  max={150}
                  onChange={setDemoQuizCostOrder}
                />

                <QuizValueSlider
                  caption="One cafe / restaurant visit"
                  label={`${demoQuizCostRest} AED`}
                  value={demoQuizCostRest}
                  min={20}
                  max={200}
                  onChange={setDemoQuizCostRest}
                />
              </div>
            </div>
          </DemoCard>

          <DemoCard
            id="checkbox"
            title="Checkbox"
            description="Sizes: small (16×16, 12px label, 4px gap) and medium (20×20, 16px label, 8px gap, default)."
          >
            <div className="grid grid-cols-1 gap-[16px] md:grid-cols-2">
              {CHECKBOX_SIZES.map((size) => (
                <div key={size} className="flex flex-col">
                  <DemoSubheading>
                    <CodeLabel>{`size="${size}"`}</CodeLabel>
                    <span className="font-sans text-[14px] font-semibold leading-[140%] text-[var(--demo-description)]">
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

            <div className="flex flex-col">
              <DemoSubheading><CodeLabel>unchecked</CodeLabel></DemoSubheading>
              <Checkbox checked={false} onChange={() => undefined} label="Leave the bag at the door" />
            </div>

            <div className="flex flex-col">
              <DemoSubheading><CodeLabel>checked</CodeLabel></DemoSubheading>
              <Checkbox checked={true} onChange={() => undefined} label="Leave the bag at the door" />
            </div>

            <div className="flex flex-col">
              <DemoSubheading><CodeLabel>disabled unchecked</CodeLabel></DemoSubheading>
              <Checkbox checked={false} onChange={() => undefined} label="Leave the bag at the door" disabled />
            </div>

            <div className="flex flex-col">
              <DemoSubheading><CodeLabel>disabled checked</CodeLabel></DemoSubheading>
              <Checkbox checked={true} onChange={() => undefined} label="Leave the bag at the door" disabled />
            </div>

            <div className="flex flex-col">
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
            id="radio"
            title="Radio"
            description="Sizes: small (16px, 12px label, 4px gap) and medium (20px, 16px label, 8px gap, default). Circular control with dot indicator."
          >
            <div className="grid grid-cols-1 gap-[16px] md:grid-cols-2">
              {RADIO_SIZES.map((size) => (
                <div key={size} className="flex flex-col">
                  <DemoSubheading>
                    <CodeLabel>{`size="${size}"`}</CodeLabel>
                    <span className="font-sans text-[14px] font-semibold leading-[140%] text-[var(--demo-description)]">
                      {` · ${RADIO_SIZE_LABELS[size]}`}
                    </span>
                  </DemoSubheading>

                  <RadioGroup
                    name={`demo-radio-${size}`}
                    size={size}
                    value={radioValue}
                    onChange={setRadioValue}
                    options={[
                      { value: 'breakfast-main', label: 'Breakfast + Main meal' },
                      { value: 'lunch-dinner', label: 'Lunch + Dinner' },
                    ]}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col">
              <DemoSubheading><CodeLabel>unchecked</CodeLabel></DemoSubheading>
              <Radio checked={false} onChange={() => undefined} label="Lunch + Dinner" name="demo-radio-unchecked" value="lunch-dinner" />
            </div>

            <div className="flex flex-col">
              <DemoSubheading><CodeLabel>checked</CodeLabel></DemoSubheading>
              <Radio checked={true} onChange={() => undefined} label="Lunch + Dinner" name="demo-radio-checked" value="lunch-dinner" />
            </div>

            <div className="flex flex-col">
              <DemoSubheading><CodeLabel>disabled unchecked</CodeLabel></DemoSubheading>
              <Radio checked={false} onChange={() => undefined} label="Lunch + Dinner" name="demo-radio-disabled-unchecked" value="lunch-dinner" disabled />
            </div>

            <div className="flex flex-col">
              <DemoSubheading><CodeLabel>disabled checked</CodeLabel></DemoSubheading>
              <Radio checked={true} onChange={() => undefined} label="Lunch + Dinner" name="demo-radio-disabled-checked" value="lunch-dinner" disabled />
            </div>

            <div className="flex flex-col">
              <DemoSubheading><CodeLabel>interactive group</CodeLabel></DemoSubheading>
              <RadioGroup
                name="demo-radio-interactive"
                value={radioValue}
                onChange={setRadioValue}
                options={[
                  { value: 'breakfast-main', label: 'Breakfast + Main meal' },
                  { value: 'lunch-dinner', label: 'Lunch + Dinner' },
                ]}
              />
            </div>
          </DemoCard>

          <DemoCard
            id="divider"
            title="Divider"
            description="Horizontal 1px separator with no built-in margin or padding. Default color is neutral[100]. Spacing is controlled by the parent."
          >
            <div className="flex flex-col gap-[20px]">
              <div className="flex flex-col">
                <DemoSubheading>
                  <CodeLabel>default</CodeLabel>
                </DemoSubheading>

                <div className="flex flex-col gap-[8px]">
                  <p className="font-sans text-[14px] font-semibold leading-[140%] text-[var(--demo-body)]">
                    Content above
                  </p>
                  <Divider />
                  <p className="font-sans text-[14px] font-semibold leading-[140%] text-[var(--demo-body)]">
                    Content below
                  </p>
                </div>
              </div>

              <div className="flex flex-col">
                <DemoSubheading>
                  <CodeLabel>parent gap-[16px]</CodeLabel>
                </DemoSubheading>

                <div className="flex flex-col gap-[16px]">
                  <p className="font-sans text-[14px] font-semibold leading-[140%] text-[var(--demo-body)]">
                    Content above
                  </p>
                  <Divider />
                  <p className="font-sans text-[14px] font-semibold leading-[140%] text-[var(--demo-body)]">
                    Content below
                  </p>
                </div>
              </div>

              <div className="flex flex-col">
                <DemoSubheading>
                  <CodeLabel>{`color={COLOR_TOKENS.neutral[200]}`}</CodeLabel>
                </DemoSubheading>

                <div className="flex flex-col gap-[8px]">
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

              <div className="flex flex-col">
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
            id="chip"
            title="Chip"
            description="Compact pill for plan options, duration, and ingredient tags."
          >
            <div className="flex flex-wrap gap-[8px]">
              {CHIP_VARIANTS.map((variant) => (
                <Chip key={variant} variant={variant}>
                  {variant === 'selected' ? 'Monthly' : 'No fish'}
                </Chip>
              ))}
            </div>
          </DemoCard>

          <DemoCard
            id="date-pill"
            title="DatePill"
            description="Delivery date selector pill used in MealCalendar. 56×64px, primary border when selected."
          >
            <div className="flex flex-wrap gap-[8px]">
              {demoDatePills.map((date) => (
                <DatePill
                  key={date.toISOString()}
                  date={date}
                  selected={
                    demoSelectedDate.getFullYear() === date.getFullYear() &&
                    demoSelectedDate.getMonth() === date.getMonth() &&
                    demoSelectedDate.getDate() === date.getDate()
                  }
                  onClick={() => setDemoSelectedDate(date)}
                />
              ))}
            </div>
          </DemoCard>

          <DemoCard
            id="icon-text-row"
            title="IconTextRow"
            description="Icon + title + optional subtitle row for delivery and payment summaries."
          >
            <div className="flex flex-col gap-[16px]">
              <IconTextRow
                icon={<TruckIcon size={20} />}
                title="First delivery"
                subtitle="Wed, 14 Jun · 8:00–12:00"
              />
              <IconTextRow
                icon={<MapPinIcon size={20} />}
                title="Dubai Marina, Tower B"
                subtitle="Apartment 1204"
              />
            </div>
          </DemoCard>

          <DemoCard
            id="text-link"
            title="TextLink"
            description="Inline text action with optional chevron. Used for secondary navigation inside cards."
          >
            <div className="flex flex-col items-start gap-[12px]">
              {TEXT_LINK_SIZES.map((size) => (
                <TextLink key={size} size={size} onClick={() => undefined}>
                  View full menu
                </TextLink>
              ))}
              <TextLink size="12" showChevron={false} onClick={() => undefined}>
                Without chevron
              </TextLink>
            </div>
          </DemoCard>

          <DemoCard
            id="checkout-today-total"
            title="Order summary"
            description="Checkout summary blocks: Today total row and verified-session footer with GhostButton logout."
          >
            <div className="flex flex-col gap-[16px]">
              <CheckoutTodayTotal periodPrice={999} pricePerDay={39.9} oldPeriodPrice={1596} />
              <CheckoutTodayTotal periodPrice={749} pricePerDay={29.9} title="Today" />
            </div>

            <div className="mt-[16px] flex flex-col gap-[8px]">
              <DemoSubheading>Verified session footer</DemoSubheading>
              <div className="flex flex-col gap-[8px] rounded-[16px] bg-[var(--demo-card-bg)] px-[20px] py-[16px]">
                <VerifiedPhoneLogoutButton
                  phone="50 123 4567"
                  onClick={() => undefined}
                />
                <Button type="button" variant="primary" size="medium" fullWidth>
                  Continue to Delivery
                </Button>
              </div>
            </div>
          </DemoCard>

          <DemoCard
            id="pay-method-card"
            title="PayMethodCard"
            description="Selectable payment method row with icon, title, subtitle, and action label."
          >
            <PayMethodCard
              title="•••• 4242"
              subtitle="Visa"
              leftIcon={<PaymentMethodCardIcon variant="primary" />}
              onClick={() => undefined}
            />
          </DemoCard>

          <DemoCard
            id="delivery-address-card"
            title="DeliveryAddressCard"
            description="Checkout row for changing the delivery address. Shows map pin icon, title, subtitle, and a Change action."
          >
            <div className="flex flex-col gap-[16px]">
              <div className="flex flex-col">
                <DemoSubheading>
                  <CodeLabel>selected address</CodeLabel>
                </DemoSubheading>

                <DeliveryAddressCard
                  title="Dubai Creek Harbour Residences"
                  subtitle="Dubai Creek Harbour, Dubai, United Arab Emirates"
                  onClick={() => undefined}
                />
              </div>

              <div className="flex flex-col">
                <DemoSubheading>
                  <CodeLabel>empty state</CodeLabel>
                </DemoSubheading>

                <DeliveryAddressCard onClick={() => undefined} />
              </div>

              <div className="flex flex-col">
                <DemoSubheading>
                  <CodeLabel>disabled</CodeLabel>
                </DemoSubheading>

                <DeliveryAddressCard disabled onClick={() => undefined} />
              </div>
            </div>
          </DemoCard>

          <DemoCard
            id="button-variants"
            title="Button variants"
            description="Color variants with filled, outline, and ghost styles. Ghost uses transparent background, colored text, subtle hover fill (palette[50]), no border or shadow."
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

                  <Button variant={variant} fullWidth loading>
                    {capitalizeWord(variant)} Loading
                  </Button>

                  <Button variant={variant} outline fullWidth>
                    {capitalizeWord(variant)} Outline
                  </Button>

                  <Button variant={variant} outline fullWidth disabled>
                    {capitalizeWord(variant)} Outline Disabled
                  </Button>

                  <Button variant={variant} ghost fullWidth>
                    {capitalizeWord(variant)} Ghost
                  </Button>

                  <Button variant={variant} ghost fullWidth disabled>
                    {capitalizeWord(variant)} Ghost Disabled
                  </Button>

                  <Button variant={variant} ghost fullWidth loading>
                    {capitalizeWord(variant)} Ghost Loading
                  </Button>
                </div>
              ))}
            </div>
          </DemoCard>

          <DemoCard
            id="button-sizes"
            title="Button sizes"
            description="Agreed size tokens: X-small 32 / Small 40 / Medium 48 / Large 64 / X-large 72. Border radius: X-small & Small 4 / Medium & Large 8 / X-large 12."
          >
            <div className="flex flex-col gap-[16px]">
              {BUTTON_SIZES.map((size) => (
                <div key={size} className="flex flex-col gap-[8px]">
                  <DemoSubheading>
                    <CodeLabel>{`size="${size}"`}</CodeLabel>
                    <span className="font-sans text-[14px] font-semibold leading-[140%] text-[var(--demo-description)]">
                      {` · ${BUTTON_SIZE_LABELS[size]}`}
                    </span>
                  </DemoSubheading>

                  <Button size={size} fullWidth>
                    {BUTTON_SIZE_LABELS[size]} Button
                  </Button>

                  <Button ghost size={size} fullWidth>
                    {BUTTON_SIZE_LABELS[size]} Ghost
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

              <Button variant="primary" ghost fullWidth rightIcon={<XIcon size={16} />}>
                Ghost + right icon
              </Button>
            </div>

            <div className="mt-[16px] flex flex-col gap-[8px]">
              <DemoSubheading>Inline ghost (GhostButton)</DemoSubheading>
              <GhostButton>Neutral ghost</GhostButton>
              <GhostButton variant="primary">Primary ghost</GhostButton>
              <GhostButton variant="danger">Danger ghost</GhostButton>
              <GhostButton size="small" rightIcon={<LogOutIcon size={16} />} disabled>
                Disabled ghost
              </GhostButton>
            </div>
          </DemoCard>

          <DemoCard
            id="icon-button-variants"
            title="IconButton variants"
            description="Round icon-only buttons with the same color variants as Button. Width equals height for each size token."
          >
            <div className="grid grid-cols-1 gap-[16px] md:grid-cols-2">
              {BUTTON_VARIANTS.map((variant) => (
                <div key={variant} className="flex flex-col gap-[8px]">
                  <DemoSubheading>
                    <CodeLabel>{`variant="${variant}"`}</CodeLabel>
                  </DemoSubheading>

                  <div className="flex flex-wrap items-center gap-[8px]">
                    <IconButton
                      variant={variant}
                      aria-label={`${capitalizeWord(variant)} action`}
                      icon={<XIcon />}
                    />

                    <IconButton
                      variant={variant}
                      aria-label={`${capitalizeWord(variant)} action disabled`}
                      icon={<XIcon />}
                      disabled
                    />

                    <IconButton
                      variant={variant}
                      aria-label={`${capitalizeWord(variant)} action loading`}
                      icon={<XIcon />}
                      loading
                    />

                    <IconButton
                      variant={variant}
                      outline
                      aria-label={`${capitalizeWord(variant)} outline action`}
                      icon={<XIcon />}
                    />

                    <IconButton
                      variant={variant}
                      outline
                      aria-label={`${capitalizeWord(variant)} outline action disabled`}
                      icon={<XIcon />}
                      disabled
                    />
                  </div>
                </div>
              ))}
            </div>
          </DemoCard>

          <DemoCard
            id="icon-button-soft"
            title="IconButton soft & ghost"
            description="Soft: neutral[50] background, neutral[75] on hover. Ghost: transparent surface, neutral text, neutral[50] hover fill — no border."
          >
            <div className="flex flex-wrap items-center gap-[8px]">
              <IconButton soft aria-label="Soft action" icon={<XIcon />} />
              <IconButton soft aria-label="Soft action disabled" icon={<XIcon />} disabled />
              <IconButton soft aria-label="Soft action loading" icon={<XIcon />} loading />
              <IconButton soft size="small" aria-label="Soft small action" icon={<XIcon size={16} />} />
            </div>

            <div className="mt-[16px] flex flex-col gap-[8px]">
              <DemoSubheading>Ghost</DemoSubheading>
              <div className="flex flex-wrap items-center gap-[8px]">
                <IconButton ghost aria-label="Ghost action" icon={<XIcon />} />
                <IconButton ghost aria-label="Ghost action disabled" icon={<XIcon />} disabled />
                <IconButton ghost aria-label="Ghost action loading" icon={<XIcon />} loading />
              </div>
            </div>

            <div className="mt-[16px] flex flex-wrap items-end gap-[16px]">
              {(['x-small', 'small', 'medium'] as const).map((size) => (
                <div key={size} className="flex flex-col items-center gap-[8px]">
                  <DemoSubheading>
                    <CodeLabel>{`ghost size="${size}"`}</CodeLabel>
                  </DemoSubheading>
                  <IconButton
                    ghost
                    size={size}
                    aria-label={`${BUTTON_SIZE_LABELS[size]} ghost action`}
                    icon={<XIcon />}
                  />
                </div>
              ))}
            </div>
          </DemoCard>

          <DemoCard
            id="icon-button-sizes"
            title="IconButton sizes"
            description="Round buttons with square dimensions matching Button height tokens: 32 / 40 / 48 / 64 / 72 px. Icon size scales with button size."
          >
            <div className="flex flex-wrap items-end gap-[16px]">
              {BUTTON_SIZES.map((size) => (
                <div key={size} className="flex flex-col items-center">
                  <DemoSubheading>
                    <CodeLabel>{`size="${size}"`}</CodeLabel>
                  </DemoSubheading>

                  <IconButton
                    size={size}
                    aria-label={`${BUTTON_SIZE_LABELS[size]} icon action`}
                    icon={<XIcon />}
                  />
                </div>
              ))}
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
                <div key={variant} className="flex w-fit flex-col">
                  <DemoSubheading>
                    <CodeLabel>{`variant="${variant}"`}</CodeLabel>
                  </DemoSubheading>

                  <Badge variant={variant} />
                </div>
              ))}
            </div>
          </DemoCard>

          <DemoCard
            id="tooltip"
            title="Tooltip"
            description="Contextual hint on tap/click. Neutral 900 background, 12px semibold text, 8px radius, arrow, max width 280px. Opens on trigger click and closes on outside click or Escape."
          >
            <div className="flex flex-col gap-[24px]">
              <div className="flex flex-col gap-[8px]">
                <DemoSubheading>
                  <CodeLabel>info trigger</CodeLabel>
                </DemoSubheading>

                <Tooltip
                  content="Heads up — this total is an estimate. Certain promo codes are verified once you sign in."
                  side="top"
                >
                  <IconButton
                    type="button"
                    ghost
                    size="small"
                    aria-label="About estimate"
                    icon={<InfoIcon size={20} />}
                  />
                </Tooltip>
              </div>

              <div className="flex flex-col gap-[12px]">
                <DemoSubheading>
                  <CodeLabel>side</CodeLabel>
                </DemoSubheading>

                <div className="flex flex-wrap items-center gap-[16px]">
                  {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
                    <Tooltip key={side} content={`Tooltip on ${side}`} side={side}>
                      <Button type="button" size="small" variant="neutral">
                        {side}
                      </Button>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </div>
          </DemoCard>
        </PageSection>
      </main>
    </div>
  );
}