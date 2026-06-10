import svgPaths from "./svg-i2x1s6nryk";

function Frame2() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[19.061px] left-1/2 top-1/2 w-[48px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48.0003 19.0607">
        <g id="Frame 3590">
          <path d={svgPaths.pbd80e00} fill="var(--fill-0, #4285F4)" id="Vector" />
          <path d={svgPaths.p332d0480} fill="var(--fill-0, #34A853)" id="Vector_2" />
          <path d={svgPaths.pd2d6500} fill="var(--fill-0, #FBBC04)" id="Vector_3" />
          <g id="Group">
            <path d={svgPaths.p230ba200} fill="var(--fill-0, #5F6368)" id="Vector_4" />
          </g>
          <path d={svgPaths.p3aaf0a00} fill="var(--fill-0, #EA4335)" id="Vector_5" />
        </g>
      </svg>
    </div>
  );
}

function Slot() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[56px] z-[3]" data-name="Slot">
      <div className="aspect-[32/32] h-full relative shrink-0" data-name="PayMethod2">
        <Frame2 />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] isolate items-start min-w-px py-[16px] relative z-[2]">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Quicksand:SemiBold',sans-serif] leading-[1.3] not-italic relative shrink-0 text-[#383e48] text-[16px] w-full z-[2]">Google Pay</p>
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