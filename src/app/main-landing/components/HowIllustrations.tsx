// @ts-nocheck
/*
 * Inline SVG illustrations for the "How it works" section.
 * Authored as JSX for readability of the SVG markup. Each illustration is
 * split into <g> groups (lid, wheels, map-pin, egg…) so that hover-triggered
 * keyframes in how-it-works.css can animate the right pieces independently.
 *
 * Sizing mirrors the previous <img> setup: width 72%, max-width 230, contained
 * via preserveAspectRatio (default "xMidYMid meet" ≈ object-fit: contain).
 */

const SVG_STYLE = {
  width: '72%',
  maxWidth: 230,
  height: 'auto',
  display: 'block',
} as const;

const SVG_PROPS = {
  viewBox: '0 0 212 144',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': true as const,
  focusable: false as const,
  style: SVG_STYLE,
} as const;

export function WeCookIllu() {
  return (
    <svg className="how-illu how-illu--cook" {...SVG_PROPS}>
      <defs>
        <linearGradient id="wc_handle_l" x1="39" y1="50.1609" x2="39" y2="75.1609" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C98CFF" />
          <stop offset="1" stopColor="#9A38EF" />
        </linearGradient>
        <linearGradient id="wc_handle_r" x1="173" y1="50.1609" x2="173" y2="75.1609" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C98CFF" />
          <stop offset="1" stopColor="#9A38EF" />
        </linearGradient>
        <linearGradient id="wc_lid_rim" x1="105.5" y1="39.1543" x2="105.5" y2="47.1543" gradientUnits="userSpaceOnUse">
          <stop stopColor="#DBB2FF" />
          <stop offset="1" stopColor="#BB7AF4" />
        </linearGradient>
        <linearGradient id="wc_lid_dome" x1="106" y1="23.1543" x2="106" y2="39.1543" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EED9FF" />
          <stop offset="1" stopColor="#E0C1FA" />
        </linearGradient>
        <linearGradient id="wc_lid_neck" x1="106" y1="15.1543" x2="106" y2="23.1543" gradientUnits="userSpaceOnUse">
          <stop stopColor="#DBB2FF" />
          <stop offset="1" stopColor="#BB7AF4" />
        </linearGradient>
        <linearGradient id="wc_lid_knob" x1="106" y1="7.1543" x2="106" y2="15.1543" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EED9FF" />
          <stop offset="1" stopColor="#E0C1FA" />
        </linearGradient>
        <linearGradient id="wc_body" x1="106" y1="47.1543" x2="106" y2="137.154" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EED9FF" />
          <stop offset="1" stopColor="#E0C1FA" />
        </linearGradient>
      </defs>

      {/* handles stay static */}
      <path d="M24.9771 53.8625C26.9884 50.3228 31.443 49.11 34.9268 51.1536L54 62.3425L46.7163 75.1609L27.6431 63.9721C24.1593 61.9284 22.9657 57.4022 24.9771 53.8625Z" fill="url(#wc_handle_l)" />
      <path d="M187.023 53.8625C185.012 50.3228 180.557 49.11 177.073 51.1536L158 62.3425L165.284 75.1609L184.357 63.9721C187.841 61.9284 189.034 57.4022 187.023 53.8625Z" fill="url(#wc_handle_r)" />

      {/* animated lid (drawn under the pot body so the body's top edge becomes visible when the lid lifts) */}
      <g className="pot-lid">
        <rect x="35" y="39.1543" width="141" height="8" rx="4" fill="url(#wc_lid_rim)" />
        <path opacity="0.5" d="M45 39.1543C45 30.3177 52.1634 23.1543 61 23.1543H151C159.837 23.1543 167 30.3177 167 39.1543H45Z" fill="url(#wc_lid_dome)" />
        <rect x="95" y="15.1543" width="22" height="8" fill="url(#wc_lid_neck)" />
        <rect x="84" y="7.1543" width="44" height="8" rx="4" fill="#D1A3F8" />
        <rect x="84" y="7.1543" width="44" height="8" rx="4" fill="url(#wc_lid_knob)" />
      </g>

      {/* pot body — sits over the bottom of the lid so the lid appears to lift out of it */}
      <path d="M45 47.1543H167V107.154C167 123.723 153.569 137.154 137 137.154H75C58.4315 137.154 45 123.723 45 107.154V47.1543Z" fill="url(#wc_body)" />
      <rect opacity="0.7" x="57" y="57.1543" width="8" height="35" rx="4" fill="white" />
      <rect opacity="0.7" x="57" y="98.1543" width="8" height="15" rx="4" fill="white" />
    </svg>
  );
}

