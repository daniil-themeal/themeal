import svgPaths from "../../imports/svgPaths";
import imgFaceWithSpiralEyes from "../../imports/images/f44eac7acc54c09b2973055b483234453c76f44f.avif";
import imgMoneyWithWings from "../../imports/images/0ba3b99be375b46bbb0dfce60cd5890b2cb684f5.avif";
import imgExplodingHead from "../../imports/images/61c68d33a27c961fcc1a0414a5f6f323583b5a35.avif";
import imgFrenchFries from "../../imports/images/9be908c8de3339ddbb0a8fe6c16f94e1308bc244.avif";
import imgFaceSavoringFood from "../../imports/images/4274ecd698ec08b6bb332c0ecb1e53cd0177cf23.avif";
import img from "../../imports/images/a0900e6a3960ec4a9b013952c232a3d756dbb112.avif";
import imgFridge from "../../imports/images/d4a6033f5e95c3e49ed9a2e732003fedd10c3dcb.avif";
import imgPersonInLotusPosition from "../../imports/images/adbac9d5314d1222a2a24bd37de5382dea4650ec.avif";

function CardTitle() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] sm:gap-[12px] items-center relative shrink-0 w-full mx-[0px] mt-[0px] mb-[16px]">
      <div className="relative shrink-0 size-[48px] sm:size-[56px] md:size-[72px]">
        <div className="absolute inset-1/4">
          <div className="absolute inset-[-8.33%]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 28 28"
            >
              <path
                d="M26 2L2 26M2 2L26 26"
                stroke="var(--stroke-0, #EC221F)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
              />
            </svg>
          </div>
        </div>
      </div>

      <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] [word-break:break-word] font-quicksand-bold leading-[1.34] min-w-full not-italic relative shrink-0 text-[#ec221f] text-[32px] md:text-[32px] lg:text-[40px] text-center w-[min-content]">
        Tired of wasting time, money and energy on food?
      </p>
    </div>
  );
}

