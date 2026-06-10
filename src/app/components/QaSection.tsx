import { useState } from "react";
import svgPaths from "../../imports/svgPaths";
import { TabPill } from "./common/TabPill";

type Bullet = {
  title: string;
  text: string;
};

type QAItem = {
  question: string;
  bullets: Bullet[];
};

const qaData: Record<string, QAItem[]> = {
  "About our Meal Plans": [
    {
      question: "What is TheMeal?",
      bullets: [
        {
          title: "Ready-to-eat meals:",
          text: "We deliver fresh, ready-to-eat meals across the UAE — Dubai, Abu Dhabi, Sharjah, Ajman, Al Ain, RAK, UAQ, Fujairah, and Al Ghadeer.",
        },
        {
          title: "No cooking needed:",
          text: "No shopping, no cooking, no washing up. Just open and eat.",
        },
      ],
    },
    {
      question: "What does the meal plan include?",
      bullets: [
        {
          title: "Twice-weekly deliveries:",
          text: "We deliver every Wednesday and Sunday at your preferred time slot. Each box covers the next 2–4 days.",
        },
        {
          title: "Flexible meal counts:",
          text: "Choose 2, 3, or 4 meals per day depending on your goals and appetite.",
        },
      ],
    },
    {
      question: "Do you offer a trial?",
      bullets: [
        {
          title: "Yes!",
          text: "We offer a one-week plan with 2 deliveries covering 5–7 days, so you can sample our meals before committing to a monthly plan.",
        },
      ],
    },
    {
      question: "Can I customize my order?",
      bullets: [
        {
          title: "Fixed but varied menu:",
          text: "The menu is curated and fixed, but meals repeat no more than once every two weeks so you always have variety.",
        },
      ],
    },
    {
      question: "How do I pause my plan?",
      bullets: [
        {
          title: "Contact your manager:",
          text: "Reach out to your account manager at least 3 days before the next delivery to pause.",
        },
        {
          title: "Pause duration:",
          text: "Free pause duration varies by plan. Paid options are available for longer breaks.",
        },
      ],
    },
    {
      question: "What calorie options are available?",
      bullets: [
        { title: "2 meals/day:", text: "~800 kcal per day." },
        { title: "3 meals/day:", text: "~1,300 kcal per day." },
        { title: "4 meals/day:", text: "~1,450 kcal per day." },
      ],
    },
  ],

  "Products and Storage": [
    {
      question: "How should I store the meals?",
      bullets: [
        {
          title: "Refrigerate:",
          text: "Keep meals at 2–4°C. Twice-weekly deliveries ensure you always have a fresh supply.",
        },
      ],
    },
    {
      question: "Are the meals fresh or frozen?",
      bullets: [
        {
          title: "Always fresh:",
          text: "Meals are prepared the night before delivery and chilled — never frozen.",
        },
      ],
    },
    {
      question: "How is freshness maintained?",
      bullets: [
        {
          title: "Quality ingredients:",
          text: "We use quality ingredients with food-safe sealed packaging and a full cold chain from our kitchen to your door.",
        },
        {
          title: "Shelf life:",
          text: "Meals stay fresh for up to 5 days thanks to our packaging and food-grade preservative (potassium sorbate E202) — internationally approved and safe.",
        },
      ],
    },
    {
      question: "Can I see the full menu?",
      bullets: [
        {
          title: "Menu Sample section:",
          text: "Yes — check the Menu Sample section on our website. The menu updates regularly to keep things exciting.",
        },
      ],
    },
  ],

  "Payment and Delivery": [
    {
      question: "When do you deliver?",
      bullets: [
        {
          title: "Wednesdays and Sundays:",
          text: "We deliver twice a week in 2–3 hour slots between 03:00 and 22:00. You choose your preferred window.",
        },
      ],
    },
    {
      question: "How does the delivery work?",
      bullets: [
        {
          title: "Advance notice:",
          text: "Your courier will text you 15–30 minutes before arrival.",
        },
        {
          title: "Leave at door:",
          text: "Enable the 'Leave at the door' option and you'll get an SMS notification once your order is dropped off.",
        },
      ],
    },
    {
      question: "Where do you deliver?",
      bullets: [
        {
          title: "All UAE emirates:",
          text: "Dubai, Abu Dhabi, Sharjah, Ajman, Al Ain, RAK, UAQ, Fujairah, and Al Ghadeer. We do not currently deliver to other areas.",
        },
      ],
    },
    {
      question: "Is payment secure?",
      bullets: [
        {
          title: "Yes, fully secure:",
          text: "TheMeal is a licensed UAE company. Cards are processed securely online — we never see your card details.",
        },
        {
          title: "Installments:",
          text: "Interest-free installment options are available via Tabby.",
        },
      ],
    },
  ],
};

