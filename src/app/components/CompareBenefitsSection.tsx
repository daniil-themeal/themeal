import React from "react";
import svgPaths from "../../imports/svgPaths";

// ==========================================
// 1. КОМПОНЕНТ-ОБЕРТКА ДЛЯ КОНТРОЛЯ РАЗМЕРОВ
// ==========================================
// Меняя классы в 'baseClasses', ты одновременно меняешь размеры ВСЕХ иконок
function IconWrapper({ children }: { children: React.ReactNode }) {
  const baseClasses = "relative shrink-0 size-[48px] md:size-[56px] lg:size-[72px] flex items-center justify-center";
  return <div className={baseClasses}>{children}</div>;
}

// ==========================================
// 2. ЧИСТЫЕ ИКОНКИ БЕЗ ДУБЛИРОВАНИЯ РАЗМЕРОВ
// ==========================================

function IconCart() {
  return (
    <>
      <div className="absolute inset-[12.86%_13.82%_36.36%_6.67%]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38.1653 24.3777">
          <path d={svgPaths.p33c4380} fill="#E8EBEF" />
        </svg>
      </div>
      <div className="absolute flex inset-[11.43%_83.04%_82.27%_5.24%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="flex-none h-[hypot(-2.56135cqw,90.4857cqh)] rotate-[3.01deg] w-[hypot(97.4386cqw,9.51433cqh)]">
          <div className="relative size-full">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.48571 2.74286">
              <path d={svgPaths.p110f6b00} fill="#C7CED9" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute inset-[67.14%_54.76%_12.86%_25.24%]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.6 9.6">
          <path d={svgPaths.p30196f00} fill="#C7CED9" />
        </svg>
      </div>
      <div className="absolute inset-[67.14%_14.76%_12.86%_65.24%]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.6 9.6">
          <path d={svgPaths.p30196f00} fill="#C7CED9" />
        </svg>
      </div>
      <div className="absolute inset-[71.32%_59.04%_17.25%_29.53%]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.48571 5.48571">
          <path d={svgPaths.p1392bcc0} fill="#E8EBEF" />
        </svg>
      </div>
      <div className="absolute inset-[71.32%_19.04%_17.25%_69.53%]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.48571 5.48571">
          <path d={svgPaths.p1392bcc0} fill="#E8EBEF" />
        </svg>
      </div>
    </>
  );
}

function IconStove() {
  return (
    <>
      <div className="absolute inset-[32.86%_20%_31.43%_20%]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.8 17.1429">
          <path d={svgPaths.p242e3100} fill="#E8EBEF" />
        </svg>
      </div>
      <div className="absolute inset-[28.57%_17.14%_67.14%_17.14%]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.5429 2.05714">
          <path d={svgPaths.p2db58900} fill="#C7CED9" />
        </svg>
      </div>
      <div className="absolute inset-[22.86%_18.57%_71.43%_18.57%]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30.1714 2.74286">
          <path d={svgPaths.p34758a00} fill="#E8EBEF" />
        </svg>
      </div>
      <div className="absolute inset-[15.71%_40%_80%_40%]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.6 2.05714">
          <path d={svgPaths.p35f71470} fill="#C7CED9" />
        </svg>
      </div>
      <div className="absolute bg-[#c7ced9] inset-[20%_44.29%_77.14%_44.29%]" />
      <div className="absolute bg-[#c7ced9] inset-[35.71%_80%_58.57%_11.43%] rounded-bl-[2px] rounded-tl-[2px]" />
      <div className="absolute bg-[#c7ced9] inset-[35.71%_11.43%_58.57%_80%] rounded-br-[2px] rounded-tr-[2px]" />
      <div className="absolute bg-[#e8ebef] inset-[75.71%_17.14%_20%_17.14%] rounded-[5px]" />
      <div className="absolute bg-[#c7ced9] inset-[70%_64.29%_24.29%_32.86%]" />
      <div className="absolute bg-[#c7ced9] inset-[70%_48.57%_24.29%_48.57%]" />
      <div className="absolute bg-[#c7ced9] inset-[70%_32.86%_24.29%_64.29%]" />
      <div className="absolute bg-[#c7ced9] inset-[68.57%_28.57%_28.57%_28.57%] rounded-[5px]" />
    </>
  );
}

