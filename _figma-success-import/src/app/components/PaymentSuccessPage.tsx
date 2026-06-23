import svgPaths from "../../imports/14401920/svg-p2146qmwl2";

const SOCIAL_LINKS = {
  whatsapp: 'https://wa.me/971544595462?text=',
  telegram: 'https://t.me/themealmenu_bot',
  facebook: 'https://www.facebook.com/themeal.menu/',
  instagram: 'https://www.instagram.com/themeal.menu_uae/',
  tiktok: 'https://www.tiktok.com/@themeal_uae',
  youtube: 'https://www.youtube.com/@TheMeal_menu',
} as const;

// ─── Icon components ────────────────────────────────────────────────────────

function CloseIcon() {
  return (
    <svg className="block size-full" fill="none" viewBox="0 0 14.5 14.5">
      <path
        d={svgPaths.pf54ce80}
        stroke="#8594AC"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
    </svg>
  );
}

function CheckmarkCircleIcon() {
  return (
    <svg className="block size-full" fill="none" viewBox="0 0 56 56">
      <circle cx="28" cy="28" fill="#7DD336" r="28" />
      <path
        d="M44 18L23 39L12 28"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="5.44"
      />
    </svg>
  );
}

function DeliveryTruckIcon() {
  return (
    <svg className="block size-full" fill="none" viewBox="0 0 16 16">
      <path
        d={svgPaths.p15ecc500}
        stroke="#383E48"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function CalendarRuleIcon() {
  return (
    <div className="relative size-full">
      <div className="absolute bg-white inset-[14.58%_7.5%_10.42%_7.5%] rounded-[6px]" />
      <div className="absolute bg-[#b9ab35] inset-[14.58%_7.5%_62.92%_7.5%] rounded-tl-[6px] rounded-tr-[6px]" />
      <div className="absolute bg-[#d8c84c] inset-[7.08%_65%_80.42%_27.5%] rounded-[2px]" />
      <div className="absolute bg-[#d8c84c] inset-[7.08%_27.5%_80.42%_65%] rounded-[2px]" />
      <div className="absolute bg-[#b9ab35] inset-[47.08%_67.5%_42.92%_22.5%] rounded-[1px]" />
      <div className="absolute bg-[#b9ab35] inset-[67.08%_67.5%_22.92%_22.5%] rounded-[1px]" />
      <div className="absolute bg-[#b9ab35] inset-[47.08%_45%_42.92%_45%] rounded-[1px]" />
      <div className="absolute bg-[#b9ab35] inset-[67.08%_45%_22.92%_45%] rounded-[1px]" />
      <div className="absolute bg-[#b9ab35] inset-[47.08%_22.5%_42.92%_67.5%] rounded-[1px]" />
      <div className="absolute bg-[#b9ab35] inset-[67.08%_22.5%_22.92%_67.5%] rounded-[1px]" />
    </div>
  );
}

function PauseRuleIcon() {
  return (
    <div className="relative size-full overflow-clip">
      <div className="absolute bottom-1/2 left-[31.82%] right-[31.82%] top-[9.09%]">
        <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 13.7143 15.4286">
          <path d={svgPaths.p1189d580} fill="#EEEEEE" />
        </svg>
      </div>
      <div className="absolute inset-[29.55%_36.36%_54.55%_36.36%]">
        <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 10.2857 6">
          <path d={svgPaths.p3f18e130} fill="#F029A8" />
        </svg>
      </div>
      <div className="absolute bottom-[9.09%] left-[31.82%] right-[31.82%] top-1/2">
        <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 13.7143 15.4286">
          <path d={svgPaths.p3fcc7780} fill="#EEEEEE" />
        </svg>
      </div>
      <div className="absolute inset-[70.45%_36.36%_13.64%_36.36%]">
        <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 10.2857 6">
          <path d={svgPaths.p3ab6f780} fill="#F029A8" />
        </svg>
      </div>
      <div className="absolute bg-[#d9d9d9] inset-[4.55%_27.27%_90.91%_27.27%]" />
      <div className="absolute bg-[#d9d9d9] inset-[90.91%_27.27%_4.55%_27.27%]" />
    </div>
  );
}

function MealRuleIcon() {
  return (
    <div className="relative size-full overflow-clip">
      <div className="absolute inset-[12.5%]">
        <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 36 36">
          <path d={svgPaths.p37de9680} fill="#F5976F" />
        </svg>
      </div>
      <div className="absolute inset-[23.21%]">
        <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 25.7143 25.7143">
          <path d={svgPaths.p108f7a00} fill="#FACFBC" />
        </svg>
      </div>
      <div className="absolute inset-[24.89%_80.19%_24.89%_11.34%]">
        <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 4.06434 24.1069">
          <path d={svgPaths.pa38dd00} fill="#49515F" />
        </svg>
      </div>
      <div className="absolute inset-[24.89%_11.36%_24.89%_82.73%]">
        <div className="absolute inset-[1.65%_0_0_0]">
          <svg className="block size-full" fill="none" viewBox="0 0 2.8376 23.7092">
            <path d={svgPaths.p74e9c00} fill="#49515F" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ClockRuleIcon() {
  return (
    <div className="relative size-full overflow-clip">
      <div className="absolute inset-[8.33%]">
        <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 31.4286 31.4286">
          <path d={svgPaths.p35fe5270} fill="#EEEEEE" />
        </svg>
      </div>
      <div className="absolute inset-[16.67%]">
        <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 25.1429 25.1429">
          <path d={svgPaths.p2da18c40} fill="#D9DEE5" />
        </svg>
      </div>
      <div className="absolute bottom-1/2 left-[47.92%] right-[47.92%] top-[22.92%]">
        <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 1.57143 10.2143">
          <path d={svgPaths.p356ab300} fill="#411864" />
        </svg>
      </div>
      <div className="absolute inset-[48.23%_34.82%_34.83%_48.24%]">
        <div className="absolute inset-[5.86%]">
          <svg className="block size-full" fill="none" viewBox="0 0 5.63918 5.63977">
            <path d={svgPaths.p1a694c00} fill="#411864" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%]">
        <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 3.14286 3.14286">
          <path d={svgPaths.pe379300} fill="#411864" />
        </svg>
      </div>
      <div className="absolute inset-[47.92%]">
        <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 1.57143 1.57143">
          <path d={svgPaths.p3ee34c80} fill="#AE60F2" />
        </svg>
      </div>
    </div>
  );
}

function SnowflakeRuleIcon() {
  return (
    <div className="relative size-full overflow-clip">
      <div className="absolute inset-[8.33%_13.33%_8.33%_13.25%]">
        <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 27.6884 31.4286">
          <path clipRule="evenodd" d={svgPaths.p2b0a6200} fill="#216172" fillRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}

function RecycleRuleIcon() {
  return (
    <div className="relative size-full overflow-clip">
      <div className="absolute inset-[12.75%_7.67%_4.17%_7.96%]">
        <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 30.3748 29.91">
          <path d={svgPaths.p14bfba80} fill="#355917" />
        </svg>
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="block size-full" fill="none" viewBox="0 0 29 30">
      <g clipPath="url(#wa-clip)">
        <path d={svgPaths.p24e82b00} fill="url(#wa-grad1)" />
        <path d={svgPaths.p365ea900} fill="url(#wa-grad2)" />
        <path d={svgPaths.p1862f500} fill="white" />
      </g>
      <defs>
        <linearGradient gradientUnits="userSpaceOnUse" id="wa-grad1" x1="1383.41" x2="1383.41" y1="2816.46" y2="1.0415">
          <stop stopColor="#1FAF38" />
          <stop offset="1" stopColor="#60D669" />
        </linearGradient>
        <linearGradient gradientUnits="userSpaceOnUse" id="wa-grad2" x1="1432.53" x2="1432.53" y1="2916.91" y2="0.537598">
          <stop stopColor="#F9F9F9" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <clipPath id="wa-clip">
          <rect fill="white" height="30" width="29" />
        </clipPath>
      </defs>
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg className="block size-full" fill="none" viewBox="0 0 30 30">
      <g clipPath="url(#tg-clip)">
        <path d={svgPaths.p1a9d0100} fill="url(#tg-grad)" />
        <path d={svgPaths.p3a741080} fill="white" />
      </g>
      <defs>
        <linearGradient gradientUnits="userSpaceOnUse" id="tg-grad" x1="1500" x2="1500" y1="0" y2="3000">
          <stop stopColor="#2AABEE" />
          <stop offset="1" stopColor="#229ED9" />
        </linearGradient>
        <clipPath id="tg-clip">
          <rect fill="white" height="30" width="30" />
        </clipPath>
      </defs>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="block size-full" fill="none" viewBox="0 0 40 39.9">
      <path d={svgPaths.pb11eb00} fill="#C7CED9" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg className="block size-full" fill="none" viewBox="0 0 40 40">
      <path d={svgPaths.padbdf00} fill="#C7CED9" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="block size-full" fill="none" viewBox="0 0 38 38">
      <path d={svgPaths.p11a6fbf0} fill="#C7CED9" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg className="block size-full" fill="none" viewBox="0 0 40 28">
      <path d={svgPaths.pef67e00} fill="#C7CED9" />
    </svg>
  );
}

// ─── Calendar types & data ───────────────────────────────────────────────────

type CalendarDay = {
  day: number;
  month: string;
  isMealDay: boolean;
  isDeliveryDay: boolean;
  isDisabled: boolean;
};

const calendarWeeks: CalendarDay[][] = [
  [
    { day: 7,  month: "Jul", isMealDay: false, isDeliveryDay: false, isDisabled: true },
    { day: 8,  month: "Jul", isMealDay: false, isDeliveryDay: false, isDisabled: true },
    { day: 9,  month: "Jul", isMealDay: true,  isDeliveryDay: true,  isDisabled: false },
    { day: 10, month: "Jul", isMealDay: true,  isDeliveryDay: false, isDisabled: false },
    { day: 11, month: "Jul", isMealDay: true,  isDeliveryDay: false, isDisabled: false },
    { day: 12, month: "Jul", isMealDay: false, isDeliveryDay: false, isDisabled: false },
    { day: 13, month: "Jul", isMealDay: false, isDeliveryDay: true,  isDisabled: false },
  ],
  [
    { day: 14, month: "Sep", isMealDay: true,  isDeliveryDay: false, isDisabled: false },
    { day: 15, month: "Jul", isMealDay: true,  isDeliveryDay: false, isDisabled: false },
    { day: 16, month: "Jul", isMealDay: true,  isDeliveryDay: true,  isDisabled: false },
    { day: 17, month: "Jul", isMealDay: true,  isDeliveryDay: false, isDisabled: false },
    { day: 18, month: "Jul", isMealDay: true,  isDeliveryDay: false, isDisabled: false },
    { day: 19, month: "Jul", isMealDay: false, isDeliveryDay: false, isDisabled: false },
    { day: 20, month: "Jul", isMealDay: false, isDeliveryDay: true,  isDisabled: false },
  ],
  [
    { day: 21, month: "JUL", isMealDay: true,  isDeliveryDay: false, isDisabled: false },
    { day: 22, month: "Jul", isMealDay: true,  isDeliveryDay: false, isDisabled: false },
    { day: 23, month: "Jul", isMealDay: true,  isDeliveryDay: true,  isDisabled: false },
    { day: 24, month: "Jul", isMealDay: true,  isDeliveryDay: false, isDisabled: false },
    { day: 25, month: "Jul", isMealDay: true,  isDeliveryDay: false, isDisabled: false },
    { day: 26, month: "Jul", isMealDay: false, isDeliveryDay: false, isDisabled: false },
    { day: 27, month: "Jul", isMealDay: false, isDeliveryDay: true,  isDisabled: false },
  ],
  [
    { day: 28, month: "JUL", isMealDay: true,  isDeliveryDay: false, isDisabled: false },
    { day: 29, month: "Jul", isMealDay: true,  isDeliveryDay: false, isDisabled: false },
    { day: 30, month: "Jul", isMealDay: true,  isDeliveryDay: true,  isDisabled: false },
    { day: 31, month: "Jul", isMealDay: true,  isDeliveryDay: false, isDisabled: false },
    { day: 1,  month: "Aug", isMealDay: true,  isDeliveryDay: false, isDisabled: false },
    { day: 2,  month: "AUg", isMealDay: false, isDeliveryDay: false, isDisabled: false },
    { day: 3,  month: "AUg", isMealDay: false, isDeliveryDay: true,  isDisabled: false },
  ],
  [
    { day: 4,  month: "AUG", isMealDay: true,  isDeliveryDay: false, isDisabled: false },
    { day: 5,  month: "AUg", isMealDay: true,  isDeliveryDay: false, isDisabled: false },
    { day: 6,  month: "AUg", isMealDay: true,  isDeliveryDay: false, isDisabled: false },
    { day: 7,  month: "AUG", isMealDay: false, isDeliveryDay: false, isDisabled: true },
    { day: 8,  month: "AUG", isMealDay: false, isDeliveryDay: false, isDisabled: true },
    { day: 9,  month: "AUG", isMealDay: false, isDeliveryDay: false, isDisabled: true },
    { day: 10, month: "Aug", isMealDay: false, isDeliveryDay: false, isDisabled: true },
  ],
];

// ─── Rules data ──────────────────────────────────────────────────────────────

type RuleIconKey = "calendar" | "pause" | "meal" | "clock" | "snowflake" | "recycle";

const rules: { iconBg: string; iconKey: RuleIconKey; title: string; description: string }[] = [
  {
    iconBg: "#FBD759",
    iconKey: "calendar",
    title: "Fixed Delivery Days",
    description: "Deliveries are on Wednesdays and Sundays only — days cannot be changed",
  },
  {
    iconBg: "#F354B9",
    iconKey: "pause",
    title: "Delivery Pause",
    description: "You can pause for 1–2 weeks for free (depending on the length of your plan). The price of longer pause is 90 AED",
  },
  {
    iconBg: "#F06428",
    iconKey: "meal",
    title: "Set Menu",
    description: "Our meal menu is fixed — changing dishes or removing ingredients is not possible. But you can change the format, duration and number of meals per day",
  },
  {
    iconBg: "#AE60F2",
    iconKey: "clock",
    title: "Order Changes Deadline",
    description: "You can only reschedule at least 3 days in advance, and update the delivery time or address at least 2 days before",
  },
  {
    iconBg: "#78CBE2",
    iconKey: "snowflake",
    title: "Storage Instructions",
    description: "Meals stay fresh for 6 days. Please refrigerate immediately after delivery",
  },
  {
    iconBg: "#A8E278",
    iconKey: "recycle",
    title: "Return the Box",
    description: "Please return the box with iceblocks by leaving it at your door before next delivery — the courier will pick it up",
  },
];

function RuleIcon({ iconKey }: { iconKey: RuleIconKey }) {
  switch (iconKey) {
    case "calendar":  return <CalendarRuleIcon />;
    case "pause":     return <PauseRuleIcon />;
    case "meal":      return <MealRuleIcon />;
    case "clock":     return <ClockRuleIcon />;
    case "snowflake": return <SnowflakeRuleIcon />;
    case "recycle":   return <RecycleRuleIcon />;
  }
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function PageHeader() {
  return (
    <header className="bg-white relative shrink-0 w-full border-b border-[#d9dee5]">
      <div className="flex items-center justify-end w-full">
        <CloseButton />
      </div>
    </header>
  );
}

function CloseButton() {
  return (
    <button
      aria-label="Close"
      className="flex items-center justify-center size-[56px] rounded-full hover:bg-gray-100 transition-colors"
    >
      <div className="size-[24px] flex items-center justify-center">
        <div className="size-[14.5px]">
          <CloseIcon />
        </div>
      </div>
    </button>
  );
}

function SuccessSection() {
  return (
    <section className="flex flex-col gap-[24px] items-center w-full">
      <div className="size-[56px] shrink-0">
        <CheckmarkCircleIcon />
      </div>
      <div className="flex flex-col gap-[32px] items-center w-full">
        <div className="flex flex-col gap-[16px] items-center text-center px-[24px] w-full">
          <h1
            className="text-[#383e48] text-[48px] tracking-[-0.96px] w-full"
            style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}
          >
            Payment successful!
          </h1>
          <p
            className="text-[#383e48] text-[20px] w-full"
            style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 500 }}
          >
            Thank you for choosing us!
          </p>
        </div>
        <GoToMainButton />
      </div>
    </section>
  );
}

function GoToMainButton() {
  return (
    <button className="bg-[#9a38ef] h-[48px] max-w-[380px] w-full rounded-[8px] flex items-center justify-center hover:opacity-90 transition-opacity">
      <span
        className="text-white text-[16px] whitespace-nowrap"
        style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}
      >
        Go to main page
      </span>
    </button>
  );
}

function CalendarLegend() {
  return (
    <div className="flex flex-wrap gap-[16px] items-center justify-center pb-[8px] w-full">
      <MealDaysLegendItem />
      <DeliveryDaysLegendItem />
    </div>
  );
}

function MealDaysLegendItem() {
  return (
    <div className="flex gap-[4px] items-center">
      <div className="bg-[#f5ebfd] rounded-[4px] shrink-0 size-[16px]" />
      <span
        className="text-[#383e48] text-[14px] whitespace-nowrap"
        style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 400 }}
      >
        Meal days
      </span>
    </div>
  );
}