export default function QaSection() {
  const tabs = Object.keys(qaData);

  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items = qaData[activeTab];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setOpenIndex(0);
  };

  const handleQuestionToggle = (index: number) => {
    setOpenIndex((currentIndex) => (currentIndex === index ? null : index));
  };

  return (
    <section className="relative w-full bg-white section-spacing-y section-spacing-x">
      <div className="mx-auto flex w-full maxWidth flex-col items-center gap-[32px] md:gap-[48px] lg:gap-[64px]">
        <h2 className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] w-full text-left font-quicksand-bold h2-title text-[#383e48]">
          Any questions?
        </h2>

        <div className="flex w-full flex-col gap-[24px] lg:flex-row lg:items-start lg:gap-[32px] xl:gap-[48px]">
          <div className="order-2 flex min-w-0 w-full flex-1 flex-col gap-[8px] sm:gap-[12px] lg:order-1">
            {items.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={item.question}
                  className="group w-full rounded-[16px] border border-[#D9DEE5] bg-white transition-colors duration-200 hover:border-[#BB7AF4]"
                >
                  <button
                    type="button"
                    onClick={() => handleQuestionToggle(index)}
                    className="flex w-full items-center justify-between gap-[16px] px-[20px] py-[12px] text-left md:pl-[24px] md:pr-[16px]"
                    aria-expanded={isOpen}
                  >
                    <span className="[word-break:break-word] py-[6px] font-quicksand-bold text-[20px] leading-[1.4] text-[#383e48] transition-colors duration-200 group-hover:text-[#9A38EF] sm:text-[25px]">
                      {item.question}
                    </span>

                    <span
                      className={[
                        "flex size-[24px] flex-none items-center justify-center transition-transform duration-200",
                        isOpen ? "rotate-45" : "",
                      ].join(" ")}
                    >
                      <svg
                        className="block size-full"
                        fill="none"
                        viewBox="0 0 24.2132 24.2132"
                        aria-hidden="true"
                      >
                        <path
                          clipRule="evenodd"
                          fillRule="evenodd"
                          d={svgPaths.pe196b40}
                          fill={isOpen ? "#9A38EF" : undefined}
                          className={
                            isOpen
                              ? ""
                              : "fill-[#383E48] transition-colors duration-200 group-hover:fill-[#9A38EF]"
                          }
                        />
                      </svg>
                    </span>
                  </button>

                  {isOpen && (
                    <div className="flex w-full flex-col gap-[16px] px-[20px] pb-[20px] md:px-[24px]">
                      {item.bullets.map((bullet) => (
                        <div
                          key={`${item.question}-${bullet.title}`}
                          className="flex w-full items-start gap-[12px]"
                        >
                          <span className="mt-[11px] size-[6px] flex-none rounded-full bg-[#383E48]" />

                          <div className="[word-break:break-word] flex min-w-0 flex-1 flex-col gap-[2px] text-[#383e48]">
                            <p className="font-quicksand-semibold text-[16px] leading-[1.4]">
                              {bullet.title}
                            </p>

                            <p className="font-quicksand-medium text-[16px] leading-[1.4]">
                              {bullet.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div
            className="order-1 flex min-w-0 w-full flex-col gap-[12px] lg:order-2 lg:w-1/4 lg:shrink-0"
            role="tablist"
            aria-label="FAQ categories"
          >
            {tabs.map((tab) => {
              const isActive = tab === activeTab;

              return (
                <TabPill
                  key={tab}
                  label={tab}
                  selected={isActive}
                  onClick={() => handleTabChange(tab)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}