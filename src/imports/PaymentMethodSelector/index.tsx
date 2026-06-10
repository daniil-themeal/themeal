import svgPaths from "./svg-ewgwyt5b1v";

function Slot() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[56px] z-[3]" data-name="Slot">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Credit card">
        <div className="absolute inset-[16.67%_4.17%]" data-name="Icon">
          <div className="absolute inset-[-7.81%_-5.68%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.5 18.5">
              <path d={svgPaths.p358b1e00} id="Icon" stroke="var(--stroke-0, #383E48)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] isolate items-start min-w-px py-[16px] relative z-[2]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Quicksand:SemiBold',sans-serif] leading-[1.3] not-italic relative shrink-0 text-[#9a38ef] text-[16px] w-full z-[2]">Debit/Credit Card</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center py-[16px] relative shrink-0 z-[1]">
      <div className="bg-[#9a38ef] relative rounded-[9999px] shrink-0 size-[20px]" data-name="RadioCheck">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[16px] top-1/2" data-name="Check">
          <div className="absolute bottom-[29.17%] left-[16.67%] right-[16.67%] top-1/4" data-name="Icon">
            <div className="absolute inset-[-10.91%_-7.5%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.2667 8.93333">
                <path d={svgPaths.p2ea7ce0} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentMethodSelector() {
  return (
    <div className="bg-[#f5ebfd] content-stretch flex gap-[12px] isolate items-center pl-[16px] pr-[20px] relative rounded-[12px] size-full" data-name="PaymentMethodSelector">
      <div aria-hidden className="absolute border border-[#e0c1fa] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Slot />
      <Frame />
      <Frame1 />
    </div>
  );
}