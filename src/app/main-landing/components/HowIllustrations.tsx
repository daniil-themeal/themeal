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
        <linearGradient id="ye_egg_white" x1="72.1199" y1="54.5608" x2="120.203" y2="105.834" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="#EFF2FE" />
        </linearGradient>
        <linearGradient id="ye_egg_yolk" x1="83.232" y1="80.9877" x2="83.232" y2="64.2086" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F0CD13" />
          <stop offset="1" stopColor="#F0E087" />
        </linearGradient>
        <linearGradient id="ye_sausage_a" x1="136.467" y1="53.6025" x2="116.624" y2="85.8323" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F79A7E" />
          <stop offset="1" stopColor="#F9C4B4" />
        </linearGradient>
        <linearGradient id="ye_sausage_b" x1="153.925" y1="61.7022" x2="130.628" y2="105.898" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F79A7E" />
          <stop offset="1" stopColor="#F9C4B4" />
        </linearGradient>
        {/* shared gradient for the new sausage cuts (deeper orange) */}
        <linearGradient id="ye_sausage_cut" x1="130" y1="60" x2="130" y2="95" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F97046" />
          <stop offset="1" stopColor="#F98A68" />
        </linearGradient>
        {/* shared gradient for the herb / pea dots */}
        <linearGradient id="ye_herb" x1="125" y1="33" x2="125" y2="55" gradientUnits="userSpaceOnUse">
          <stop stopColor="#BCDFA0" />
          <stop offset="1" stopColor="#65C218" />
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
        <path d="M65.4774 62.0461C69.3935 54.6933 77.1844 52.1725 84.746 53.4328C92.3073 54.6931 94.8472 58.1325 97.119 60.1925C106.057 68.2967 113.652 59.3564 124.857 68.7941C136.063 78.232 132.348 90.7081 125.749 100.111C119.149 109.513 100.53 114.877 89.9256 110.949C85.797 109.42 82.8064 108.424 78.8924 105.693C67.9874 98.0822 63.9503 87.7407 62.951 75.6027C62.8417 70.3862 63.6627 65.4534 65.4774 62.0461Z" fill="url(#ye_egg_white)" />
        <path d="M75.3101 75.5879C76.8312 79.9155 81.6108 82.0856 85.9859 80.4346C90.3611 78.7833 92.6748 73.9361 91.1539 69.6084C89.6329 65.2807 84.8533 63.1106 80.4781 64.7617C76.1029 66.413 73.7891 71.2601 75.3101 75.5879Z" fill="url(#ye_egg_yolk)" />
      </g>

      {/* herb / pea dots scattered near the sausages — each one hops with
         a slightly different delay during the card-hover sizzle animation */}
      <circle className="pea pea--1" cx="125.147" cy="39.7425" r="4.22546" transform="rotate(7.52677 125.147 39.7425)" fill="url(#ye_herb)" />
      <circle className="pea pea--2" cx="136.147" cy="38.7425" r="4.22546" transform="rotate(7.52677 136.147 38.7425)" fill="url(#ye_herb)" />
      <circle className="pea pea--3" cx="113.264" cy="33.8591" r="4.32933" transform="rotate(7.52677 113.264 33.8591)" fill="url(#ye_herb)" />
      <circle className="pea pea--4" cx="125.264" cy="50.8591" r="4.32933" transform="rotate(7.52677 125.264 50.8591)" fill="url(#ye_herb)" />
      <circle className="pea pea--5" cx="114.613" cy="45.2091" r="4.32933" transform="rotate(7.52677 114.613 45.2091)" fill="url(#ye_herb)" />
      <circle className="pea pea--6" cx="135.588" cy="50.1836" r="3.72743" transform="rotate(7.52677 135.588 50.1836)" fill="url(#ye_herb)" />

      {/* sausages — sizzle in the pan. Cuts live inside the same group so
         they translate/rotate together with their sausage during the
         hover-triggered sizzle animation. */}
      <g className="sausage sausage--a">
        <path d="M145.18 59.0514C142.493 56.7806 138.474 57.1176 136.203 59.8044C133.82 62.6235 129.744 65.2769 125.019 67.0943C120.265 68.923 115.744 69.5655 112.82 69.1975C109.329 68.7581 106.144 71.2319 105.704 74.7224C105.265 78.2129 107.738 81.3984 111.229 81.8378C116.904 82.5523 123.618 81.2831 129.593 78.9849C135.597 76.6755 141.742 72.9871 145.933 68.0288C148.204 65.3418 147.867 61.3223 145.18 59.0514Z" fill="url(#ye_sausage_a)" />
        <path d="M117.328 70.0029C117.879 69.9611 118.359 70.3733 118.401 70.9238C118.447 71.5202 118.69 72.5069 119.146 73.4687C119.609 74.4423 120.219 75.2392 120.903 75.6328C121.382 75.9082 121.547 76.5203 121.271 76.999C120.996 77.4776 120.384 77.6425 119.905 77.3672C118.714 76.682 117.88 75.4646 117.34 74.3262C116.794 73.1759 116.474 71.9518 116.407 71.0762C116.365 70.5256 116.778 70.045 117.328 70.0029Z" fill="url(#ye_sausage_cut)" />
        <path d="M126.061 67.3678C126.612 67.326 127.092 67.7382 127.134 68.2887C127.222 69.4396 128.055 71.0881 129.636 71.9977C130.115 72.2731 130.28 72.8852 130.004 73.3639C129.729 73.8425 129.117 74.0073 128.638 73.732C126.468 72.484 125.276 70.2342 125.14 68.441C125.098 67.8905 125.511 67.4098 126.061 67.3678Z" fill="url(#ye_sausage_cut)" />
        <path d="M134.328 63.0029C134.879 62.9611 135.359 63.3733 135.401 63.9238C135.489 65.0747 136.322 66.7233 137.903 67.6328C138.382 67.9082 138.547 68.5203 138.271 68.999C137.996 69.4776 137.384 69.6425 136.905 69.3672C134.735 68.1191 133.544 65.8694 133.407 64.0762C133.365 63.5256 133.778 63.045 134.328 63.0029Z" fill="url(#ye_sausage_cut)" />
      </g>
      <g className="sausage sausage--b">
        <path d="M165.88 68.1118C162.141 65.3574 156.877 66.1552 154.123 69.8938C151.233 73.8165 146.097 77.6701 140.034 80.4797C133.934 83.3067 128.036 84.5509 124.152 84.3236C119.516 84.0521 115.538 87.5907 115.267 92.2267C114.995 96.8626 118.533 100.84 123.169 101.112C130.708 101.553 139.439 99.2908 147.105 95.7379C154.809 92.1677 162.579 86.7689 167.662 79.8694C170.417 76.1306 169.619 70.8662 165.88 68.1118Z" fill="url(#ye_sausage_b)" />
        <path d="M129.044 85.4598C129.724 85.4081 130.318 85.9181 130.37 86.5985C130.426 87.3353 130.725 88.5536 131.29 89.742C131.861 90.945 132.614 91.9304 133.46 92.4168C134.051 92.757 134.255 93.5118 133.915 94.1033C133.575 94.6949 132.82 94.8986 132.228 94.5584C130.756 93.7119 129.725 92.2092 129.057 90.8026C128.382 89.3812 127.987 87.8679 127.905 86.786C127.853 86.1056 128.363 85.5115 129.044 85.4598Z" fill="url(#ye_sausage_cut)" />
        <path d="M140.634 81.964C141.302 81.8233 141.958 82.2508 142.099 82.9184C142.393 84.3138 143.68 86.1981 145.765 87.0551C146.396 87.3146 146.697 88.036 146.438 88.6671C146.178 89.2982 145.457 89.5995 144.826 89.3401C141.965 88.1641 140.138 85.6028 139.68 83.4285C139.539 82.7608 139.967 82.1048 140.634 81.964Z" fill="url(#ye_sausage_cut)" />
        <path d="M150.589 76.1235C151.236 75.9067 151.937 76.2556 152.154 76.9025C152.607 78.2546 154.103 79.9779 156.272 80.5886C156.929 80.7735 157.312 81.4553 157.127 82.1122C156.942 82.769 156.26 83.1515 155.603 82.9667C152.626 82.1286 150.516 79.7952 149.81 77.6883C149.593 77.0413 149.942 76.3404 150.589 76.1235Z" fill="url(#ye_sausage_cut)" />
      </g>
    </svg>
  );
}

export function HowIllustration({ i }: { i: number }) {
  if (i === 0) return <WeCookIllu />;
  if (i === 1) return <WeDeliverIllu />;
  return <YouEatIllu />;
}