function DeliveryDaysLegendItem() {
  return (
    <div className="flex gap-[4px] items-center">
      <div className="relative shrink-0 size-[16px]">
        <DeliveryTruckIcon />
      </div>
      <span
        className="text-[#383e48] text-[14px] whitespace-nowrap"
        style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 400 }}
      >
        Delivery days
      </span>
    </div>
  );
}

function WeekdayHeaderRow() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div className="flex items-center overflow-clip pb-[4px] pt-[12px] w-full">
      {days.map((day) => (
        <div key={day} className="flex flex-1 items-center justify-center min-w-0">
          <span
            className="text-[#383e48] text-[14px] tracking-[0.28px] whitespace-nowrap"
            style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 500 }}
          >
            {day}
          </span>
        </div>
      ))}
    </div>
  );
}

function CalendarDayCell({ dayData, isFirstInMealRun, isLastInMealRun }: {
  dayData: CalendarDay;
  isFirstInMealRun: boolean;
  isLastInMealRun: boolean;
}) {
  const { day, month, isMealDay, isDeliveryDay, isDisabled } = dayData;

  const textColor = isDisabled ? "#adb7c7" : "#383e48";
  const bgClass = isMealDay ? "bg-[#f5ebfd]" : "";
  const roundLeft = isMealDay && isFirstInMealRun ? "rounded-tl-[8px] rounded-bl-[8px]" : "";
  const roundRight = isMealDay && isLastInMealRun ? "rounded-tr-[8px] rounded-br-[8px]" : "";

  return (
    <div className={`flex-1 h-[48px] min-w-0 relative ${bgClass} ${roundLeft} ${roundRight}`}>
      <div className="flex items-center justify-center size-full">
        <div className="flex flex-col items-center gap-[6px] relative">
          <span
            className="text-[16px] tracking-[-0.16px] w-[40px] text-center"
            style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700, color: textColor }}
          >
            {day}
          </span>
          <span
            className="text-[12px] whitespace-nowrap text-center"
            style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700, color: textColor }}
          >
            {month}
          </span>
        </div>
        {isDeliveryDay && (
          <div className="absolute right-[8px] top-0 size-[16px]">
            <DeliveryTruckIcon />
          </div>
        )}
      </div>
    </div>
  );
}