function IconPan() {
  return (
    <>
      <div className="absolute inset-[10%_41.43%_84.29%_35.71%]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.9714 2.74286">
          <path d={svgPaths.p3678cf00} fill="#C7CED9" />
        </svg>
      </div>
      <div className="absolute inset-[54.29%_68.57%_30%_20%]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.48571 7.54286">
          <path d={svgPaths.p272226f0} fill="#C7CED9" />
        </svg>
      </div>
      <div className="absolute inset-[15.71%_37.14%_48.57%_18.57%]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2571 17.1429">
          <path d={svgPaths.p3aa16680} fill="#E8EBEF" />
        </svg>
      </div>
      <div className="absolute inset-[25.71%_22.86%_18.57%_62.86%]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.85714 26.7429">
          <path d={svgPaths.p18b4fc00} fill="#E8EBEF" />
        </svg>
      </div>
      <div className="absolute inset-[78.57%_15.71%_15.71%_15.71%]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32.9143 2.74286">
          <path d={svgPaths.p4be5a80} fill="#E8EBEF" />
        </svg>
      </div>
    </>
  );
}

function IconClock() {
  return (
    <>
      <div className="absolute bg-[#c7ced9] inset-[12.86%_28.57%] rounded-[4px]" />
      <div className="absolute inset-[18.57%]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30.1714 30.1714">
          <circle cx="15.0857" cy="15.0857" fill="#E8EBEF" r="15.0857" />
        </svg>
      </div>
      <div className="absolute flex inset-[38.93%_32.89%_48.93%_50.21%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="flex-none h-[hypot(-87.8391cqw,70.6546cqh)] rotate-60 w-[hypot(12.1609cqw,29.3454cqh)]">
          <div className="relative size-full">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.97317 8.22857">
              <path d={svgPaths.p28de4280} fill="#9DA9BD" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute inset-[27.14%_48.57%_51.43%_48.57%]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.37143 10.2857">
          <path d={svgPaths.p16ed6d00} fill="#9DA9BD" />
        </svg>
      </div>
      <div className="absolute inset-[45.71%]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.11429 4.11429">
          <circle cx="2.05714" cy="2.05714" fill="#C7CED9" r="2.05714" />
        </svg>
      </div>
    </>
  );
}

function IconUnhealthyFood() {
  return (
    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="2 5 66 60" xmlns="http://www.w3.org/2000/svg">
      <path d="M53.9546 16.2104C51.6509 14.3062 48.6951 13.2576 45.6333 13.2576C42.0944 13.2576 38.6677 14.669 36.235 17.1258C35.7967 17.5682 35.3867 18.0432 35.004 18.557C32.024 14.5945 27.0559 12.5582 22.1225 13.4558C18.0383 14.1971 14.8298 16.4442 12.5827 20.1278C9.41814 25.3255 9.16019 30.3365 11.8172 35.0268C13.2401 37.5412 15.0856 39.9864 17.4532 42.4998C21.7953 47.1177 26.9375 51.5028 33.644 56.301C34.0698 56.6019 34.5269 56.7539 35.0019 56.7539C35.737 56.7539 36.235 56.3827 36.4804 56.1993C42.4383 51.9473 47.3246 47.8517 51.4203 43.6763C53.7386 41.315 56.3684 38.4115 58.2915 34.7898C59.1146 33.239 60.0551 31.1544 59.9975 28.7731C59.8748 23.6488 57.8416 19.4221 53.9546 16.2104Z" fill="#E8EBEF" />
      <path d="M50.0449 23.1172L53.2845 26.3568L42.6456 36.9956L39.4061 33.756L50.0449 23.1172Z" fill="#9DA9BD" />
      <path d="M53.2852 33.7578L50.0456 36.9974L39.4067 26.3585L42.6463 23.119L53.2852 33.7578Z" fill="#C7CED9" />
    </svg>
  );
}