function TheMealLogo() {
  return (
    <div className="compare-section-title-logo">
      <svg
        className="absolute bottom-0 block inset-0 size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 94 30"
      >
        <path d="M49.3591 21.0871C49.7783 22.2576 50.3678 23.1093 51.1276 23.6425C51.9529 24.2537 52.8826 24.5593 53.9176 24.5593C55.0705 24.5593 56.184 24.2927 57.2583 23.7595L58.9478 22.9207C59.2231 22.7776 59.5963 22.6867 60.068 22.6477C60.4874 22.6477 60.8931 22.7581 61.2864 22.9792C61.6921 23.2002 62.0133 23.4994 62.2493 23.8767C62.4852 24.2537 62.6029 24.6438 62.6029 25.0469C62.6029 26.1394 61.8104 27.1341 60.225 28.0314C58.2995 29.1237 56.0858 29.67 53.5836 29.67C51.9463 29.67 50.4007 29.3513 48.9465 28.7142C47.4924 28.077 46.2479 27.1471 45.2131 25.9247C43.7459 24.1431 43.0125 21.8479 43.0125 19.039C43.0125 17.1664 43.4579 15.4303 44.3485 13.8308C45.2394 12.2313 46.4642 10.9634 48.023 10.027C49.5951 9.09077 51.3176 8.62261 53.1907 8.62261C54.9853 8.62261 56.6295 9.06472 58.1229 9.94903C59.6294 10.8333 60.8083 12.0297 61.6597 13.5382C62.5108 15.0467 62.9368 16.6722 62.9368 18.4148C62.9368 19.3381 62.7402 20.0143 62.3473 20.4434C61.9544 20.8726 61.3061 21.0871 60.4022 21.0871H49.3591ZM57.14 17.0884C56.5112 14.6436 55.1685 13.4211 53.1119 13.4211C51.2914 13.4211 49.9749 14.6436 49.1626 17.0884H57.14Z" fill="#7DD336" />
        <path d="M18.0535 13.5376L15.951 26.7628C15.7807 27.6732 15.3812 28.3819 14.7524 28.889C14.1367 29.3832 13.3442 29.6303 12.3748 29.6303C11.5364 29.6303 10.9011 29.2857 10.4688 28.5963C10.0496 27.9072 9.83998 26.9775 9.83998 25.807L13.1411 5.735C13.3376 4.62963 13.7371 3.81036 14.3397 3.27718C15.1388 2.60098 16.0558 2.26286 17.0907 2.26286C18.0339 2.26286 18.8722 2.48393 19.6058 2.92607C20.3394 3.35521 20.8372 3.99893 21.0992 4.85719L25.6185 18.5701L29.7647 5.42292C30.0658 4.5256 30.5702 3.77785 31.2776 3.17965C31.9981 2.56845 32.817 2.26286 33.7339 2.26286C34.7426 2.26286 35.6465 2.55546 36.4455 3.14064C37.2576 3.71283 37.7357 4.47357 37.8798 5.42292L41.4757 25.7095C41.4757 28.3234 40.6438 29.6303 38.9802 29.6303C37.5393 29.6303 36.5568 29.2726 36.0328 28.5573C35.6529 28.0242 35.3845 27.1985 35.2271 26.0802L33.1443 13.5376L29.352 26.0412C29.103 26.8995 28.8672 27.5692 28.6445 28.0502C28.4218 28.5184 28.0814 28.9085 27.6228 29.2207C27.1773 29.5197 26.5617 29.6693 25.7757 29.6693C24.8325 29.6693 24.0924 29.4288 23.5554 28.9475C23.0314 28.4533 22.6188 27.7251 22.3175 26.7628L18.0535 13.5376Z" fill="#7DD336" />
        <path d="M93.955 3.21854V26.275C93.955 27.2113 93.6928 27.9916 93.1688 28.6157C92.6448 29.2401 91.9179 29.552 90.9877 29.552C90.0843 29.552 89.3636 29.2401 88.8261 28.6157C88.3021 27.9787 88.0405 27.1984 88.0405 26.275V3.21854C88.0405 2.64636 88.152 2.11319 88.3745 1.61903C88.6105 1.11186 88.951 0.715233 89.3961 0.429139C89.8545 0.143046 90.3851 0 90.9877 0C91.9051 0 92.6251 0.312101 93.1491 0.936303C93.6866 1.5475 93.955 2.30824 93.955 3.21854Z" fill="#7DD336" />
        <path d="M76.9126 29.1042C77.6591 28.7142 78.3926 28.0899 79.1132 27.2316C79.6635 28.7791 80.6129 29.5528 81.9624 29.5528C82.8926 29.5528 83.6322 29.2148 84.1827 28.5385C84.7458 27.8623 85.0277 27.043 85.0277 26.0809V11.7826C85.0277 10.9374 84.733 10.2286 84.1434 9.65643C83.5673 9.07123 82.8533 8.77863 82.0015 8.77863C80.7047 8.77863 79.7549 9.50035 79.1525 10.9439C78.3405 10.1246 77.5542 9.53288 76.7949 9.16878C76.035 8.80467 75.1176 8.62261 74.0437 8.62261C71.7905 8.62261 69.7601 9.51341 67.9523 11.295C65.8955 13.3106 64.8671 15.9245 64.8671 19.1365C64.8671 22.6087 66.0335 25.3786 68.3646 27.4463C69.295 28.2495 70.2881 28.8352 71.3449 29.2031C71.87 27.8002 72.3692 26.4757 72.7166 25.2938C72.9613 23.9841 72.4305 22.916 71.8871 21.8219C71.3233 20.6863 70.7451 19.5229 71.0058 18.033C72.161 11.6358 79.6708 12.9288 78.5888 19.3387C78.3285 20.8286 77.3896 21.7309 76.4731 22.6115C75.5904 23.46 74.7288 24.2886 74.5146 25.6034C74.4424 26.8109 74.461 28.1969 74.4789 29.6645C75.4283 29.6308 76.2393 29.4441 76.9126 29.1042Z" fill="#7DD336" />
        <path d="M3.85902 17.3997L7.44915 17.9788C7.73561 18.0251 7.96023 18.1413 8.12304 18.3274C8.282 18.513 8.33946 18.7402 8.29543 19.0089C8.25082 19.2816 8.12125 19.4826 7.90676 19.6119C7.68838 19.7406 7.43987 19.7824 7.16131 19.7375L3.57115 19.1584C3.49911 19.5985 3.36268 19.8783 3.16187 19.9978C2.99047 20.1101 2.79882 20.1491 2.58694 20.115C2.45354 20.0935 2.32619 20.0349 2.2049 19.9394C2.07969 19.8432 1.99918 19.7323 1.96337 19.6066C1.91178 19.4544 1.91212 19.2186 1.96441 18.8992L0.85793 18.7206C0.579354 18.6757 0.358646 18.5602 0.195814 18.3739C0.0296963 18.1833 -0.0307277 17.9496 0.0145422 17.673C0.058537 17.4043 0.187454 17.2072 0.401295 17.0818C0.615134 16.9564 0.863305 16.9164 1.14581 16.962L2.25229 17.1405L2.33454 16.638C2.37599 16.3848 2.48102 16.1859 2.64969 16.0412C2.819 15.8926 3.02923 15.8386 3.28034 15.8791C3.52753 15.919 3.70967 16.0363 3.8268 16.2311C3.94392 16.4259 3.98208 16.648 3.94127 16.8972L3.85902 17.3997Z" fill="#7DD336" />
        <path d="M3.31368 13.0932C3.06805 12.4779 2.98541 11.9248 3.06574 11.434C3.17159 10.7874 3.45025 10.2907 3.9017 9.94372C4.35128 9.60845 4.93899 9.4994 5.66487 9.61649L8.73713 10.1121C9.01961 10.1577 9.24226 10.2736 9.40514 10.4597C9.56796 10.6459 9.62671 10.8773 9.58148 11.1538C9.53745 11.4226 9.40824 11.6216 9.19374 11.7509C8.97598 11.8758 8.72784 11.9157 8.44922 11.8707L5.8714 11.4549C5.51826 11.3979 5.21451 11.4329 4.96015 11.5597C4.70188 11.686 4.54468 11.9205 4.48856 12.2632C4.44203 12.5476 4.51299 12.8029 4.70147 13.0292C4.8906 13.2516 5.13033 13.3863 5.42067 13.4331L8.12213 13.8689C8.40461 13.9145 8.62733 14.0303 8.79014 14.2165C8.95296 14.4027 9.01177 14.6341 8.96648 14.9107C8.92251 15.1794 8.79324 15.3784 8.57879 15.5077C8.36101 15.6325 8.11284 15.6724 7.83429 15.6275L0.87759 14.5052C0.704946 14.4774 0.549498 14.4183 0.411235 14.3281C0.26969 14.2333 0.166595 14.1127 0.101952 13.9664C0.0379481 13.8161 0.0206107 13.6514 0.0499404 13.4722C0.0945729 13.1995 0.22381 13.0005 0.437649 12.8751C0.648206 12.7452 0.890812 12.7023 1.16547 12.7466L3.31368 13.0932Z" fill="#7DD336" />
        <path d="M7.66997 6.81381C8.0435 6.74612 8.32919 6.61231 8.52707 6.41234C8.75162 6.19669 8.88909 5.93503 8.93949 5.62734C8.9956 5.28455 8.96938 4.9405 8.86076 4.59515L8.68993 4.05186C8.66014 3.96311 8.65085 3.84767 8.66206 3.70554C8.68246 3.5809 8.73556 3.46553 8.82142 3.35945C8.90788 3.24946 9.01377 3.16859 9.13901 3.11684C9.26425 3.06506 9.38774 3.049 9.50937 3.06862C9.83891 3.12179 10.1006 3.40588 10.2941 3.92085C10.5299 4.54659 10.587 5.2314 10.4652 5.9754C10.3855 6.46227 10.2142 6.9064 9.95114 7.30774C9.68807 7.70903 9.34699 8.03383 8.92776 8.28207C8.31881 8.6316 7.59062 8.738 6.74306 8.60127C6.17809 8.5101 5.67595 8.29322 5.23669 7.9505C4.79745 7.60776 4.47453 7.18185 4.26789 6.67277C4.06189 6.15979 4.0045 5.62477 4.09567 5.06782C4.18303 4.5342 4.39644 4.06689 4.73593 3.66589C5.07607 3.26099 5.4944 2.96866 5.99102 2.78891C6.48757 2.60915 6.99875 2.56168 7.52453 2.64649C7.8031 2.69144 7.99761 2.78278 8.10794 2.92051C8.2183 3.05826 8.2515 3.26149 8.20747 3.53025L7.66997 6.81381ZM6.84218 4.30551C6.07391 4.37347 5.63976 4.71321 5.53967 5.32471C5.45103 5.86613 5.75577 6.3171 6.45387 6.67758L6.84218 4.30551Z" fill="#7DD336" />
      </svg>
    </div>
  );
}

