import { useState, useEffect } from "react";

import { COLOR_TOKENS } from "./common/colorTokens";
import img0 from "../../imports/Meals-1/5e1602b3d213f8c0c5dbed5bfb50317ae7f27ab8.png";
import img1 from "../../imports/Meals-1/56780a365aa45daafd050fc12b3a8115421d6655.png";
import img2 from "../../imports/Meals-1/7e8feb09f54bcfba5cceb1290608a5fb1c745aaa.png";
import img3 from "../../imports/Meals-1/fd9226e7ec7cd91471c0c318b8bff933c0680745.png";
import img4 from "../../imports/Meals-1/c0cf0f7ecebec21dbb915f4c886f6b0fcf9ae929.png";
import img5 from "../../imports/Meals-1/1941eddc8406411bb7efafff2a9cd2de1155ae63.png";
import img6 from "../../imports/Meals-1/da67a743ccefc0b646f24399e01f02886e78146a.png";
import img7 from "../../imports/Meals-1/cb3b298149cdf74ac3dce3890ed297128c3fa029.png";
import img8 from "../../imports/Meals-1/9db8d32f0e633e8a41c0c83ab2d1cb95fb61f8c0.png";
import img9 from "../../imports/Meals-1/14c1ccfe698cd468a5634658d43d3c8daf9e7c48.png";
import img10 from "../../imports/Meals-1/a4419f45c37bce9e5445031b0fb94d6d7e393d5f.png";
import img11 from "../../imports/Meals-1/34321367106cef1aa6c97cf97f61bbfb6c9aea6d.png";
import img12 from "../../imports/Meals-1/4738670d742226f197b3cbb6d5595a8e6975e56e.png";
import img13 from "../../imports/Meals-1/6391913b32e2c44e63a3b02c32daf8711ce1fb09.png";
import img14 from "../../imports/Meals-1/e34c512e91fb64c0ebea87bd0470eadf5f5009c1.png";

// Row A: 7 items (shifted, fewer)
const rowA = [img0, img1, img2, img3, img4, img5, img6];
// Row B: 8 items (main)
const rowB = [img7, img8, img9, img10, img11, img12, img13, img14];

function MealImg({ src, delay, active }: { src: string; delay: number; active: boolean }) {
  return (
    <div
      className="group relative shrink-0 w-[120px] sm:w-[200px] lg:w-[230px] xl:w-[264px] aspect-[218/160] rounded-[8px] xl:rounded-[12px] overflow-hidden hover:z-10"
      style={active
        ? { animation: 'mealSlideUp 0.5s ease-out both', animationDelay: `${delay}s` }
        : { opacity: 0 }
      }
    >
      <div className="h-full w-full origin-center cursor-pointer group-hover:animate-[mealWiggle_0.5s_ease-in-out]">
        <img src={src} alt="" className="pointer-events-none block h-full w-full object-cover" />
      </div>
    </div>
  );
}

const STAGGER = 0.08;

export default function HeroMealsSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="relative w-full overflow-hidden flex flex-col justify-end gap-[16px] xl:gap-[24px]">
      <style>{`
        @keyframes mealSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes mealWiggle {
          0%   { transform: rotate(0deg); }
          20%  { transform: rotate(-2.5deg); }
          40%  { transform: rotate(2.5deg); }
          60%  { transform: rotate(-1.5deg); }
          80%  { transform: rotate(1deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>

      {/* Row A — 7 items, left→right stagger starting at 0s */}
      <div
        className="flex gap-[12px] justify-center items-center sm:gap-[16px] xl:gap-[24px] relative shrink-0"
        style={{ left: '50%', transform: 'translateX(-50%)' }}
      >
        {rowA.map((src, i) => <MealImg key={i} src={src} delay={i * STAGGER} active={loaded} />)}
      </div>

      {/* Row B — 8 items, left→right stagger starting after Row A */}
      <div
        className="flex gap-[10px] justify-center items-center sm:gap-[12px] xl:gap-[20px] relative shrink-0"
        style={{ left: '50%', transform: 'translateX(-50%)' }}
      >
        {rowB.map((src, i) => <MealImg key={i} src={src} delay={(rowA.length + i) * STAGGER} active={loaded} />)}
      </div>

      {/* Gradient: fades top rows into hero, darkens toward bottom */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, color-mix(in srgb, ${COLOR_TOKENS.primary[900]} 10%, transparent), color-mix(in srgb, ${COLOR_TOKENS.primary[900]} 85%, transparent))`,
        }}
      />
    </div>
  );
}