function IconAverageDay() {
  return (
    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="2 5 66 60" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.5 56H51.5C55.366 56 58.5 52.866 58.5 49V46V28V25C58.5 21.134 55.366 18 51.5 18H49H21.058H17.5C13.634 18 10.5 21.134 10.5 25V49C10.5 52.866 13.634 56 17.5 56Z" fill="#E8EBEF" />
      <path fillRule="evenodd" clipRule="evenodd" d="M60.5 44C60.5 45.1046 59.6046 46 58.5 46H47C43.6863 46 41 43.3137 41 40V34C41 30.6863 43.6863 28 47 28H58.5C59.6046 28 60.5 28.8954 60.5 30V44ZM49.5 40C51.1569 40 52.5 38.6569 52.5 37C52.5 35.3431 51.1569 34 49.5 34C47.8431 34 46.5 35.3431 46.5 37C46.5 38.6569 47.8431 40 49.5 40Z" fill="#C7CED9" />
      <path fillRule="evenodd" clipRule="evenodd" d="M49.5 40C51.1569 40 52.5 38.6569 52.5 37C52.5 35.3431 51.1569 34 49.5 34C47.8431 34 46.5 35.3431 46.5 37C46.5 38.6569 47.8431 40 49.5 40Z" fill="#E8EBEF" />
      <path d="M22.0576 17.9978H51.9996C50.5606 14.388 46.7063 12.3647 42.9179 13.2305L22.0576 17.9978Z" fill="#C7CED9" />
    </svg>
  );
}

function IconMealLogo() {
  return (
    <>
      <div className="absolute inset-[11.43%]"><svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37.0286 37.0286"><circle cx="18.5143" cy="18.5143" fill="#BB7AF4" r="18.5143" /></svg></div>
      <div className="absolute inset-[21.43%]"><svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.4286 27.4286"><circle cx="13.7143" cy="13.7143" fill="white" r="13.7143" /></svg></div>
      <div className="absolute inset-[11.43%]"><svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37.0293 37.0293"><path d={svgPaths.p965d100} fill="#9A38EF" /></svg></div>
      <div className="absolute inset-[35.87%_32.35%_37.6%_37.14%]"><svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6449 12.7347"><path d={svgPaths.p128d3980} fill="#9A38EF" /></svg></div>
    </>
  );
}

function IconScooter() {
  return (
    <>
      <div className="absolute bg-[#d1a3f8] inset-[34.29%_51.43%_58.57%_21.43%] rounded-[3px]" />
      <div className="absolute inset-[30.2%_18%_17.14%_8.57%]"><div className="absolute inset-[0_0_18.99%_0]"><svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35.2476 20.4752"><path d={svgPaths.p2ed4ca00} fill="white" /></svg></div></div>
      <div className="absolute inset-[20%_18.18%_69.8%_57.69%]"><svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.5826 4.89624"><path d={svgPaths.p3433a240} fill="#D1A3F8" /></svg></div>
      <div className="absolute inset-[60%_10.26%_27.14%_68.55%]"><svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.1697 6.17143"><path d={svgPaths.p15395040} fill="#D1A3F8" /></svg></div>
      <div className="absolute inset-[65.89%_8.57%_17.14%_17.14%]"><svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35.6575 8.14329"><path d={svgPaths.p20564330} fill="#9A38EF" /><path d={svgPaths.p2a849380} fill="#9A38EF" /></svg></div>
    </>
  );
}

function IconFruit() {
  return (
    <>
      <div className="absolute inset-[19.15%_33.35%_45.9%_28.35%]"><svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.383 16.7745"><path d={svgPaths.p1f684500} fill="#9A38EF" /></svg></div>
      <div className="absolute inset-[27.17%_53.82%_46.03%_17.58%]"><svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.7295 12.8672"><path d={svgPaths.p10fffc80} fill="white" /></svg></div>
      <div className="absolute inset-[40.04%_68.49%_53.59%_25.14%]"><svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.05691 3.05691"><path clipRule="evenodd" d={svgPaths.p31da0500} fill="#D1A3F8" fillRule="evenodd" /></svg></div>
      <div className="absolute inset-[44.26%_62.31%_48.32%_33.86%]"><svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.8383 3.5617"><path clipRule="evenodd" d={svgPaths.p24212b00} fill="#D1A3F8" fillRule="evenodd" /></svg></div>
      <div className="absolute inset-[34.09%_72.48%_62.08%_20.1%]"><svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.5617 1.8383"><path clipRule="evenodd" d={svgPaths.p2ad9ba00} fill="#D1A3F8" fillRule="evenodd" /></svg></div>
      <div className="absolute inset-[34.04%_18.09%_45.74%_61.7%]"><svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.70213 9.70213"><path d={svgPaths.p24360b80} fill="#BB7AF4" /></svg></div>
      <div className="absolute inset-[23.97%_26.51%_48.79%_50.09%]"><svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.2305 13.0756"><path d={svgPaths.p34921400} fill="white" /></svg></div>
      <div className="absolute inset-[47.87%_15.96%_19.15%_15.96%]"><svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32.6809 15.8298"><path d={svgPaths.p386ab580} fill="#E0C1FA" /></svg></div>
    </>
  );
}

