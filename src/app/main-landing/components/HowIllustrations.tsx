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
        <linearGradient id="ye_plate_inner" x1="56" y1="0" x2="56" y2="112" gradientUnits="userSpaceOnUse">
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
        <linearGradient id="ye_egg_white" x1="71.512" y1="58.3816" x2="116.41" y2="106.259" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="#EFF2FE" />
        </linearGradient>
        <linearGradient id="ye_egg_yolk" x1="81.8876" y1="83.0579" x2="81.8876" y2="67.3904" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F0CD13" />
          <stop offset="1" stopColor="#F0E087" />
        </linearGradient>
        <linearGradient id="ye_sausage_a" x1="105.714" y1="60.5167" x2="143.547" y2="61.5859" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F9C4B4" />
          <stop offset="1" stopColor="#F79A7E" />
        </linearGradient>
        <linearGradient id="ye_sausage_b" x1="108.953" y1="45.5347" x2="158.877" y2="43.6126" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F9C4B4" />
          <stop offset="1" stopColor="#F79A7E" />
        </linearGradient>
        {/* Per-cut gradients keep the Figma swatch direction on every knife
           mark (top-left highlight → bottom-right shadow). All cuts share
           the same colour stops (#F97046 → #F98A68). */}
        <linearGradient id="ye_sausage_a_cut_1" x1="128.696" y1="67.5275" x2="135.191" y2="63.7772" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F97046" />
          <stop offset="1" stopColor="#F98A68" />
        </linearGradient>
        <linearGradient id="ye_sausage_a_cut_2" x1="122.047" y1="61.2821" x2="127.677" y2="58.0319" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F97046" />
          <stop offset="1" stopColor="#F98A68" />
        </linearGradient>
        <linearGradient id="ye_sausage_a_cut_3" x1="114.134" y1="56.3051" x2="119.763" y2="53.0548" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F97046" />
          <stop offset="1" stopColor="#F98A68" />
        </linearGradient>
        <linearGradient id="ye_sausage_b_cut_1" x1="140.992" y1="53.5195" x2="149.017" y2="48.8861" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F97046" />
          <stop offset="1" stopColor="#F98A68" />
        </linearGradient>
        <linearGradient id="ye_sausage_b_cut_2" x1="131.956" y1="45.3726" x2="138.323" y2="40.4768" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F97046" />
          <stop offset="1" stopColor="#F98A68" />
        </linearGradient>
        <linearGradient id="ye_sausage_b_cut_3" x1="121.751" y1="39.8196" x2="127.51" y2="34.2219" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F97046" />
          <stop offset="1" stopColor="#F98A68" />
        </linearGradient>
      </defs>

      {/* plate (static) */}
      <circle cx="106.404" cy="72" r="70" fill="url(#ye_plate_outer)" />
      <circle cx="56" cy="56" r="56" transform="matrix(-1 0 0 1 162.021 16)" fill="url(#ye_plate_inner)" />

      {/* spoon (static) */}
      <path d="M18 43.9998H24L25.8735 118.001C25.9428 120.741 23.7407 123 21 123C18.2593 123 16.0572 120.741 16.1265 118.001L18 43.9998Z" fill="url(#ye_spoon_stem)" />
      <path d="M10 26.9998C10 20.9246 14.9249 15.9998 21 15.9998C27.0751 15.9998 32 20.9246 32 26.9998V35.9998C32 42.0749 27.0751 46.9998 21 46.9998C14.9249 46.9998 10 42.0749 10 35.9998V26.9998Z" fill="url(#ye_spoon_head)" />

      {/* fork (static) */}
      <path d="M188 44H194L195.873 118.002C195.943 120.741 193.741 123 191 123C188.259 123 186.057 120.741 186.127 118.002L188 44Z" fill="url(#ye_fork_stem)" />
      <path d="M202 42V41V18C202 16.8954 201.105 16 200 16C198.895 16 198 16.8954 198 18V40C198 40.5523 197.552 41 197 41C196.448 41 196 40.5523 196 40V18C196 16.8954 195.105 16 194 16C192.895 16 192 16.8954 192 18V40C192 40.5523 191.552 41 191 41C190.448 41 190 40.5523 190 40V18C190 16.8954 189.105 16 188 16C186.895 16 186 16.8954 186 18V40C186 40.5523 185.552 41 185 41C184.448 41 184 40.5523 184 40V18C184 16.8954 183.105 16 182 16C180.895 16 180 16.8954 180 18V41V42C180 44.7614 182.239 47 185 47H197C199.761 47 202 44.7614 202 42Z" fill="url(#ye_fork_head)" />

      {/* fried egg — jiggles in place. Path is the Figma source verbatim. */}
      <g className="fried-egg">
        <path d="M65.3094 65.3711C68.9662 58.5053 76.3819 56.7822 83.3018 57.3283C90.2217 57.8744 94.2067 61.3703 96.3281 63.2938C104.674 70.8613 110.293 62.8596 120.756 71.6722C131.22 80.485 127.751 92.1348 121.589 100.914C115.426 109.694 98.0409 114.703 88.1384 111.035C84.2832 109.608 81.4907 108.677 77.836 106.127C67.6532 99.0204 63.8835 89.3639 62.9504 78.0299C62.8483 73.1589 63.6149 68.5528 65.3094 65.3711Z" fill="url(#ye_egg_white)" />
        <path d="M72.5164 80.7327C74.4641 86.2741 80.5841 89.0521 86.1863 86.9378C91.7886 84.8234 94.7512 78.6169 92.8035 73.0755C90.8558 67.5343 84.7357 64.7562 79.1336 66.8704C73.5314 68.9847 70.5688 75.1912 72.5164 80.7327Z" fill="url(#ye_egg_yolk)" />
      </g>

      {/* sausage A (lower) — sizzles. The 3 knife cuts live inside the
         same group so they translate/rotate together with the sausage
         body during the hover-triggered sizzle animation. Figma source. */}
      <g className="sausage sausage--a">
        <path d="M106.076 50.2465C105.453 53.7089 107.755 57.0214 111.217 57.6446C114.85 58.2984 119.186 60.502 123.122 63.685C127.083 66.8878 129.9 70.4821 131.043 73.1981C132.408 76.4407 136.143 77.9628 139.386 76.598C142.628 75.2333 144.15 71.4987 142.786 68.2561C140.567 62.9835 136.111 57.8037 131.133 53.7786C126.131 49.734 119.864 46.2557 113.475 45.1057C110.012 44.4826 106.7 46.7842 106.076 50.2465Z" fill="url(#ye_sausage_a)" />
        <path d="M129.486 68.8912C129.175 68.4354 129.292 67.813 129.747 67.5013C130.241 67.1639 130.974 66.4601 131.579 65.5836C132.191 64.6964 132.576 63.7696 132.574 62.9801C132.574 62.4279 133.021 61.9791 133.574 61.9781C134.126 61.9774 134.575 62.425 134.575 62.9772C134.578 64.3515 133.94 65.682 133.225 66.7195C132.502 67.7676 131.601 68.6566 130.876 69.1521C130.42 69.4636 129.798 69.3469 129.486 68.8912Z" fill="url(#ye_sausage_a_cut_1)" />
        <path d="M122.838 62.6459C122.526 62.19 122.643 61.5676 123.099 61.256C124.052 60.6048 125.063 59.0591 125.06 57.2347C125.059 56.6826 125.507 56.2337 126.059 56.2328C126.611 56.232 127.06 56.6797 127.061 57.2319C127.065 59.735 125.713 61.8921 124.228 62.9068C123.772 63.2183 123.15 63.1016 122.838 62.6459Z" fill="url(#ye_sausage_a_cut_2)" />
        <path d="M114.924 57.6688C114.613 57.2129 114.73 56.5906 115.185 56.2789C116.138 55.6278 117.149 54.082 117.146 52.2577C117.146 51.7055 117.593 51.2567 118.145 51.2557C118.698 51.2549 119.147 51.7026 119.147 52.2548C119.152 54.758 117.799 56.915 116.314 57.9297C115.858 58.2412 115.236 58.1245 114.924 57.6688Z" fill="url(#ye_sausage_a_cut_3)" />
      </g>

      {/* sausage B (upper) — sizzles with a slightly different rhythm so
         the two sausages don't pulse in unison. Figma source. */}
      <g className="sausage sausage--b">
        <path d="M108.526 31.9762C108.01 36.5913 111.333 40.7515 115.948 41.2676C120.79 41.809 126.695 44.3296 132.16 48.1754C137.658 52.045 141.685 56.5311 143.43 60.0076C145.513 64.1582 150.566 65.8341 154.717 63.7512C158.868 61.6683 160.544 56.6155 158.461 52.465C155.074 45.7158 148.749 39.2859 141.839 34.4227C134.895 29.5358 126.334 25.5063 117.818 24.5541C113.203 24.0382 109.042 27.3613 108.526 31.9762Z" fill="url(#ye_sausage_b)" />
        <path d="M141.968 55.2037C141.583 54.6403 141.728 53.8708 142.291 53.4858C142.901 53.0689 143.807 52.2003 144.554 51.1174C145.31 50.0211 145.787 48.8763 145.785 47.9008C145.784 47.2184 146.336 46.6646 147.018 46.6634C147.7 46.6623 148.254 47.2141 148.255 47.8964C148.258 49.5943 147.472 51.2386 146.588 52.5204C145.695 53.8157 144.582 54.9145 143.686 55.5267C143.123 55.9116 142.353 55.767 141.968 55.2037Z" fill="url(#ye_sausage_b_cut_1)" />
        <path d="M133.145 46.9137C132.69 46.4058 132.732 45.624 133.24 45.1683C134.301 44.2159 135.289 42.1591 134.989 39.9252C134.898 39.2489 135.373 38.6273 136.049 38.5364C136.725 38.4455 137.347 38.9197 137.438 39.596C137.85 42.6615 136.545 45.5239 134.891 47.008C134.383 47.4637 133.601 47.4215 133.145 46.9137Z" fill="url(#ye_sausage_b_cut_2)" />
        <path d="M123.11 41.2132C122.599 40.7613 122.551 39.9798 123.002 39.4685C123.947 38.4 124.691 36.243 124.135 34.0586C123.967 33.3973 124.366 32.7251 125.028 32.5568C125.689 32.3885 126.361 32.7878 126.529 33.449C127.292 36.4465 126.326 39.4404 124.855 41.1054C124.403 41.6166 123.622 41.665 123.11 41.2132Z" fill="url(#ye_sausage_b_cut_3)" />
      </g>
    </svg>
  );
}

export function HowIllustration({ i }: { i: number }) {
  if (i === 0) return <WeCookIllu />;
  if (i === 1) return <WeDeliverIllu />;
  return <YouEatIllu />;
}
