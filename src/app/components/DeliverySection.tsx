import mapImg from "../../imports/map.jpg";

export default function DeliverySection({
  onOrderClick,
}: {
  onOrderClick?: () => void;
}) {
  return (
    <div className="bg-[#f5ebfd] relative shrink-0 section-spacing-y section-spacing-x justify-center flex w-full overflow-hidden">
      <img
        src={mapImg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-60 pointer-events-none select-none"
      />

      <div className="flex flex-col items-center rounded-[inherit] size-full maxWidth relative">
        <div className="content-stretch flex flex-col gap-[40px] items-center md:items-start relative size-full">
          <div className="w-full flex flex-col md:flex-row justify-between gap-[24px] md:gap-[48px] lg:gap-[160px]">
            {/* Title */}
            <div className="content-stretch flex flex-col gap-[32px] md:gap-[48px] lg:gap-[64px] max-w-[800px] items-start relative">
              <h2 className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Quicksand:Bold',sans-serif] not-italic relative shrink-0 text-[#383e48] h2-title text-center md:text-left">
                Free delivery across the UAE
              </h2>

              {/* Cities list */}
              <div className="content-start flex flex-wrap gap-[8px] sm:gap-[12px] items-start justify-center md:justify-start relative shrink-0">
                {[
                  "Dubai",
                  "Abu Dhabi",
                  "Sharjah",
                  "Quwain",
                  "Ras Al Khaimah",
                  "Fujairah",
                  "Umm Al",
                  "Al Ain",
                  "Ajman",
                  "Al Ghadee",
                ].map((city) => (
                  <div
                    key={city}
                    className="bg-[#E0C1FA]/75 border-[#D1A3F8] border-1 content-stretch flex items-center px-[12px] sm:px-[12px] lg:px-[16px] py-[6px] sm:py-[16px] lg:py-[16px] relative rounded-[9999px] shrink-0"
                  >
                    <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Quicksand:SemiBold',sans-serif] leading-[1.3] not-italic relative shrink-0 text-[16px] sm:text-[20px] xl:text-[25px] text-center text-[#411864] whitespace-nowrap">
                      {city}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery benefits */}
            <div className="content-stretch flex flex-col sm:flex-row md:flex-col gap-[12px] md:gap-[16px] items-center sm:items-end relative shrink-0 w-full md:w-auto">
              {(
                [
                  {
                    label: "Any time",
                    bg: "#f029a8",
                    iconBg: "#f354b9",
                    textColor: "text-white",
                    stroke: "white",
                  },
                  {
                    label: "Twice a week",
                    bg: "#fcde02",
                    iconBg: "#fcec71",
                    textColor: "text-[#383e48]",
                    stroke: "#383E48",
                  },
                  {
                    label: "Any Place",
                    bg: "#383e48",
                    iconBg: "#49515f",
                    textColor: "text-white",
                    stroke: "white",
                  },
                ] as const
              ).map((item) => (
                <div
                  key={item.label}
                  style={{ backgroundColor: item.bg }}
                  className="flex-1 md:flex-none content-stretch flex gap-[4px] md:gap-[6px] items-center justify-center px-[16px] md:px-[20px] py-[8px] md:py-[11px] relative rounded-[80px]"
                >
                  <div
                    style={{ backgroundColor: item.iconBg }}
                    className="content-stretch flex items-center p-[5px] md:p-[8px] relative rounded-[999px] shrink-0"
                  >
                    <div className="overflow-clip relative shrink-0 size-[20px] md:size-[24px]">
                      <div className="absolute bottom-[29.17%] left-[16.67%] right-[16.67%] top-1/4">
                        <div className="absolute inset-[-11.36%_-7.81%]">
                          <svg
                            className="block size-full"
                            fill="none"
                            preserveAspectRatio="none"
                            viewBox="0 0 18.5 13.5"
                          >
                            <path
                              d="M17.25 1.25L6.25 12.25L1.25 7.25"
                              stroke={item.stroke}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2.5"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p
                    className={`[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Quicksand:Bold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[16px] text-center uppercase whitespace-nowrap ${item.textColor}`}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={onOrderClick}
            className="btn flex items-center justify-center gap-[6px] px-[28px] lg:px-[40px] bg-[#9a38ef] hover:bg-[#8C33D9] transition-all duration-200 shadow-[0_4px_20px_rgba(140,51,217,0.35)] hover:shadow-[0_8px_32px_rgba(140,51,217,0.55)] hover:-translate-y-[2px] relative rounded-[8px] shrink-0 w-full sm:w-auto cursor-pointer [text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-['Quicksand:Bold',sans-serif] leading-none not-italic text-[20px] lg:text-[25px] text-center text-white whitespace-nowrap"
          >
            Make on Order
          </button>
        </div>
      </div>
    </div>
  );
}