// ==========================================
// 3. СТРУКТУРА ДАННЫХ И КОМПОНЕНТ КАРТОЧКИ
// ==========================================

function TheMealLogoPink() {
  return (
    <h3 className="compare-card-title gap-[12px]">
      <span className="compare-card-title-text text-[#f029a8] whitespace-nowrap">
        Eat with
      </span>

      <span className="compare-card-logo relative shrink-0">
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 61 19"
        >
          <path d={svgPaths.p130b2980} fill="#F029A8" />
          <path d={svgPaths.pcf4baf0} fill="#F029A8" />
          <path d={svgPaths.p9d94770} fill="#F029A8" />
          <path d={svgPaths.p14b8cd00} fill="#F029A8" />
          <path d={svgPaths.p59419f2} fill="#F029A8" />
          <path d={svgPaths.p1d80b580} fill="#F029A8" />
          <path d={svgPaths.pafd2150} fill="#F029A8" />
        </svg>
      </span>
    </h3>
  );
}

type CompareItemData = {
  Icon: React.ComponentType;
  label: string;
  value: string;
};

function CompareItem({ Icon, label, value }: CompareItemData) {
  return (
    <div className="content-stretch flex flex-row sm:flex-col md:flex-col xl:flex-row gap-[12px] p-[4px_0] items-center sm:justify-center md:justify-center relative shrink-0 w-full sm:flex-1 sm:w-auto sm:min-w-0 xl:flex-none xl:w-full sm:text-center md:text-center xl:text-left">
      {/* Обертка автоматически контролирует размеры иконок из цикла */}
      <IconWrapper>
        <Icon />
      </IconWrapper>

      <div className="content-stretch flex flex-[1_0_0] sm:flex-none md:flex-none lg:flex-1 flex-col gap-[4px] sm:items-center md:items-center lg:items-start sm:w-full md:w-full lg:w-auto leading-[1.3] min-w-0 relative text-[#383e48]">
        <p className="font-['Quicksand:Medium',sans-serif] text-[14px] md:text-[16px] w-full">{label}</p>
        <p className="font-['Quicksand:Bold',sans-serif] text-[16px] md:text-[20px] w-full">{value}</p>
      </div>
    </div>
  );
}

const cookAtHomeItems: CompareItemData[] = [
  { Icon: IconCart, label: "Buy groceries", value: "+-15 hours / mo" },
  { Icon: IconStove, label: "Cook for", value: "+-60 hours / mo" },
  { Icon: IconPan, label: "Washing dishes", value: "+-60 hours / mo" },
];

const eatOutItems: CompareItemData[] = [
  { Icon: IconClock, label: "Wasting time going out to eat", value: "50-70 AED for a meal" },
  { Icon: IconUnhealthyFood, label: "Often such food is unhealthy", value: "Take care of your health" },
  { Icon: IconAverageDay, label: "On an average day", value: "+-150 AED" },
];

const theMealItems: CompareItemData[] = [
  { Icon: IconMealLogo, label: "Profitable", value: "AED 37.5D / day" },
  { Icon: IconScooter, label: "Comfortably", value: "Delivered where and when you need it" },
  { Icon: IconFruit, label: "Useful", value: "Quality natural food" },
];

type CardConfig = {
  bg: string;
  title: React.ReactNode;
  subtitle: string;
  subtitleColor: string;
  items: CompareItemData[];
  totalLabel: string;
  totalValue: string;
  totalColor: string;
};