export function WeDeliverIllu() {
  return (
    <svg className="how-illu how-illu--deliver" {...SVG_PROPS}>
      <defs>
        <linearGradient id="wd_box_rear" x1="152" y1="67" x2="152" y2="111" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D4FAB5" />
          <stop offset="1" stopColor="#69E600" />
        </linearGradient>
        <linearGradient id="wd_cab" x1="80" y1="21" x2="80" y2="111" gradientUnits="userSpaceOnUse">
          <stop stopColor="#DAF9C0" />
          <stop offset="1" stopColor="#7AE81F" />
        </linearGradient>
        <linearGradient id="wd_window" x1="157" y1="46" x2="157" y2="67" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEF3E1" />
          <stop offset="1" stopColor="#F5CB7D" />
        </linearGradient>
        <linearGradient id="wd_arch_rear" x1="62" y1="89" x2="62" y2="137" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5ECA04" />
          <stop offset="1" stopColor="#B6EE86" />
        </linearGradient>
        <linearGradient id="wd_arch_front" x1="161.781" y1="89" x2="161.781" y2="137" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5ECA04" />
          <stop offset="1" stopColor="#B6EE86" />
        </linearGradient>
        <linearGradient id="wd_tire_r" x1="62" y1="95" x2="62" y2="131" gradientUnits="userSpaceOnUse">
          <stop stopColor="#CFEEB6" />
          <stop offset="1" stopColor="#73E315" />
        </linearGradient>
        <linearGradient id="wd_tire_f" x1="162" y1="95" x2="162" y2="131" gradientUnits="userSpaceOnUse">
          <stop stopColor="#CFEEB6" />
          <stop offset="1" stopColor="#73E315" />
        </linearGradient>
        <linearGradient id="wd_hub_r" x1="62" y1="102" x2="62" y2="124" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FAFEF7" />
          <stop offset="1" stopColor="#A5FD5B" />
        </linearGradient>
        <linearGradient id="wd_hub_f" x1="162" y1="102" x2="162" y2="124" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FAFEF7" />
          <stop offset="1" stopColor="#A5FD5B" />
        </linearGradient>
        <linearGradient id="wd_bumper" x1="180" y1="83" x2="180" y2="100.455" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5ECA04" />
          <stop offset="1" stopColor="#B6EE86" />
        </linearGradient>
        <linearGradient id="wd_top_strip" x1="154" y1="32" x2="154" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#CAE8B2" />
          <stop offset="1" stopColor="#9DE75F" />
        </linearGradient>
        <linearGradient id="wd_pin_grad" x1="191.739" y1="2" x2="191.739" y2="43.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#CFEEB6" />
          <stop offset="1" stopColor="#73E315" />
        </linearGradient>
      </defs>

      {/* truck body — bounces slightly */}
      <g className="truck-body">
        <path d="M117 67H173C180.732 67 187 73.268 187 81V105C187 108.314 184.314 111 181 111H117V67Z" fill="url(#wd_box_rear)" />
        <path d="M25 36C25 27.7157 31.7157 21 40 21H127C131.418 21 135 24.5817 135 29V99C135 105.627 129.627 111 123 111H34C29.0294 111 25 106.971 25 102V36Z" fill="url(#wd_cab)" />
        <path d="M135 46H169.333L175 67H135V46Z" fill="url(#wd_window)" />
        <path d="M62 89C74.5813 89 84.8996 98.681 85.916 111H38.084C39.1004 98.681 49.4187 89 62 89Z" fill="url(#wd_arch_rear)" />
        <path d="M161.916 89C173.771 89 183.615 97.5953 185.562 108.894C184.462 110.182 182.827 111 181 111H138C139.016 98.681 149.335 89 161.916 89Z" fill="url(#wd_arch_front)" />
        <path d="M186.419 77C186.796 78.2675 187 79.6099 187 81V85H179C175.686 85 173 82.3137 173 79V78C173 77.4477 173.448 77 174 77H186.419Z" fill="url(#wd_bumper)" />
        <path d="M135 32H160.8C166.986 32 172 37.0144 172 43.2C172 44.7464 170.747 46 169.2 46H135V32Z" fill="url(#wd_top_strip)" />
        <path d="M148 52.5C148 53.8807 146.881 55 145.5 55H141.5C140.119 55 139 53.8807 139 52.5C139 51.1193 140.119 50 141.5 50L145.5 50C146.881 50 148 51.1193 148 52.5Z" fill="white" />
        <path d="M171.762 55H154.5C153.119 55 152 53.8807 152 52.5C152 51.1193 153.119 50 154.5 50L170.412 50L171.762 55Z" fill="white" />
      </g>

      {/* wheels — each group spins around its own centre */}
      <g className="truck-wheel truck-wheel--rear">
        <circle cx="62" cy="113" r="18" fill="url(#wd_tire_r)" />
        <circle cx="62" cy="113" r="11" fill="url(#wd_hub_r)" />
        {/* four bolts at 1:30/4:30/7:30/10:30 (rotated 45° from N/E/S/W) */}
        <circle cx="66.95" cy="108.05" r="1.8" fill="#5ECA04" opacity="0.6" />
        <circle cx="66.95" cy="117.95" r="1.8" fill="#5ECA04" opacity="0.6" />
        <circle cx="57.05" cy="117.95" r="1.8" fill="#5ECA04" opacity="0.6" />
        <circle cx="57.05" cy="108.05" r="1.8" fill="#5ECA04" opacity="0.6" />
      </g>
      <g className="truck-wheel truck-wheel--front">
        <circle cx="162" cy="113" r="18" fill="url(#wd_tire_f)" />
        <circle cx="162" cy="113" r="11" fill="url(#wd_hub_f)" />
        <circle cx="166.95" cy="108.05" r="1.8" fill="#5ECA04" opacity="0.6" />
        <circle cx="166.95" cy="117.95" r="1.8" fill="#5ECA04" opacity="0.6" />
        <circle cx="157.05" cy="117.95" r="1.8" fill="#5ECA04" opacity="0.6" />
        <circle cx="157.05" cy="108.05" r="1.8" fill="#5ECA04" opacity="0.6" />
      </g>

      {/* map pin — wiggles around its tip */}
      <g className="truck-pin">
        <path fillRule="evenodd" clipRule="evenodd" d="M191.739 2C200.984 2 208.478 9.4944 208.479 18.7393C208.479 27.9835 191.742 43.4976 191.739 43.5C191.735 43.4961 175 27.9831 175 18.7393C175 9.4944 182.494 2 191.739 2ZM191.739 12.4785C188.281 12.4785 185.478 15.2815 185.478 18.7393C185.478 22.1971 188.281 25.001 191.739 25.001C195.197 25.0008 198 22.197 198 18.7393C198 15.2816 195.197 12.4786 191.739 12.4785Z" fill="#C3EF8D" />
        <path fillRule="evenodd" clipRule="evenodd" d="M191.739 2C200.984 2 208.478 9.4944 208.479 18.7393C208.479 27.9835 191.742 43.4976 191.739 43.5C191.735 43.4961 175 27.9831 175 18.7393C175 9.4944 182.494 2 191.739 2ZM191.739 12.4785C188.281 12.4785 185.478 15.2815 185.478 18.7393C185.478 22.1971 188.281 25.001 191.739 25.001C195.197 25.0008 198 22.197 198 18.7393C198 15.2816 195.197 12.4786 191.739 12.4785Z" fill="url(#wd_pin_grad)" />
      </g>
    </svg>
  );
}

