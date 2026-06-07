import { useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

import { Badge, BADGE_VARIANTS } from './common/Badge';
import { Button, BUTTON_SIZES, BUTTON_VARIANTS } from './common/Button';
import { Checkbox } from './common/Checkbox';
import { COLOR_TOKENS } from './common/colorTokens';
import { Dropdown } from './common/Dropdown';
import { FONT_SIZE_TOKENS } from './common/fontSizeTokens';
import { FormLabel } from './common/FormLabel';
import { TextArea, TEXT_AREA_STATES } from './common/TextArea';
import { TextInput, TEXT_INPUT_STATES } from './common/TextInput';

type DesignSystemDemoProps = {
  onClose: () => void;
};

type PageSectionId = 'foundations' | 'forms' | 'actions' | 'indicators';

type DemoAnchorId =
  | PageSectionId
  | 'color-tokens'
  | 'font-size-tokens'
  | 'form-label'
  | 'text-input'
  | 'text-area'
  | 'checkbox'
  | 'dropdown'
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
  '--demo-close-bg': string;
  '--demo-close-bg-hover': string;
  '--demo-close-icon': string;
};

const demoNavigationItems: DemoNavigationItem[] = [
  {
    id: 'foundations',
    label: 'Foundations',
    children: [
      { id: 'color-tokens', label: 'Color tokens' },
      { id: 'font-size-tokens', label: 'Font size tokens' },
    ],
  },
  {
    id: 'forms',
    label: 'Forms',
    children: [
      { id: 'form-label', label: 'FormLabel' },
      { id: 'text-input', label: 'TextInput' },
      { id: 'text-area', label: 'TextArea' },
      { id: 'dropdown', label: 'Dropdown' },
      { id: 'checkbox', label: 'Checkbox' },
    ],
  },
  {
    id: 'actions',
    label: 'Actions',
    children: [
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
  '--demo-close-bg': COLOR_TOKENS.neutral[50],
  '--demo-close-bg-hover': COLOR_TOKENS.neutral[75],
  '--demo-close-icon': COLOR_TOKENS.neutral[900],
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
        <p className="mb-[6px] font-['Quicksand'] text-[12px] font-bold uppercase leading-[130%] tracking-[0.12px] text-[var(--demo-subtle)]">
          Section
        </p>

        <h2 className="font-['Quicksand'] text-[32px] font-bold leading-[130%] tracking-[-0.64px] text-[var(--demo-title)]">
          {title}
        </h2>

        <p className="mt-[6px] max-w-[640px] font-['Quicksand'] text-[16px] font-semibold leading-[150%] text-[var(--demo-muted)]">
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
        <h3 className="font-['Quicksand'] text-[20px] font-bold leading-[130%] text-[var(--demo-title)]">
          {title}
        </h3>

        {description ? (
          <p className="mt-[4px] font-['Quicksand'] text-[14px] font-semibold leading-[145%] text-[var(--demo-muted)]">
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
    <p className="font-['Quicksand'] text-[14px] font-semibold leading-[140%] text-[var(--demo-muted)]">
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

function DemoNavigation() {
  return (
    <aside className="fixed right-[20px] top-[104px] z-20 hidden w-[176px] xl:block">
      <nav className="rounded-[18px] border border-[var(--demo-card-border)] bg-[var(--demo-card-bg)] p-[12px] shadow-[0_12px_32px_var(--demo-shadow)]">
        <p className="mb-[8px] px-[10px] font-['Quicksand'] text-[12px] font-bold uppercase leading-[130%] tracking-[0.12px] text-[var(--demo-subtle)]">
          Sections
        </p>

        <div className="flex flex-col gap-[10px]">
          {demoNavigationItems.map((item) => (
            <div key={item.id} className="flex flex-col gap-[2px]">
              <a
                href={`#${item.id}`}
                className="rounded-[10px] px-[10px] py-[8px] font-['Quicksand'] text-[14px] font-bold leading-[130%] text-[var(--demo-body)] transition-colors hover:bg-[var(--demo-card-soft-bg)]"
              >
                {item.label}
              </a>

              <div className="ml-[10px] flex flex-col border-l border-[var(--demo-card-border)] pl-[8px]">
                {item.children.map((child) => (
                  <a
                    key={child.id}
                    href={`#${child.id}`}
                    className="rounded-[8px] px-[8px] py-[6px] font-['Quicksand'] text-[12px] font-semibold leading-[130%] text-[var(--demo-muted)] transition-colors hover:bg-[var(--demo-card-soft-bg)] hover:text-[var(--demo-body)]"
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
        <span className="font-['Quicksand'] text-[14px] font-bold leading-[130%] text-[var(--demo-body)]">
          {name}
        </span>

        <span className="font-['Quicksand'] text-[12px] font-semibold leading-[130%] text-[var(--demo-muted)]">
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

        <span className="font-['Quicksand'] text-[12px] font-semibold leading-[130%] text-[var(--demo-muted)]">
          {value}
        </span>
      </div>

      <p
        className="font-['Quicksand'] font-bold leading-[130%] text-[var(--demo-body)]"
        style={{ fontSize: value }}
      >
        Quicksand {value}
      </p>
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

  return (
    <div
      className="fixed inset-0 z-50 overflow-auto bg-[var(--demo-page-bg)]"
      style={demoCssVariables}
    >
      <div className="sticky top-0 z-30 border-b border-[var(--demo-card-border)] bg-[var(--demo-card-bg)]">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-[20px] py-[16px] xl:mr-[216px]">
          <div>
            <h1 className="font-['Quicksand'] text-[25px] font-bold leading-[130%] text-[var(--demo-title)]">
              Design System Demo
            </h1>

            <p className="mt-[4px] font-['Quicksand'] text-[14px] font-semibold leading-[140%] text-[var(--demo-muted)]">
              Foundations, form controls, and actions
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="group flex size-[48px] shrink-0 cursor-pointer items-center justify-center"
            aria-label="Close design system demo"
          >
            <span className="flex size-[36px] items-center justify-center rounded-full bg-[var(--demo-close-bg)] text-[var(--demo-close-icon)] transition-colors duration-150 group-hover:bg-[var(--demo-close-bg-hover)]">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M1 1L11 11M11 1L1 11"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <DemoNavigation />

      <main className="mx-auto flex max-w-[1200px] flex-col gap-[56px] px-[20px] py-[48px] xl:mr-[216px]">
        <PageSection
          id="foundations"
          title="Foundations"
          description="Base design tokens used by components. These are raw palettes and primitive font-size tokens, not full component styles."
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

          <DemoCard id="text-input" title="TextInput">
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
              id="demo-both-icons"
              label="Left + right icon"
              value="email@themeal.menu"
              onChange={() => undefined}
              leftIcon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M2.5 7l7.138 4.545a.833.833 0 0 0 .724 0L17.5 7" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              }
              rightIcon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              }
            />
          </DemoCard>

          <DemoCard id="text-area" title="TextArea">
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
            description="Select-based field. Chevron always on right; left icon optional."
          >
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
            description="Four states: unchecked, checked, disabled unchecked, disabled checked."
          >
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
        </PageSection>

        <PageSection
          id="actions"
          title="Actions"
          description="Button variants, size tokens, and icon behavior grouped in one place."
        >
          <DemoCard
            id="button-variants"
            title="Button variants"
            description="Token-based variants. Do not add structural variants without a real design source."
          >
            <div className="grid grid-cols-1 gap-[16px] md:grid-cols-2">
              {BUTTON_VARIANTS.map((variant) => (
                <div key={variant} className="flex flex-col gap-[8px]">
                  <DemoSubheading>
                    <CodeLabel>{`variant="${variant}"`}</CodeLabel>
                  </DemoSubheading>

                  <Button variant={variant} fullWidth>
                    {variant} Button
                  </Button>

                  <Button variant={variant} fullWidth disabled>
                    {variant} Disabled
                  </Button>
                </div>
              ))}
            </div>
          </DemoCard>

          <DemoCard
            id="button-sizes"
            title="Button sizes"
            description="Only agreed pixel size tokens are allowed: 32 / 40 / 48 / 64 / 80. The old 56px Figma Make button size is intentionally excluded."
          >
            <div className="flex flex-col gap-[16px]">
              {BUTTON_SIZES.map((size) => (
                <div key={size} className="flex flex-col gap-[8px]">
                  <DemoSubheading>
                    <CodeLabel>{`size="${size}"`}</CodeLabel>
                  </DemoSubheading>

                  <Button size={size} fullWidth>
                    {size}px Button
                  </Button>
                </div>
              ))}
            </div>
          </DemoCard>

          <DemoCard
            id="button-icons"
            title="Button icons"
            description="Icon size is controlled by button size, not by the icon component itself."
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
                leftIcon
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
                rightIcon
              </Button>

              <Button
                variant="neutral"
                fullWidth
                leftIcon={
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M12 5v14M5 12h14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                rightIcon={
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M9 18l6-6-6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              >
                leftIcon + rightIcon
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
            <div className="flex flex-col gap-[16px]">
              {BADGE_VARIANTS.map((variant) => (
                <div key={variant} className="flex flex-col gap-[8px]">
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