const cards: CardConfig[] = [
  {
    bg: "bg-white",
    title: (
      <h3 className="compare-card-title">
        <span className="compare-card-title-text text-[#383e48]">
          Cook at home
        </span>
      </h3>
    ),
    subtitle: "Spend at least 2 hours a day",
    subtitleColor: "text-[#383e48]",
    items: cookAtHomeItems,
    totalLabel: "Average cost",
    totalValue: "AED 900-1200/mo",
    totalColor: "text-[#383e48]",
  },
  {
    bg: "bg-white",
    title: (
      <h3 className="compare-card-title">
        <span className="compare-card-title-text text-[#383e48]">Eat out</span>
      </h3>
    ),
    subtitle: "Spend a lot of money",
    subtitleColor: "text-[#383e48]",
    items: eatOutItems,
    totalLabel: "Average cost",
    totalValue: "AED 2500-4000/mo",
    totalColor: "text-[#383e48]",
  },
  {
    bg: "bg-[#f0dfff]",
    title: <TheMealLogoPink />,
    subtitle: "Save time and money",
    subtitleColor: "text-[#f029a8]",
    items: theMealItems,
    totalLabel: "Only",
    totalValue: "AED 999/mo",
    totalColor: "text-[#f029a8]",
  },
];

function BenefitsCard({ card }: { card: CardConfig }) {
  return (
    <div className={`${card.bg} flex flex-1 flex-col gap-[32px] items-center py-[32px] md:py-[48px] px-[24px] md:px-[32px] relative rounded-[12px] min-w-0 overflow-hidden w-full`}>
      <div className="flex flex-col gap-[24px] md:gap-[32px] items-center relative shrink-0 w-full">
        <div className="flex flex-col gap-[4px] items-center relative shrink-0 w-full text-center">
          {card.title}
          <p className={`font-['Quicksand:SemiBold',sans-serif] leading-none text-[16px] md:text-[20px] w-full ${card.subtitleColor}`}>{card.subtitle}</p>
        </div>

        {/* ЗДЕСЬ ИДЕТ ЦИКЛ ВЫВОДА ЭЛЕМЕНТОВ С ИКОНКАМИ */}
        <div className="flex flex-col sm:flex-row md:flex-row xl:flex-col gap-[16px] items-start relative shrink-0 w-fit mx-auto sm:w-full sm:mx-0 md:w-full md:mx-0 xl:w-full xl:mx-0">
          {card.items.map((item, i) => (
            <CompareItem key={i} {...item} />
          ))}
        </div>
      </div>

      <div className={`flex flex-col gap-[4px] md:gap-[12px] items-center leading-[1.3] text-center w-full mt-auto ${card.totalColor}`}>
        <p className="font-['Quicksand:Medium',sans-serif] text-[14px] sm:text-[16px] md:text-[20px] w-full">{card.totalLabel}</p>
        <p className="font-['Quicksand:Bold',sans-serif] text-[20px] md:text-[25px] w-full">{card.totalValue}</p>
      </div>
    </div>
  );
}

export default function CompareBenefitsSection() {
  return (
    <div className="bg-[#f3f4f7] relative shrink-0 w-full flex justify-center section-spacing-y section-spacing-x">
      <div className="flex flex-col items-center rounded-[inherit] justify-center size-full maxWidth">
        <div className="content-stretch flex flex-col gap-[32px] md:gap-[48px] lg:gap-[64px] items-center relative size-full">
          <h2 className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Quicksand:Bold',sans-serif] text-[#383e48] text-center h2-title w-full">
            Compare your benefits
          </h2>

          <div className="content-stretch flex flex-col xl:flex-row gap-[16px] md:gap-[24px] lg:gap-[32px] items-stretch relative shrink-0 justify-center w-full">
            {cards.map((card, i) => (
              <BenefitsCard key={i} card={card} />
            ))}
          </div>

          <div className="content-stretch flex flex-col gap-[24px] md:gap-[32px] lg:gap-[40px] items-center relative max-w-[600px] shrink-0 w-full">
            <p className="font-['Quicksand:Bold',sans-serif] leading-[1.5] text-[#383e48] text-[20px] md:text-[25px] lg:text-[32px] text-center w-full">
              Find out how much time and Money you really spend on food
            </p>
            <button className="btn flex items-center justify-center gap-[6px] px-[28px] lg:px-[40px] bg-[#9a38ef] hover:bg-[#8C33D9] transition-all duration-200 shadow-[0_4px_20px_rgba(140,51,217,0.35)] hover:shadow-[0_8px_32px_rgba(140,51,217,0.55)] hover:-translate-y-[2px] relative rounded-[8px] shrink-0 w-full sm:w-auto cursor-pointer font-['Quicksand:Bold',sans-serif] text-[20px] lg:text-[25px] text-center text-white whitespace-nowrap">
              Take the 2-minute test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}