export function YouEatIllu() {
  return (
    <svg className="how-illu how-illu--eat" {...SVG_PROPS}>
      <defs>
        <linearGradient id="ye_plate_outer" x1="106.404" y1="2" x2="106.404" y2="142" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EAEEFE" />
          <stop offset="1" stopColor="#CDD6FB" />
        </linearGradient>
        <linearGradient id="ye_plate_inner" x1="106.404" y1="16" x2="106.404" y2="128" gradientUnits="userSpaceOnUse">
          <stop stopColor="#DEE4FD" />
          <stop offset="1" stopColor="#B6C4FB" />
        </linearGradient>
        <linearGradient id="ye_spoon_stem" x1="21" y1="43.9998" x2="21" y2="123" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C7D1FC" />
          <stop offset="1" stopColor="#A2B4FA" />
        </linearGradient>
        <linearGradient id="ye_spoon_head" x1="21" y1="15.9998" x2="21" y2="46.9998" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D8DFFC" />
          <stop offset="1" stopColor="#879DF8" />
        </linearGradient>
        <linearGradient id="ye_fork_stem" x1="191" y1="44" x2="191" y2="123" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C7D1FC" />
          <stop offset="1" stopColor="#A2B4FA" />
        </linearGradient>
        <linearGradient id="ye_fork_head" x1="191" y1="16" x2="191" y2="47" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D8DFFC" />
          <stop offset="1" stopColor="#879DF8" />
        </linearGradient>
        <linearGradient id="ye_egg_white" x1="71.9945" y1="54.5608" x2="120.077" y2="105.834" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="#EFF2FE" />
        </linearGradient>
      </defs>

      <circle cx="106.404" cy="72" r="70" fill="url(#ye_plate_outer)" />
      <circle cx="106.404" cy="72" r="56" fill="url(#ye_plate_inner)" />

      {/* spoon (static) */}
      <path d="M18 43.9998H24L25.8735 118.001C25.9428 120.741 23.7407 123 21 123C18.2593 123 16.0572 120.741 16.1265 118.001L18 43.9998Z" fill="url(#ye_spoon_stem)" />
      <path d="M10 26.9998C10 20.9246 14.9249 15.9998 21 15.9998C27.0751 15.9998 32 20.9246 32 26.9998V35.9998C32 42.0749 27.0751 46.9998 21 46.9998C14.9249 46.9998 10 42.0749 10 35.9998V26.9998Z" fill="url(#ye_spoon_head)" />

      {/* fork (static) */}
      <path d="M188 44H194L195.873 118.002C195.943 120.741 193.741 123 191 123C188.259 123 186.057 120.741 186.127 118.002L188 44Z" fill="url(#ye_fork_stem)" />
      <path d="M202 42V41V18C202 16.8954 201.105 16 200 16C198.895 16 198 16.8954 198 18V40C198 40.5523 197.552 41 197 41C196.448 41 196 40.5523 196 40V18C196 16.8954 195.105 16 194 16C192.895 16 192 16.8954 192 18V40C192 40.5523 191.552 41 191 41C190.448 41 190 40.5523 190 40V18C190 16.8954 189.105 16 188 16C186.895 16 186 16.8954 186 18V40C186 40.5523 185.552 41 185 41C184.448 41 184 40.5523 184 40V18C184 16.8954 183.105 16 182 16C180.895 16 180 16.8954 180 18V41V42C180 44.7614 182.239 47 185 47H197C199.761 47 202 44.7614 202 42Z" fill="url(#ye_fork_head)" />

      <g opacity="0.4">
        <path d="M132.634 29.7181C133.526 28.3027 133.105 26.4242 131.641 25.6149C128.303 23.7699 124.776 22.2906 121.121 21.2026C119.518 20.7253 117.883 21.7415 117.498 23.3695C117.113 24.9975 118.124 26.6197 119.724 27.1087C122.733 28.0286 125.642 29.2486 128.406 30.7504C129.876 31.5488 131.742 31.1336 132.634 29.7181Z" fill="white" />
        <path d="M153.826 57.516C155.427 57.0311 156.34 55.3364 155.765 53.7657C152.814 45.7119 147.951 38.4936 141.597 32.7329C140.357 31.6094 138.444 31.8188 137.393 33.1204C136.342 34.4219 136.553 36.322 137.784 37.4546C143.202 42.4397 147.372 48.6307 149.956 55.5251C150.543 57.0916 152.225 58.0008 153.826 57.516Z" fill="white" />
      </g>

      {/* fried egg — jiggles in place */}
      <g className="fried-egg">
        <path d="M65.3519 62.0461C69.268 54.6933 77.0589 52.1725 84.6205 53.4328C92.1818 54.6931 94.7217 58.1325 96.9935 60.1925C105.931 68.2967 113.527 59.3564 124.732 68.7941C135.937 78.232 132.223 90.7081 125.623 100.111C119.024 109.513 100.405 114.877 89.8002 110.949C85.6715 109.42 82.6809 108.424 78.767 105.693C67.8619 98.0822 63.8248 87.7407 62.8255 75.6027C62.7162 70.3862 63.5372 65.4534 65.3519 62.0461Z" fill="url(#ye_egg_white)" />
        <path d="M75.1841 75.5876C76.7052 79.9154 81.4856 82.0856 85.8609 80.4343C90.2359 78.783 92.5497 73.9358 91.0288 69.6081C89.5078 65.2804 84.7273 63.1102 80.3521 64.7615C75.9769 66.4127 73.6632 71.2599 75.1841 75.5876Z" fill="#F0CD13" />
      </g>
    </svg>
  );
}

export function HowIllustration({ i }: { i: number }) {
  if (i === 0) return <WeCookIllu />;
  if (i === 1) return <WeDeliverIllu />;
  return <YouEatIllu />;
}
