import type { PaymentResultTab } from './PaymentResultHeader';
import { PaymentResultHeader } from './PaymentResultHeader';
import { Button } from '../common/Button';
import {
  CHECKOUT_STEP_PAGE_LAYOUT,
  CHECKOUT_STEP_PAGE_VARS,
} from './checkoutStepPageLayoutTokens';
import { PaymentFailedIcon } from './failed/PaymentFailedIcon';
import {
  SuccessContactSection,
  successContactSectionStyle,
} from './success/SuccessContactSection';

const DEFAULT_FAILED_MESSAGE =
  'The purchase amount is below the minimum amount required to use Tabby, try adding more items or use another payment method';

type PaymentFailedScreenProps = {
  onClose: () => void;
  onTabChange: (tab: PaymentResultTab) => void;
  onRepeatPayment: () => void;
  onChangePaymentMethod: () => void;
  message?: string;
};

export function PaymentFailedScreen({
  onClose,
  onTabChange,
  onRepeatPayment,
  onChangePaymentMethod,
  message = DEFAULT_FAILED_MESSAGE,
}: PaymentFailedScreenProps) {
  return (
    <div
      className={CHECKOUT_STEP_PAGE_LAYOUT.page}
      style={{ ...CHECKOUT_STEP_PAGE_VARS, ...successContactSectionStyle }}
    >
      <PaymentResultHeader activeTab="failed" onTabChange={onTabChange} onClose={onClose} />

      <div className={CHECKOUT_STEP_PAGE_LAYOUT.container}>
        <div className={CHECKOUT_STEP_PAGE_LAYOUT.header}>
          <div className="flex flex-col items-center gap-[24px]">
            <div className="size-[56px] shrink-0">
              <PaymentFailedIcon />
            </div>

            <div className="flex w-full flex-col items-center gap-[16px] text-center">
              <h1 className={CHECKOUT_STEP_PAGE_LAYOUT.headerTitle}>Payment Unsuccessful</h1>
              <p
                className={[CHECKOUT_STEP_PAGE_LAYOUT.headerSubtitle, 'max-w-[560px]'].join(' ')}
              >
                {message}
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto inline-grid grid-cols-2 gap-[12px]">
          <Button
            type="button"
            variant="primary"
            size="medium"
            fullWidth
            className="whitespace-nowrap"
            onClick={onRepeatPayment}
          >
            Repeat payment
          </Button>
          <Button
            type="button"
            variant="neutral"
            size="medium"
            fullWidth
            className="whitespace-nowrap"
            onClick={onChangePaymentMethod}
          >
            Change payment method
          </Button>
        </div>

        <SuccessContactSection />
      </div>
    </div>
  );
}
