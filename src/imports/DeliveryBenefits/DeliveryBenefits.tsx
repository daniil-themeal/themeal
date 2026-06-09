import svgPaths from "./svg-l5fmabf2yr";

function Frame5() {
  return (
    <div className="bg-[#f354b9] content-stretch flex items-center p-[8px] relative rounded-[30px] shrink-0">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Check">
        <div className="absolute bottom-[29.17%] left-[16.67%] right-[16.67%] top-1/4" data-name="Icon">
          <div className="absolute inset-[-11.36%_-7.81%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.5 13.5">
              <path d={svgPaths.p4930800} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[#f029a8] content-stretch flex gap-[6px] items-center justify-center px-[24px] py-[11px] relative rounded-[80px] shrink-0">
      <Frame5 />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-quicksand-bold leading-[1.2] not-italic relative shrink-0 text-[24px] text-center text-white uppercase w-[110px]">Any time</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[#fcec71] content-stretch flex items-center p-[8px] relative rounded-[30px] shrink-0">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Check">
        <div className="absolute bottom-[29.17%] left-[16.67%] right-[16.67%] top-1/4" data-name="Icon">
          <div className="absolute inset-[-11.36%_-7.81%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.5 13.5">
              <path d={svgPaths.p4930800} id="Icon" stroke="var(--stroke-0, #383E48)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[#fcde02] content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[11px] relative rounded-[80px] shrink-0">
      <Frame4 />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-quicksand-bold leading-[1.2] not-italic relative shrink-0 text-[#383e48] text-[24px] text-center uppercase whitespace-nowrap">Twice a week</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-[#49515f] content-stretch flex items-center p-[8px] relative rounded-[30px] shrink-0">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Check">
        <div className="absolute bottom-[29.17%] left-[16.67%] right-[16.67%] top-1/4" data-name="Icon">
          <div className="absolute inset-[-11.36%_-7.81%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.5 13.5">
              <path d={svgPaths.p4930800} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-[#383e48] content-stretch flex gap-[6px] items-center justify-center px-[24px] py-[11px] relative rounded-[80px] shrink-0">
      <Frame3 />
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-quicksand-bold leading-[1.2] not-italic relative shrink-0 text-[24px] text-center text-white uppercase whitespace-nowrap">Any Place</p>
    </div>
  );
}

export default function DeliveryBenefits() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-end relative size-full" data-name="DeliveryBenefits">
      <Frame />
      <Frame1 />
      <Frame2 />
    </div>
  );
}