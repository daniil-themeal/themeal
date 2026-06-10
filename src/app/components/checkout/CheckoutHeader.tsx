import type { CSSProperties, ReactNode } from 'react';

import { COLOR_TOKENS } from '../common/colorTokens';
import { FONT_SIZE_TOKENS } from '../common/fontSizeTokens';
import { TEXT_TRIM_CLASS_NAME } from '../common/textTrimTokens';
import { XIcon } from '../common/icons';
import { iconColorClassName, iconColorStyle } from '../common/iconColorTokens';

const steps = ['Plan', 'Delivery', 'Payment'] as const;

type CheckoutHeaderStep = 'plan' | 'delivery' | 'payment';

export type { CheckoutHeaderStep };

type CheckoutHeaderProps = {
  step?: CheckoutHeaderStep;
  title?: ReactNode;
  closeAriaLabel?: string;
  onBack: () => void;
  onClose: () => void;
  onStepSelect?: (step: CheckoutHeaderStep) => void;
};

type CheckoutHeaderCssVariables = CSSProperties & {
  '--checkout-header-bg': string;
  '--checkout-header-border': string;
  '--checkout-header-text-active': string;
  '--checkout-header-text-muted': string;
  '--checkout-header-step-active-bg': string;
  '--checkout-header-step-completed-bg': string;
  '--checkout-header-step-idle-bg': string;
  '--checkout-header-step-active-text': string;
  '--checkout-header-step-completed-text': string;
  '--checkout-header-step-idle-text': string;
  '--checkout-header-close-bg': string;
  '--checkout-header-close-bg-hover': string;
  '--checkout-header-logo': string;
  '--checkout-header-back-icon': string;
  '--checkout-header-step-font-size': string;
  '--checkout-header-label-font-size': string;
  '--checkout-header-label-font-size-sm': string;
};

const checkoutHeaderStyle: CheckoutHeaderCssVariables = {
  '--checkout-header-bg': COLOR_TOKENS.base.white,
  '--checkout-header-border': COLOR_TOKENS.neutral[100],
  '--checkout-header-text-active': COLOR_TOKENS.neutral[900],
  '--checkout-header-text-muted': COLOR_TOKENS.neutral[500],
  '--checkout-header-step-active-bg': COLOR_TOKENS.primary[500],
  '--checkout-header-step-completed-bg': COLOR_TOKENS.success[500],
  '--checkout-header-step-idle-bg': COLOR_TOKENS.neutral[50],
  '--checkout-header-step-active-text': COLOR_TOKENS.base.white,
  '--checkout-header-step-completed-text': COLOR_TOKENS.base.white,
  '--checkout-header-step-idle-text': COLOR_TOKENS.neutral[500],
  '--checkout-header-close-bg': COLOR_TOKENS.neutral[50],
  '--checkout-header-close-bg-hover': COLOR_TOKENS.neutral[75],
  '--checkout-header-logo': COLOR_TOKENS.primary[500],
  '--checkout-header-back-icon': COLOR_TOKENS.neutral[500],
  '--checkout-header-step-font-size': FONT_SIZE_TOKENS[12],
  '--checkout-header-label-font-size': FONT_SIZE_TOKENS[12],
  '--checkout-header-label-font-size-sm': FONT_SIZE_TOKENS[14],
};

function getStepStatus(index: number, current: number) {
  if (index === current) return 'active';
  if (index < current) return 'completed';

  return 'idle';
}

function getHeaderStepByIndex(index: number): CheckoutHeaderStep {
  if (index === 0) return 'plan';
  if (index === 1) return 'delivery';

  return 'payment';
}

