import girlImg from "../../../Girl.png";
import meal01 from "../../imports/imgMeal_01.png";
import meal02 from "../../imports/imgMeal_02.png";
import meal03 from "../../imports/imgMeal_03.png";
import meal04 from "../../imports/imgMeal_04.png";
import meal05 from "../../imports/imgMeal_05.png";

export default function TotalOfferBlock({
  onOrderClick,
}: {
  onOrderClick?: () => void;
}) {
  return (
    <div className="bg-[#fcde02] overflow-clip min-h-[400px] flex relative shrink-0 w-full items-center justify-center section-spacing-y section-spacing-x overflow-hidden">
      <div className="relative z-[10] flex flex-col items-center rounded-[inherit] maxWidth size-full">
        <div className="content-stretch flex flex-col gap-[180px] md:gap-[48px] lg:gap-[64px] md:items-start items-center md:pr-[160px] relative size-full">
          {/* Offer Container */}
          <div className="[word-break:break-word] content-stretch flex flex-col font-quicksand-bold gap-[24px] md:items-start items-center not-italic relative shrink-0 w-full">
            <div className="min-w-full relative shrink-0 text-[#383e48] text-center md:text-left w-[min-content]">
              <h2 className="h2-title mb-0">
                Order&nbsp;a month&apos;s worth of&nbsp;food{" "}
                <span className="text-[#9A38EF]">for&nbsp;AED&nbsp;999</span>
              </h2>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={onOrderClick}
            className="btn flex items-center justify-center gap-[6px] px-[28px] lg:px-[40px] bg-[#9a38ef] hover:bg-[#8C33D9] transition-all duration-200 shadow-[0_4px_20px_rgba(140,51,217,0.35)] hover:shadow-[0_8px_32px_rgba(140,51,217,0.55)] hover:-translate-y-[2px] relative rounded-[8px] shrink-0 w-full sm:w-auto cursor-pointer [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-quicksand-bold leading-none not-italic text-[20px] lg:text-[25px] text-center text-white whitespace-nowrap"
          >
            Make an Order
          </button>
        </div>
      </div>

      {/* Visuals Container */}
      <div className="absolute z-[4] bottom-0 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[20px] w-[360px] md:w-[420px] lg:w-[560px] h-[320px] md:h-[380px] lg:h-[520px] pointer-events-none select-none">
        {/* Girl */}
        <img
          src={girlImg}
          alt=""
          className="absolute z-[4] bottom-0 left-1/2 -translate-x-1/2 h-[280px] md:h-[340px] lg:h-[480px] max-h-full w-auto object-contain object-bottom"
        />

        {/* Meal images around girl */}
        <img
          src={meal01}
          alt=""
          className="absolute z-[8] blur-[2px] bottom-[170px] md:bottom-[55%] right-1/2 translate-x-[256px] w-[144px] md:w-[120px] lg:w-[150px] object-cover"
          style={{ rotate: "-40deg" }}
        />

        <img
          src={meal02}
          alt=""
          className="absolute z-[5] blur-[3px] bottom-[-36px] left-1/2 -translate-x-[260px] w-[200px] md:w-[120px] lg:w-[150px] object-cover"
          style={{ rotate: "40deg" }}
        />

        <img
          src={meal03}
          alt=""
          className="absolute z-[1] top-[-20px] right-[4px] w-[84px] md:w-[128px] lg:w-[180px] object-cover"
          style={{ rotate: "-80deg" }}
        />

        <img
          src={meal04}
          alt=""
          className="absolute z-[3] bottom-[116px] left-1/2 -translate-x-[230px] w-[76px] md:w-[120px] lg:w-[150px] object-cover"
          style={{ rotate: "-135deg" }}
        />

        <img
          src={meal05}
          alt=""
          className="absolute z-[2] bottom-[-20px] right-1/2 translate-x-[206px] w-[126px] md:w-[120px] lg:w-[150px] -rotate-45 object-cover"
        />
      </div>
    </div>
  );
}