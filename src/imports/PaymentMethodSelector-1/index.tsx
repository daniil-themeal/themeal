import svgPaths from "./svg-n396n0cq6w";

function Slot() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[56px] z-[3]" data-name="Slot">
      <div className="aspect-[32/32] h-full relative shrink-0" data-name="PayMethod2">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[19.556px] left-1/2 top-1/2 w-[48px]" data-name="XMLID_34_">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48.0002 19.5556">
            <path d={svgPaths.p6feb900} fill="var(--fill-0, black)" id="XMLID_34_" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] isolate items-start min-w-px py-[16px] relative z-[2]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Quicksand:SemiBold',sans-serif] leading-[1.3] not-italic relative shrink-0 text-[#383e48] text-[16px] w-full z-[2]">Apple Pay</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center py-[16px] relative shrink-0 z-[1]">
      <div className="bg-[#e8ebef] opacity-0 relative rounded-[9999px] shrink-0 size-[20px]" data-name="RadioCheck" />
    </div>
  );
}

export default function PaymentMethodSelector() {
  return (
    <div className="content-stretch flex gap-[12px] isolate items-center pl-[16px] pr-[20px] relative rounded-[12px] size-full" data-name="PaymentMethodSelector">
      <div aria-hidden className="absolute border border-[#c7ced9] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Slot />
      <Frame />
      <Frame1 />
    </div>
  );
}