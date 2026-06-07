import svgPaths from "../../imports/svgPaths";

function H2TitleContaner() {
  return (
    <div className="h2-title-row content-end flex flex-wrap items-end justify-center relative shrink-0 w-full">
      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Quicksand:Bold',sans-serif] not-italic relative shrink-0 text-[#383e48] h2-title text-center whitespace-nowrap">
        How
      </p>

      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Quicksand:Bold',sans-serif] not-italic relative shrink-0 text-[#383e48] h2-title text-center whitespace-nowrap">
        does
      </p>

      <div className="h2-title-logo relative shrink-0">
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 95 30"
        >
          <g>
            <path d={svgPaths.p12d38d00} fill="#383E48" />
            <path d={svgPaths.p30c12e00} fill="#383E48" />
            <path d={svgPaths.p6109970} fill="#383E48" />
            <path d={svgPaths.p3e2a2e00} fill="#383E48" />
            <path d={svgPaths.p334b9b20} fill="#383E48" />
            <path d={svgPaths.p3982fe00} fill="#383E48" />
            <path d={svgPaths.p1bf76f00} fill="#383E48" />
          </g>
        </svg>
      </div>

      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Quicksand:Bold',sans-serif] not-italic relative shrink-0 text-[#383e48] h2-title text-center whitespace-nowrap">
        work?
      </p>
    </div>
  );
}

function Stage1Icon() {
  return (
    <div className="relative shrink-0 size-[120px]">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <g>
          <circle cx="50" cy="50" fill="var(--fill-0, #FFED68)" r="50" />
          <rect
            fill="var(--fill-0, #6D28AA)"
            height="2.85714"
            rx="1.42857"
            width="41.4286"
            x="28.7148"
            y="66.0629"
          />
          <path
            d="M30 41.0629H70V63.0629C70 64.7198 68.6569 66.0629 67 66.0629H33C31.3431 66.0629 30 64.7198 30 63.0629V41.0629Z"
            fill="var(--fill-0, #9A38EF)"
          />
          <path d={svgPaths.p3b7e9900} fill="var(--fill-0, #6D28AA)" />
          <path d={svgPaths.p2e5a5780} fill="var(--fill-0, #6D28AA)" />
          <path d={svgPaths.p70b8300} fill="var(--fill-0, #9A38EF)" />
          <rect
            fill="var(--fill-0, #9A38EF)"
            height="2"
            width="8"
            x="46"
            y="32.0629"
          />
          <path d={svgPaths.p31e0b080} fill="var(--fill-0, #9A38EF)" />
          <path d={svgPaths.p33e15e0} fill="var(--fill-0, #9A38EF)" />
        </g>
      </svg>
    </div>
  );
}

function Stage() {
  return (
    <div className="content-stretch flex flex-col flex-1 gap-[12px] items-center relative shrink-0 w-full">
      <Stage1Icon />
      <p className="[word-break:break-word] font-['Quicksand:Bold',sans-serif] leading-[1.4] min-w-full not-italic relative shrink-0 text-[#383e48] text-[20px] sm:text-[20px] md:text-[25px] text-center w-[min-content]">
        We prepare tasty and nutritious food
      </p>
    </div>
  );
}

function Stage2Icon() {
  return (
    <div className="relative shrink-0 size-[120px]">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <g>
          <path d={svgPaths.pc34c200} fill="var(--fill-0, #FFED68)" />
          <rect
            fill="var(--fill-0, #6D28AA)"
            height="2.14286"
            rx="1.07143"
            width="48.5714"
            x="25.9385"
            y="66.86"
          />
          <path d={svgPaths.p19865100} fill="var(--fill-0, #9A38EF)" />
          <path d={svgPaths.p1b829900} fill="var(--fill-0, white)" />
          <path d={svgPaths.p1611ae00} fill="var(--fill-0, white)" />
          <circle cx="67" cy="62.0629" fill="var(--fill-0, #9A38EF)" r="3" />
          <circle cx="33" cy="62.0629" fill="var(--fill-0, #9A38EF)" r="3" />
          <path d={svgPaths.p1514b500} fill="var(--fill-0, #6D28AA)" />
        </g>
      </svg>
    </div>
  );
}

function Stage1() {
  return (
    <div className="content-stretch flex flex-col flex-1 gap-[12px] items-center relative shrink-0 w-full">
      <Stage2Icon />
      <p className="[word-break:break-word] font-['Quicksand:Bold',sans-serif] leading-[1.4] min-w-full not-italic relative shrink-0 text-[#383e48] text-[20px] sm:text-[20px] md:text-[25px] text-center w-[min-content]">
        We deliver free of charge within 3-hour slots twice a week
      </p>
    </div>
  );
}

function Stage3Icon() {
  return (
    <div className="relative shrink-0 size-[120px]">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <g>
          <circle cx="50" cy="50" fill="var(--fill-0, #FFED68)" r="50" />
          <rect
            fill="var(--fill-0, #551F83)"
            height="2"
            rx="1"
            width="52"
            x="24"
            y="67.063"
          />
          <path d={svgPaths.p372759a0} fill="var(--fill-0, #8C33D9)" />
          <path d={svgPaths.p38036640} fill="var(--fill-0, #551F83)" />
          <circle
            cx="3"
            cy="3"
            fill="var(--fill-0, #AE60F2)"
            r="3"
            transform="matrix(-1 0 0 1 74 35.063)"
          />
          <circle
            cx="3"
            cy="3"
            fill="var(--fill-0, #AE60F2)"
            r="3"
            transform="matrix(-1 0 0 1 74 44.063)"
          />
          <rect
            fill="var(--fill-0, #AE60F2)"
            height="2"
            rx="0.857143"
            transform="matrix(-1 0 0 1 74 55.063)"
            width="6"
          />
          <rect fill="var(--fill-0, white)" height="2" rx="1" width="27" x="33" y="54.063" />
          <path d={svgPaths.p3704c670} fill="var(--fill-0, white)" />
          <path
            clipRule="evenodd"
            d={svgPaths.p10283e00}
            fill="var(--fill-0, white)"
            fillRule="evenodd"
          />
        </g>
      </svg>
    </div>
  );
}

function Stage2() {
  return (
    <div className="content-stretch flex flex-col flex-1 gap-[12px] items-center relative shrink-0 w-full">
      <Stage3Icon />
      <p className="[word-break:break-word] font-['Quicksand:Bold',sans-serif] leading-[1.4] min-w-full not-italic relative shrink-0 text-[#383e48] text-[20px] sm:text-[20px] md:text-[25px] text-center w-[min-content]">
        Just heat and enjoy your food
      </p>
    </div>
  );
}

function StagesBlock() {
  return (
    <div className="content-stretch flex flex-col sm:flex-row gap-[32px] items-start relative shrink-0 w-full">
      <Stage />
      <Stage1 />
      <Stage2 />
    </div>
  );
}

export default function HowDoesTheMealWorkSection() {
  return (
    <div className="bg-[#fcde02] relative shrink-0 justify-center w-full flex items-center section-spacing-y section-spacing-x">
      <div className="gap-[32px] md:gap-[48px] lg:gap-[64px] relative flex items-center flex-col shrink-0 maxWidth w-full">
        <H2TitleContaner />
        <StagesBlock />
      </div>
    </div>
  );
}