function CalendarWeekRow({ week }: { week: CalendarDay[] }) {
  return (
    <div className="flex items-center overflow-clip w-full">
      {week.map((dayData, index) => {
        const prevIsMeal = index > 0 && week[index - 1].isMealDay;
        const nextIsMeal = index < week.length - 1 && week[index + 1].isMealDay;
        const isFirstInMealRun = dayData.isMealDay && !prevIsMeal;
        const isLastInMealRun = dayData.isMealDay && !nextIsMeal;

        return (
          <CalendarDayCell
            key={index}
            dayData={dayData}
            isFirstInMealRun={isFirstInMealRun}
            isLastInMealRun={isLastInMealRun}
          />
        );
      })}
    </div>
  );
}

function CalendarGrid() {
  return (
    <div className="flex flex-col gap-[8px] w-full">
      {calendarWeeks.map((week, rowIndex) => (
        <CalendarWeekRow key={rowIndex} week={week} />
      ))}
    </div>
  );
}

function DeliveryCalendarSection() {
  return (
    <section className="flex flex-col gap-[12px] w-full rounded-[20px]">
      <CalendarLegend />
      <WeekdayHeaderRow />
      <CalendarGrid />
    </section>
  );
}

function RuleIconCircle({ iconBg, iconKey }: { iconBg: string; iconKey: RuleIconKey }) {
  return (
    <div className="relative shrink-0 size-[48px]">
      <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 48 48">
        <circle cx="24" cy="24" fill={iconBg} r="24" />
      </svg>
      <div className="absolute inset-[14.29%]">
        <RuleIcon iconKey={iconKey} />
      </div>
    </div>
  );
}