function TitleContainer() {
  return (
    <div className="compare-section-title-row">
      <TheMealLogo />

      <p className="compare-section-title-text">is</p>
      <p className="compare-section-title-text">the easiest</p>
      <p className="compare-section-title-text">and</p>
      <p className="compare-section-title-text">most</p>
      <p className="compare-section-title-text">cost-effective</p>
      <p className="compare-section-title-text">way</p>
      <p className="compare-section-title-text">to eat</p>

      <div className="content-stretch flex gap-[5px] items-center justify-center relative shrink-0 whitespace-nowrap">
        <p className="compare-section-title-text">in</p>
        <p className="compare-section-title-text">the</p>
        <p className="compare-section-title-text">UAE*</p>
      </div>
    </div>
  );
}

function CardTitle1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0 w-full mx-[0px] mt-[0px] mb-[16px]">
      <div className="overflow-clip relative shrink-0 size-[48px] sm:size-[56px] md:size-[72px]">
        <div className="absolute bottom-[29.17%] left-[16.67%] right-[16.67%] top-1/4">
          <div className="absolute inset-[-9.09%_-6.25%]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 36 26"
            >
              <path
                d="M34 2L12 24L2 14"
                stroke="var(--stroke-0, #7DD336)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
              />
            </svg>
          </div>
        </div>
      </div>

      <TitleContainer />
    </div>
  );
}