function Stepper({
  current,
  onStepSelect,
}: {
  current: number;
  onStepSelect?: (step: CheckoutHeaderStep) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-0 px-[0px] py-[16px] sm:px-[8px] md:px-[16px]">
      {steps.map((step, index) => {
        const status = getStepStatus(index, current);
        const isActive = status === 'active';
        const isCompleted = status === 'completed';
        const headerStep = getHeaderStepByIndex(index);

        const stepLabel = (
          <div className="flex items-center gap-[4px] sm:gap-[8px]">
            <div
              className="hidden size-[20px] items-center justify-center rounded-full font-sans text-[length:var(--checkout-header-step-font-size)] font-bold xs:flex sm:size-[24px]"
              style={{
                backgroundColor: isActive
                  ? 'var(--checkout-header-step-active-bg)'
                  : isCompleted
                    ? 'var(--checkout-header-step-completed-bg)'
                    : 'var(--checkout-header-step-idle-bg)',
                color: isActive
                  ? 'var(--checkout-header-step-active-text)'
                  : isCompleted
                    ? 'var(--checkout-header-step-completed-text)'
                    : 'var(--checkout-header-step-idle-text)',
              }}
            >
              {isCompleted ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 6L5 9L10 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                index + 1
              )}
            </div>

            <p
              className="font-sans text-[length:var(--checkout-header-label-font-size)] font-semibold leading-[130%] sm:text-[length:var(--checkout-header-label-font-size-sm)]"
              style={{
                color: isActive
                  ? 'var(--checkout-header-text-active)'
                  : 'var(--checkout-header-text-muted)',
              }}
            >
              {step}
            </p>
          </div>
        );

        return (
          <div key={step} className="flex items-center">
            {onStepSelect ? (
              <button
                type="button"
                onClick={() => onStepSelect(headerStep)}
                className="flex cursor-pointer items-center rounded-[6px] transition-opacity hover:opacity-80"
                aria-label={`Switch to ${step} step`}
              >
                {stepLabel}
              </button>
            ) : (
              stepLabel
            )}

            {index < steps.length - 1 ? (
              <div className="mx-[8px] h-px w-[4px] bg-[var(--checkout-header-border)] sm:w-[12px]" />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function CheckoutLogo() {
  return (
    <svg
      className="block w-[48px] text-[var(--checkout-header-logo)] xs:w-[72px]"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 84 25.6941"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M44.1293 18.2613C44.5041 19.2749 45.0312 20.0125 45.7104 20.4743C46.4483 21.0036 47.2795 21.2682 48.2048 21.2682C49.2356 21.2682 50.2312 21.0373 51.1916 20.5756L52.7021 19.8492C52.9482 19.7253 53.2819 19.6466 53.7036 19.6128C54.0785 19.6128 54.4413 19.7084 54.7929 19.8998C55.1557 20.0913 55.4428 20.3504 55.6537 20.6771C55.8647 21.0036 55.9699 21.3414 55.9699 21.6905C55.9699 22.6366 55.2614 23.498 53.8439 24.2751C52.1225 25.221 50.1433 25.6941 47.9063 25.6941C46.4424 25.6941 45.0606 25.4181 43.7605 24.8664C42.4604 24.3146 41.3478 23.5092 40.4226 22.4507C39.1109 20.9078 38.4551 18.9202 38.4551 16.4876C38.4551 14.8659 38.8534 13.3625 39.6496 11.9773C40.4461 10.5921 41.5412 9.49409 42.9348 8.68323C44.3403 7.87242 45.8803 7.46699 47.555 7.46699C49.1594 7.46699 50.6294 7.84986 51.9646 8.61568C53.3115 9.38148 54.3655 10.4176 55.1266 11.7239C55.8876 13.0303 56.2685 14.438 56.2685 15.947C56.2685 16.7467 56.0926 17.3322 55.7414 17.7039C55.3901 18.0755 54.8105 18.2613 54.0024 18.2613H44.1293ZM51.0859 14.7984C50.5236 12.6812 49.3232 11.6225 47.4845 11.6225C45.8569 11.6225 44.6799 12.6812 43.9537 14.7984H51.0859Z" fill="currentColor" />
      <path d="M16.14 11.7234L14.2602 23.1765C14.108 23.9649 13.7508 24.5786 13.1886 25.0178C12.6381 25.4458 11.9296 25.6598 11.0629 25.6598C10.3134 25.6598 9.74537 25.3613 9.35887 24.7643C8.9841 24.1675 8.79666 23.3624 8.79666 22.3488L11.7481 4.96631C11.9237 4.00905 12.2809 3.29956 12.8197 2.83783C13.5341 2.25223 14.3539 1.95941 15.2792 1.95941C16.1224 1.95941 16.8719 2.15087 17.5278 2.53376C18.1837 2.9054 18.6287 3.46286 18.8629 4.20612L22.9034 16.0816L26.6103 4.69605C26.8795 3.91896 27.3304 3.27141 27.9629 2.75337C28.607 2.22406 29.3392 1.95941 30.1589 1.95941C31.0608 1.95941 31.8689 2.21281 32.5833 2.71958C33.3093 3.2151 33.7368 3.8739 33.8656 4.69605L37.0805 22.2643C37.0805 24.5279 36.3368 25.6598 34.8494 25.6598C33.5611 25.6598 32.6828 25.35 32.2143 24.7306C31.8746 24.2688 31.6347 23.5538 31.494 22.5853L29.6318 11.7234L26.2413 22.5516C26.0187 23.2948 25.8079 23.8748 25.6088 24.2914C25.4097 24.6968 25.1054 25.0347 24.6953 25.305C24.2971 25.564 23.7467 25.6935 23.044 25.6935C22.2007 25.6935 21.539 25.4852 21.0589 25.0684C20.5904 24.6404 20.2216 24.0099 19.9522 23.1765L16.14 11.7234Z" fill="currentColor" />
      <path d="M83.9994 2.78727V22.7543C83.9994 23.5651 83.765 24.2409 83.2965 24.7813C82.828 25.322 82.1781 25.5922 81.3465 25.5922C80.5388 25.5922 79.8945 25.322 79.414 24.7813C78.9455 24.2297 78.7116 23.5539 78.7116 22.7543V2.78727C78.7116 2.29176 78.8113 1.83003 79.0102 1.40208C79.2211 0.962879 79.5256 0.619395 79.9235 0.371637C80.3334 0.123879 80.8078 0 81.3465 0C82.1667 0 82.8104 0.270281 83.2789 0.810842C83.7594 1.34015 83.9994 1.99895 83.9994 2.78727Z" fill="currentColor" />
      <path d="M68.7635 25.2041C69.4309 24.8664 70.0867 24.3257 70.731 23.5825C71.223 24.9226 72.0718 25.5926 73.2783 25.5926C74.1099 25.5926 74.7712 25.2999 75.2634 24.7143C75.7668 24.1286 76.0188 23.4191 76.0188 22.5859V10.2036C76.0188 9.47157 75.7553 8.8578 75.2282 8.36228C74.7132 7.8555 74.0748 7.6021 73.3132 7.6021C72.1538 7.6021 71.3047 8.22712 70.7661 9.4772C70.0401 8.76771 69.3372 8.25529 68.6583 7.93997C67.9789 7.62466 67.1587 7.46699 66.1986 7.46699C64.1842 7.46699 62.3688 8.23842 60.7526 9.78127C58.9137 11.5268 57.9943 13.7904 57.9943 16.5721C57.9943 19.579 59.0371 21.9777 61.1212 23.7684C61.953 24.4639 62.8409 24.9712 63.7857 25.2898C64.2552 24.0749 64.7015 22.9278 65.0121 21.9043C65.2309 20.7701 64.7563 19.8451 64.2704 18.8976C63.7664 17.9142 63.2495 16.9067 63.4826 15.6164C64.5154 10.0764 71.2295 11.1962 70.2621 16.7471C70.0294 18.0374 69.19 18.8189 68.3706 19.5814C67.5814 20.3163 66.8111 21.0338 66.6196 22.1724C66.5551 23.2182 66.5717 24.4184 66.5877 25.6893C67.4365 25.6602 68.1616 25.4985 68.7635 25.2041Z" fill="currentColor" />
      <path d="M3.45015 15.068L6.6599 15.5695C6.91601 15.6096 7.11682 15.7102 7.26239 15.8714C7.4045 16.0321 7.45588 16.2288 7.41651 16.4616C7.37663 16.6977 7.26079 16.8717 7.06902 16.9837C6.87378 17.0952 6.6516 17.1314 6.40256 17.0925L3.19278 16.591C3.12837 16.9721 3.0064 17.2145 2.82687 17.318C2.67362 17.4152 2.50228 17.449 2.31284 17.4194C2.19358 17.4008 2.07973 17.3501 1.97129 17.2674C1.85934 17.1841 1.78736 17.088 1.75535 16.9792C1.70922 16.8473 1.70953 16.6431 1.75627 16.3665L0.767031 16.2119C0.517971 16.173 0.320647 16.073 0.175067 15.9117C0.0265499 15.7466 -0.027472 15.5442 0.0130014 15.3047C0.0523349 15.072 0.167593 14.9013 0.358777 14.7927C0.549959 14.6841 0.771836 14.6495 1.02441 14.6889L2.01365 14.8435L2.08719 14.4084C2.12425 14.1891 2.21815 14.0168 2.36895 13.8916C2.52032 13.7629 2.70827 13.716 2.93278 13.7511C3.15378 13.7857 3.31663 13.8873 3.42134 14.056C3.52605 14.2247 3.56017 14.417 3.52369 14.6329L3.45015 15.068Z" fill="currentColor" />
      <path d="M2.9618 11.339C2.7422 10.8061 2.66832 10.3271 2.74014 9.90212C2.83477 9.34216 3.08391 8.91198 3.48753 8.61149C3.88947 8.32115 4.41491 8.22671 5.06388 8.32811L7.81063 8.75728C8.06318 8.79676 8.26224 8.89713 8.40787 9.05834C8.55343 9.21959 8.60595 9.41996 8.56552 9.65944C8.52615 9.89219 8.41063 10.0646 8.21887 10.1765C8.02418 10.2846 7.80232 10.3192 7.55322 10.2803L5.24853 9.92014C4.9328 9.87079 4.66124 9.90109 4.43383 10.011C4.20292 10.1203 4.06237 10.3234 4.0122 10.6202C3.9706 10.8665 4.03404 11.0876 4.20256 11.2835C4.37165 11.4762 4.58598 11.5928 4.84556 11.6333L7.26079 12.0107C7.51334 12.0502 7.71246 12.1505 7.85803 12.3118C8.0036 12.473 8.05617 12.6733 8.01568 12.9129C7.97637 13.1456 7.8608 13.318 7.66907 13.4299C7.47436 13.538 7.25248 13.5726 7.00344 13.5337L0.783823 12.5618C0.629471 12.5377 0.490493 12.4865 0.36688 12.4084C0.240332 12.3263 0.14816 12.2219 0.0903662 12.0951C0.0331433 11.965 0.0176428 11.8224 0.043865 11.6672C0.0837686 11.4311 0.199313 11.2587 0.390495 11.1501C0.578743 11.0376 0.795644 11.0005 1.0412 11.0388L2.9618 11.339Z" fill="currentColor" />
      <path d="M6.85819 5.90079C7.19215 5.84217 7.44756 5.72629 7.62448 5.55312C7.82524 5.36636 7.94815 5.13976 7.9932 4.8733C8.04337 4.57644 8.01993 4.27849 7.92281 3.97942L7.77009 3.50893C7.74345 3.43207 7.73515 3.3321 7.74517 3.20901C7.76341 3.10108 7.81088 3.00117 7.88765 2.90929C7.96495 2.81404 8.05962 2.74401 8.17159 2.69919C8.28356 2.65436 8.39396 2.64045 8.5027 2.65744C8.79733 2.70349 9.03125 2.9495 9.20427 3.39547C9.41515 3.93737 9.46616 4.53042 9.35729 5.17472C9.28602 5.59635 9.13283 5.98097 8.89767 6.32853C8.66247 6.67606 8.35753 6.95733 7.98272 7.17231C7.43829 7.475 6.78725 7.56715 6.02949 7.44874C5.52439 7.36978 5.07544 7.18196 4.68272 6.88517C4.29002 6.58835 4.00131 6.21952 3.81657 5.77865C3.6324 5.33441 3.58108 4.87108 3.6626 4.38875C3.7407 3.92663 3.9315 3.52194 4.23502 3.17467C4.53912 2.82403 4.91313 2.57087 5.35713 2.41521C5.80107 2.25954 6.25809 2.21843 6.72816 2.29188C6.97722 2.3308 7.15112 2.4099 7.24976 2.52917C7.34843 2.64847 7.37811 2.82447 7.33875 3.05722L6.85819 5.90079ZM6.11811 3.72859C5.43124 3.78745 5.04308 4.08166 4.95361 4.61122C4.87436 5.0801 5.1468 5.47064 5.77094 5.78282L6.11811 3.72859Z" fill="currentColor" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      width="12"
      height="20"
      viewBox="0 0 12 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M10 2L2 10L10 18"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckoutHeader({
  step = 'plan',
  title,
  closeAriaLabel = 'Close checkout',
  onBack,
  onClose,
  onStepSelect,
}: CheckoutHeaderProps) {
  const currentStepperIndex = step === 'plan' ? 0 : step === 'delivery' ? 1 : 2;
  const showBackButton = !title && step !== 'plan';

  return (
    <div
      className="h-[56px] shrink-0 border-b bg-[var(--checkout-header-bg)]"
      style={{
        ...checkoutHeaderStyle,
        borderColor: 'var(--checkout-header-border)',
      }}
    >
      <div className="flex h-full w-full items-stretch">
        <div
          className={`flex h-full shrink-0 items-center justify-center ${
            showBackButton ? 'w-[56px]' : 'w-[88px] md:w-[112px]'
          }`}
        >
          {showBackButton ? (
            <button
              type="button"
              onClick={onBack}
              className="flex size-[56px] cursor-pointer items-center justify-center text-[var(--checkout-header-back-icon)]"
              aria-label="Back"
            >
              <ChevronLeftIcon />
            </button>
          ) : (
            <CheckoutLogo />
          )}
        </div>

        <div className="flex flex-1 items-center justify-center px-[8px]">
          {title ? (
            <p
              className={[
                TEXT_TRIM_CLASS_NAME,
                'min-w-0 font-sans text-[length:var(--checkout-header-label-font-size-sm)] font-bold leading-[130%] text-[var(--checkout-header-text-active)]',
              ].join(' ')}
            >
              {title}
            </p>
          ) : (
            <Stepper current={currentStepperIndex} onStepSelect={onStepSelect} />
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="group flex size-[56px] shrink-0 cursor-pointer items-center justify-center"
          aria-label={closeAriaLabel}
        >
          <span className="flex size-[36px] items-center justify-center rounded-full bg-[var(--checkout-header-close-bg)] transition-colors duration-150 group-hover:bg-[var(--checkout-header-close-bg-hover)]">
            <span
              className={iconColorClassName.emphasis}
              style={iconColorStyle.emphasis}
            >
              <XIcon size={16} />
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}