function RuleContent({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col gap-[12px] flex-1 min-w-0 py-[4px]">
      <h3
        className="text-[#383e48] text-[20px] w-full"
        style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}
      >
        {title}
      </h3>
      <p
        className="text-[#383e48] text-[16px] w-full"
        style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 500 }}
      >
        {description}
      </p>
    </div>
  );
}

function RuleItem({ iconBg, iconKey, title, description }: {
  iconBg: string;
  iconKey: RuleIconKey;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-[20px] items-start w-full">
      <RuleIconCircle iconBg={iconBg} iconKey={iconKey} />
      <RuleContent title={title} description={description} />
    </div>
  );
}

function RulesSection() {
  return (
    <section className="flex flex-col gap-[32px] w-full px-[32px]">
      <h2
        className="text-[#2f3846] text-[31px] text-center w-full"
        style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}
      >
        Please, read our rules
      </h2>
      <div className="flex flex-col gap-[24px] w-full">
        {rules.map((rule) => (
          <RuleItem key={rule.title} {...rule} />
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="flex flex-col gap-[20px] items-center px-[32px] w-full">
      <p
        className="text-[#383e48] text-[20px] text-center tracking-[-0.4px] max-w-[400px]"
        style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 400 }}
      >
        For any questions, feel free to contact us. We'll be happy to assist you!
      </p>
      <ContactButtons />
    </section>
  );
}

