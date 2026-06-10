import { useState } from "react";
import svgPaths from "../../imports/svgPaths";
import imgBreakfast from "../../imports/images/62b020c5d45fcf81b97d6ac960d8933eabac8e76.png";
import imgLunch from "../../imports/images/6b30caceed13b066fc33b8a01a42a6df76ed3861.png";
import imgDinner from "../../imports/images/4e9547eb8191c23d59cdc7e065a7add41ab481be.png";
import imgSoup from "../../imports/images/ac9ccfc091874f2213372b4440fd9dc1c6aa56ed.png";

type Meal = {
  img: string;
  title: string;
  kcal: string;
  g: string;
  type: string;
};

const meals: Record<string, Meal[]> = {
  Mon: [
    {
      img: imgBreakfast,
      title: "Spinach breakfast quiche",
      kcal: "463.8",
      g: "200",
      type: "Breakfast",
    },
    {
      img: imgLunch,
      title: "Grilled shrimps with lemon, basmati rice, peas and carrots",
      kcal: "360",
      g: "250",
      type: "Lunch",
    },
    {
      img: imgDinner,
      title: "Grandma's meatballs with roasted potato and veggies",
      kcal: "572",
      g: "300",
      type: "Dinner",
    },
    {
      img: imgSoup,
      title: "Chicken soup",
      kcal: "88.8",
      g: "270",
      type: "Soup",
    },
  ],
  Tue: [
    {
      img: imgBreakfast,
      title: "French omelette with seasame beetroot and grilled tomatoes",
      kcal: "439.4",
      g: "180",
      type: "Breakfast",
    },
    {
      img: imgLunch,
      title: "Beef shawarma bowl with veggie mix and farro",
      kcal: "579.9",
      g: "300",
      type: "Lunch",
    },
    {
      img: imgDinner,
      title: "Bolognese pasta",
      kcal: "443",
      g: "250",
      type: "Dinner",
    },
    {
      img: imgSoup,
      title: "Tomato soup",
      kcal: "102",
      g: "270",
      type: "Soup",
    },
  ],
  Wed: [
    {
      img: imgBreakfast,
      title: "Egg paratha roll",
      kcal: "749.4",
      g: "250",
      type: "Breakfast",
    },
    {
      img: imgLunch,
      title: "Homemade beef cutlet with roasted potato and veggie mix",
      kcal: "610",
      g: "240",
      type: "Lunch",
    },
    {
      img: imgDinner,
      title: "Fish cutlets with grilled marrow, tartar sauce and couscous",
      kcal: "534.6",
      g: "250",
      type: "Dinner",
    },
    {
      img: imgSoup,
      title: "Mushroom soup",
      kcal: "136",
      g: "270",
      type: "Soup",
    },
  ],
  Thu: [
    {
      img: imgBreakfast,
      title: "Spicy chicken wings with roasted potato and dip",
      kcal: "792",
      g: "300",
      type: "Breakfast",
    },
    {
      img: imgLunch,
      title: "Orange chicken with fried rice",
      kcal: "711.3",
      g: "250",
      type: "Lunch",
    },
    {
      img: imgDinner,
      title: "Meat and rice stuffed capsicum with roasted potato and vegetables",
      kcal: "410",
      g: "250",
      type: "Dinner",
    },
    {
      img: imgSoup,
      title: "Broccoli soup",
      kcal: "110",
      g: "270",
      type: "Soup",
    },
  ],
  Fri: [
    {
      img: imgBreakfast,
      title: "Chicken and zucchini pancakes with yogurt",
      kcal: "332",
      g: "250",
      type: "Breakfast",
    },
    {
      img: imgLunch,
      title: "Grilled shrimps with potato wedges and broccoli",
      kcal: "463",
      g: "220",
      type: "Lunch",
    },
    {
      img: imgDinner,
      title: "Grilled beef kofta with aromatic brown onion pilaf and veggies",
      kcal: "692",
      g: "250",
      type: "Dinner",
    },
    {
      img: imgSoup,
      title: "Minestrone soup",
      kcal: "150",
      g: "270",
      type: "Soup",
    },
  ],
  Sat: [
    {
      img: imgBreakfast,
      title: "Szechuan style Kung Pao chicken with asian noodles",
      kcal: "660.2",
      g: "250",
      type: "Breakfast",
    },
    {
      img: imgLunch,
      title: "Chicken Stroganoff with baked potato wedges and sweet corn",
      kcal: "407",
      g: "250",
      type: "Lunch",
    },
    {
      img: imgDinner,
      title: "Chicken cutlet with mushroom buckwheat and veggie mix",
      kcal: "320",
      g: "250",
      type: "Dinner",
    },
    {
      img: imgSoup,
      title: "Pumpkin soup",
      kcal: "109",
      g: "270",
      type: "Soup",
    },
  ],
  Sun: [
    {
      img: imgBreakfast,
      title: "Evergreen fritatta with toast",
      kcal: "489",
      g: "220",
      type: "Breakfast",
    },
    {
      img: imgLunch,
      title: "Baked lemon white fish with rice and vegetables",
      kcal: "432.5",
      g: "250",
      type: "Lunch",
    },
    {
      img: imgDinner,
      title: "Chicken biryani",
      kcal: "526.1",
      g: "250",
      type: "Dinner",
    },
    {
      img: imgSoup,
      title: "Lentil soup",
      kcal: "187",
      g: "270",
      type: "Soup",
    },
  ],
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const allImgs = [imgBreakfast, imgLunch, imgDinner, imgSoup];

function rotateImgs(dayIndex: number) {
  return [0, 1, 2, 3].map((i) => allImgs[(i + dayIndex) % 4]);
}

export default function WhatYouEatEveryDaySection({
  onOrderClick,
}: {
  onOrderClick?: () => void;
}) {
  const [activeDay, setActiveDay] = useState("Mon");
  const dayIndex = days.indexOf(activeDay);
  const dayImgs = rotateImgs(dayIndex);
  const currentMeals = meals[activeDay].map((meal, i) => ({
    ...meal,
    img: dayImgs[i],
  }));

  return (
    <div className="bg-white relative shrink-0 justify-center w-full flex section-spacing-y section-spacing-x">
      <div className="content-stretch flex flex-col gap-[32px] md:gap-[48px] lg:gap-[64px] items-center relative size-full maxWidth">
        <h2 className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-quicksand-bold not-italic relative shrink-0 text-[#383e48] h2-title text-center w-full">
          What you&apos;ll eat every day
        </h2>

        <div className="flex flex-col gap-[24px] items-center relative shrink-0 w-full">
          <div className="content-stretch flex items-start relative shrink-0 w-full max-w-[768px]">
            {days.map((day) => {
              const isActive = day === activeDay;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setActiveDay(day)}
                  className={`flex-[1_0_0] h-[40px] md:h-[48px] min-w-px relative cursor-pointer rounded-[8px] transition-colors duration-150 ${
                    isActive ? "bg-[#f5ebfd]" : "hover:bg-[#f5ebfd]/50"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center size-full">
                    <p
                      className={`[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-quicksand-semibold leading-[1.3] not-italic text-[14px] md:text-[16px] text-center w-full transition-colors duration-150 ${
                        isActive ? "text-[#9a38ef]" : "text-[#383e48]"
                      } font-normal`}
                    >
                      {day}
                    </p>
                  </div>

                  {isActive && (
                    <div
                      aria-hidden="true"
                      className="absolute border border-[#d1a3f8] border-solid inset-0 pointer-events-none rounded-[8px]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="gap-x-[16px] sm:gap-x-[20px] md:gap-x-[24px] gap-y-[20px] xs:gap-y-[28px] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 relative w-full">
            {currentMeals.map((meal, i) => (
              <div
                key={i}
                className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0"
              >
                <div className="aspect-[147/106] relative shrink-0 w-full overflow-hidden rounded-[8px]">
                  <img
                    alt={meal.title}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    src={meal.img}
                  />
                </div>

                <div className="relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col gap-[8px] items-start px-[3px] relative w-full">
                    <div className="content-stretch flex gap-[8px] items-baseline relative shrink-0 w-full">
                      {meal.kcal && (
                        <p className="font-quicksand-medium leading-normal not-italic relative shrink-0 text-[#8594ac] text-[12px] sm:text-[14px] whitespace-nowrap">
                          {meal.kcal} kcal • {meal.g} g
                        </p>
                      )}

                      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-quicksand-medium leading-normal not-italic relative shrink-0 text-[#8594ac] text-[12px] sm:text-[14px] whitespace-nowrap">
                        {meal.type}
                      </p>
                    </div>

                    <p className="font-quicksand-bold leading-[1.4] not-italic relative shrink-0 text-[#383e48] w-full text-[16px] sm:text-[20px]">
                      {meal.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="gap-[24px] flex flex-col w-full">
          <div className="content-stretch flex flex-col gap-[18px] items-center relative shrink-0 w-full">
            <p className="[word-break:break-word] font-quicksand-bold leading-[1.5] not-italic relative shrink-0 text-[#383e48] text-[20px] text-center w-full">
              ⭐️⭐️⭐️⭐️⭐
              <br />
              <br />
              Trusted by 5000+ customers in UAE
            </p>

            <button
              type="button"
              onClick={onOrderClick}
              className="btn flex flex-col items-center justify-center gap-[12px] px-[40px] lg:px-[56px] py-[12px] lg:py-[16px] bg-[#9a38ef] hover:bg-[#8C33D9] transition-all duration-200 shadow-[0_4px_20px_rgba(140,51,217,0.35)] hover:shadow-[0_8px_32px_rgba(140,51,217,0.55)] hover:-translate-y-[2px] relative rounded-[8px] shrink-0 w-full sm:w-auto cursor-pointer [word-break:break-word] font-quicksand-bold leading-none not-italic text-center text-white"
            >
              <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 text-[20px] lg:text-[25px] w-full">
                Choose My Plan
              </span>

              <span className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] relative shrink-0 text-[14px] opacity-80 lg:text-[16px] w-full">
                from 39.9 AED/day
              </span>
            </button>
          </div>

          <div className="content-stretch flex flex-col md:flex-row gap-[24px] md:gap-[32px] items-start relative shrink-0 w-full">
            {[
              "The menu doesn't repeat for several weeks",
              "Choose number of meals, calories count, plan length and exclude ingredients.",
              "Free delivery and pause any time",
            ].map((text, i) => (
              <div
                key={i}
                className="content-stretch flex gap-[12px] flex-1 items-center md:items-start relative shrink-0 w-full"
              >
                <div className="py-[3px]">
                  <div className="bg-[#7dd336] relative rounded-[9999px] shrink-0 size-[20px]">
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
                              d={svgPaths.p2ea7ce0}
                              stroke="var(--stroke-0, white)"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.6"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="[word-break:break-word] flex-[1_0_0] font-quicksand-medium leading-[1.3] min-w-px not-italic relative text-[#383e48] text-[20px]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
