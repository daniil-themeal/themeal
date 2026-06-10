import svgPathsCard from '../../../imports/PaymentMethodSelector/svg-ewgwyt5b1v';
import svgPathsApplePay from '../../../imports/PaymentMethodSelector-1/svg-n396n0cq6w';
import svgPathsGooglePay from '../../../imports/PaymentMethodSelector-2/svg-i2x1s6nryk';

type PaymentMethod = 'card' | 'apple-pay' | 'google-pay';

type PaymentMethodSelectorProps = {
  method: PaymentMethod;
  selected: boolean;
  onSelect: () => void;
};

function CreditCardIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]">
      <div className="absolute inset-[16.67%_4.17%]">
        <div className="absolute inset-[-7.81%_-5.68%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 24.5 18.5"
          >
            <path
              d={svgPathsCard.p358b1e00}
              stroke="#383E48"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ApplePayIcon() {
  return (
    <div className="aspect-[32/32] h-full relative shrink-0">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[19.556px] left-1/2 top-1/2 w-[48px]">
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 48.0002 19.5556"
        >
          <path d={svgPathsApplePay.p6feb900} fill="black" />
        </svg>
      </div>
    </div>
  );
}

function GooglePayIcon() {
  return (
    <div className="aspect-[32/32] h-full relative shrink-0">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[19.061px] left-1/2 top-1/2 w-[48px]">
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 48.0003 19.0607"
        >
          <path d={svgPathsGooglePay.pbd80e00} fill="#4285F4" />
          <path d={svgPathsGooglePay.p332d0480} fill="#34A853" />
          <path d={svgPathsGooglePay.pd2d6500} fill="#FBBC04" />
          <path d={svgPathsGooglePay.p230ba200} fill="#5F6368" />
          <path d={svgPathsGooglePay.p3aaf0a00} fill="#EA4335" />
        </svg>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[16px] top-1/2">
      <div className="absolute bottom-[29.17%] left-[16.67%] right-[16.67%] top-1/4">
        <div className="absolute inset-[-10.91%_-7.5%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 12.2667 8.93333"
          >
            <path
              d={svgPathsCard.p2ea7ce0}
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function PaymentMethodSelector({
  method,
  selected,
  onSelect,
}: PaymentMethodSelectorProps) {
  const bgColor = selected ? 'bg-[#f5ebfd]' : 'bg-white';
  const borderColor = selected ? 'border-[#e0c1fa]' : 'border-[#c7ced9]';
  const textColor = selected ? 'text-[#9a38ef]' : 'text-[#383e48]';
  const radioBg = selected ? 'bg-[#9a38ef]' : 'bg-[#e8ebef]';
  const radioOpacity = selected ? 'opacity-100' : 'opacity-0';

  const methodTitle =
    method === 'card'
      ? 'Debit/Credit Card'
      : method === 'apple-pay'
        ? 'Apple Pay'
        : 'Google Pay';

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`${bgColor} content-stretch flex gap-[12px] isolate items-center pl-[16px] pr-[20px] relative rounded-[12px] w-full h-[56px] cursor-pointer transition-colors hover:opacity-90`}
    >
      <div
        aria-hidden
        className={`absolute border ${borderColor} border-solid inset-0 pointer-events-none rounded-[12px]`}
      />

      <div className="content-stretch flex items-center justify-center relative shrink-0 size-[56px] z-[3]">
        {method === 'card' ? (
          <CreditCardIcon />
        ) : method === 'apple-pay' ? (
          <ApplePayIcon />
        ) : (
          <GooglePayIcon />
        )}
      </div>

      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] isolate items-start min-w-px py-[16px] relative z-[2]">
        <p
          className={`[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Quicksand'] leading-[1.3] not-italic relative shrink-0 ${textColor} text-[16px] font-semibold w-full z-[2] text-left`}
        >
          {methodTitle}
        </p>
      </div>

      <div className="content-stretch flex items-center py-[16px] relative shrink-0 z-[1]">
        <div
          className={`${radioBg} ${radioOpacity} relative rounded-[9999px] shrink-0 size-[20px] transition-opacity`}
        >
          {selected && <CheckIcon />}
        </div>
      </div>
    </button>
  );
}