function ContactButtons() {
  return (
    <div className="flex gap-[16px] items-center">
      <WhatsAppButton />
      <TelegramButton />
    </div>
  );
}

function WhatsAppButton() {
  return (
    <a
      href={SOCIAL_LINKS.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="bg-white flex items-center justify-center p-[8.842px] rounded-[10px] size-[48px] hover:shadow-md transition-shadow"
    >
      <div className="size-[29px]">
        <WhatsAppIcon />
      </div>
    </a>
  );
}

function TelegramButton() {
  return (
    <a
      href={SOCIAL_LINKS.telegram}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Telegram"
      className="bg-white flex items-center justify-center p-[8.842px] rounded-[10px] size-[48px] hover:shadow-md transition-shadow"
    >
      <div className="size-[30px]">
        <TelegramIcon />
      </div>
    </a>
  );
}

function SocialSection() {
  return (
    <section className="flex flex-col gap-[16px] items-center w-full">
      <p
        className="text-[#383e48] text-[20px] text-center tracking-[-0.4px] w-full"
        style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 400 }}
      >
        Follow us
      </p>
      <SocialIconRow />
    </section>
  );
}

function SocialIconRow() {
  return (
    <div className="flex gap-[16px] items-center justify-center px-[24px] w-full">
      <SocialIconButton label="Facebook" href={SOCIAL_LINKS.facebook}>
        <FacebookIcon />
      </SocialIconButton>
      <SocialIconButton label="TikTok" href={SOCIAL_LINKS.tiktok}>
        <TikTokIcon />
      </SocialIconButton>
      <SocialIconButton label="Instagram" href={SOCIAL_LINKS.instagram}>
        <InstagramIcon />
      </SocialIconButton>
      <SocialIconButton label="YouTube" href={SOCIAL_LINKS.youtube}>
        <YouTubeIcon />
      </SocialIconButton>
    </div>
  );
}

function SocialIconButton({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="overflow-clip relative shrink-0 size-[48px] flex items-center justify-center hover:opacity-70 transition-opacity"
    >
      <div className="size-[40px] flex items-center justify-center">
        {children}
      </div>
    </a>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export function PaymentSuccessPage() {
  return (
    <div className="bg-[#f3f4f7] flex flex-col items-center min-h-full w-full">
      <PageHeader />
      <main className="flex flex-col gap-[48px] items-center pb-[120px] pt-[48px] w-full max-w-[680px] px-[16px]">
        <SuccessSection />
        <DeliveryCalendarSection />
        <RulesSection />
        <ContactSection />
        <SocialSection />
      </main>
    </div>
  );
}