type CardData = {
  titleType: "problem" | "solution";
  items: { src: string; text: string }[];
};

const cardsData: CardData[] = [
  {
    titleType: "problem",
    items: [
      { src: imgFaceWithSpiralEyes, text: "Cooking every day" },
      { src: imgMoneyWithWings, text: "High groceries & take-away expenses" },
      { src: imgExplodingHead, text: '"Healthy eating" is confusing' },
      { src: imgFrenchFries, text: "Eating too much fast food" },
    ],
  },
  {
    titleType: "solution",
    items: [
      { src: imgFaceSavoringFood, text: "No cooking – just heat & eat" },
      { src: img, text: "Balanced & tasty ready-to-eat meals" },
      { src: imgFridge, text: "Fridge always stocked" },
      {
        src: imgPersonInLotusPosition,
        text: 'Zero stress about "What\'s for dinner?"',
      },
    ],
  },
];

function CompareItem({ src, text }: { src: string; text: string }) {
  return (
    <div className="content-stretch flex gap-[16px] items-center justify-center relative shrink-0 w-full">
      <div className="relative shrink-0 size-[40px]">
        <img
          alt=""
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={src}
        />
      </div>

      <p className="[word-break:break-word] flex-[1_0_0] font-quicksand-bold leading-[1.2] min-w-px not-italic relative text-[#383e48] text-[16px] sm:text-[20px] tracking-[0.16px]">
        {text}
      </p>
    </div>
  );
}

function CompareCard({ card }: { card: CardData }) {
  return (
    <div className="bg-white relative rounded-[20px] flex-1 w-full lg:max-w-[600px]">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-center pb-[32px] pt-[20px] md:pt-[32px] md:pb-[40px] lg:pt-[40px] lg:pb-[48px] px-[24px] sm:px-[32px] md:px-[40px] lg:px-[40px] justify-between relative size-full">
          {card.titleType === "problem" ? <CardTitle /> : <CardTitle1 />}

          <div className="content-stretch grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 sm:max-w-[420px] md:max-w-full gap-[20px] items-start relative shrink-0 w-full">
            {card.items.map((item, i) => (
              <CompareItem key={i} src={item.src} text={item.text} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CompareCardsContainer() {
  return (
    <div className="content-stretch flex flex-col justify-center md:flex-row gap-[16px] md:gap-[20px] lg:gap-[24px] items-center md:items-stretch size-full relative shrink-0 w-full">
      {cardsData.map((card, i) => (
        <CompareCard key={i} card={card} />
      ))}
    </div>
  );
}

function CompareBlockTotal() {
  return (
    <div className="[word-break:break-word] content-stretch text-[16px] md:text-[20px] flex flex-col gap-[12px] md:gap-[20px] items-center not-italic relative shrink-0 text-center max-w-[400px] md:max-w-[560px] w-full">
      <p className="font-quicksand-semibold leading-[0] relative shrink-0 text-[#383e48] w-full">
        <span className="font-quicksand-bold leading-[1.4]">
          {`* `}
        </span>
        <span className="font-quicksand-bold leading-[1.4]">
          {`The best value in UAE — from just `}
        </span>
        <span className="font-quicksand-bold leading-[1.4] text-[#9a38ef]">
          14.9 AED
        </span>
        <span className="font-quicksand-bold leading-[1.4]">
          {` per meal`}
        </span>
      </p>

      <div className="content-stretch flex gap-[20px] items-start justify-center leading-[1.2] relative shrink-0 w-full">
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-center justify-center min-w-px relative">
          <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-quicksand-semibold relative shrink-0 text-[#383e48] w-full">
            Supermarket
          </p>
          <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-quicksand-bold relative shrink-0 text-[#a81816] w-full">
            15–40 AED
          </p>
        </div>

        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-center justify-center min-w-px relative">
          <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-quicksand-semibold relative shrink-0 text-[#383e48] w-full">
            Delivery apps
          </p>
          <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-quicksand-bold relative shrink-0 text-[#a81816] w-full">
            20–60 AED
          </p>
        </div>

        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-center justify-center min-w-px relative">
          <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-quicksand-semibold relative shrink-0 text-[#383e48] w-full">
            Other plans
          </p>
          <p className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] font-quicksand-bold relative shrink-0 text-[#a81816] w-full">
            30–60 AED
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CompareSection() {
  return (
    <div className="bg-[#f3f4f7] relative shrink-0 w-full items-center content-stretch section-spacing-y section-spacing-x flex justify-center">
      <div className="content-stretch flex flex-col gap-[24px] sm:gap-[40px] items-center relative size-full maxWidth">
        <CompareCardsContainer />
        <CompareBlockTotal />
      </div>
    </div>
  );
}