// @ts-nocheck
import { createElement, Fragment, useState, useEffect, useRef } from 'react';
import { PhoneInput } from '../../../components/common/PhoneInput';
import { TempPhoneResetButton } from '../../../components/common/TempPhoneResetButton';
import { formatUaePhoneInput, normalizeUaePhone, validateUaePhone } from '../../../components/checkout/phoneValidation';
import { MealDetailModal } from '../../../components/checkout/MealDetailModal';
import { buildMealDetail } from '../../../data/testMeals';
import { useTestimonialIframe } from '../../useTestimonialIframe';
import { useHorizontalScroll } from '../../useHorizontalScroll';
import { Icon, Logo, Stars, Social } from '../icons';

/* ---------------- Weekly menu ---------------- */
function Menu({ t, onOrder }) {
  const dayKeys = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const [day, setDay] = useState(0);
  const [slideDirection, setSlideDirection] = useState('left');
  const [selectedMeal, setSelectedMeal] = useState(null);
  const imgs = ['/landing-stas/assets/img/p6.png','/landing-stas/assets/meals/meal_03.png','/landing-stas/assets/meals/meal_04.png','/landing-stas/assets/meals/meal_05.png'];
  const meals = t.menu.meals[dayKeys[day]];
  const dayTabsScroll = useHorizontalScroll();
  const menuGridScroll = useHorizontalScroll({ wheel: false });
  const meta = [
    { kcal:572, g:330 },
    { kcal:648, g:420 },
    { kcal:701, g:450 },
    { kcal:285, g:310 },
  ];

  const openMeal = (name, slotIndex) => {
    const type = t.menu.slots[slotIndex];
    setSelectedMeal(buildMealDetail(type, name, imgs[slotIndex % imgs.length], {
      id: `${dayKeys[day]}-${slotIndex}-${name}`,
      kcal: meta[slotIndex].kcal,
      weight: meta[slotIndex].g,
    }));
  };

  const selectDay = (nextDay) => {
    if (nextDay === day) return;
    setSlideDirection(nextDay > day ? 'left' : 'right');
    setDay(nextDay);
  };

  useEffect(() => {
    menuGridScroll.resetScroll();
  }, [day]);

  useEffect(() => {
    setSelectedMeal(null);
  }, [day]);

  return (
    createElement('section', { className:'section section--cream menu-section', id:'menu', style:{ paddingBottom:'clamp(var(--space-48), 6vw, var(--space-80))' } },
      createElement('div', { className:'wrap', style:{ height:'fit-content' } },
        createElement('div', { className:'menu-head reveal' },
          createElement('div', { className:'menu-head-text' },
            createElement('div', { className:'menu-head-intro' },
              createElement('div', { className:'eyebrow menu-eyebrow' }, t.menu.eyebrow),
              createElement('h2', { className:'h2 menu-head-title' }, t.menu.title),
            ),
            createElement('p', { className:'row menu-head-trusted', style:{ gap:8, margin:0, color:'var(--pink)', fontWeight:600, fontSize:'var(--fs-16)', textAlign:'left' } }, createElement(Icon.heart,{size:18,fill:'currentColor',sw:0}), t.menu.trusted)
          ),
          createElement('button', {
            className:'btn btn-primary menu-head-cta',
            onClick:onOrder,
            style:{
              flexDirection:'row', alignItems:'center', justifyContent:'space-between', gap:16,
              whiteSpace:'normal', textAlign:'start',
            },
          },
            createElement('span', { className:'stack', style:{ alignItems:'flex-start', gap:8 } },
              t.menu.cta,
              createElement('span', { className:'mono', style:{ fontSize:'var(--fs-14)', fontWeight:500, opacity:.92 } }, t.menu.ctaSub)),
            createElement(Icon.arrow, { size:20, className:'flip' }))
        )
      ),

      /* day tabs — align with .wrap via gutter-x */
      createElement('div', { className:'menu-days-wrap reveal' },
        createElement('div', {
          ref: dayTabsScroll.ref,
          onMouseDown: dayTabsScroll.onMouseDown,
          className:'menu-days no-scrollbar h-scroll gutter-x reveal',
        },
          t.menu.days.map((d,i)=>createElement('button', {
            key:i,
            className:`menu-day-tab${i===day ? ' is-active' : ''}`,
            onClick: dayTabsScroll.guardClick(() => selectDay(i)),
          }, d))
        )
      ),

      /* meal cards — full-bleed scroll on mobile; grid in .wrap-width container on desktop */
      createElement('div', { className:'menu-grid-wrap reveal' },
        createElement('div', {
          className:'menu-grid-shell reveal',
        },
          createElement('div', {
            ref: menuGridScroll.ref,
            onMouseDown: menuGridScroll.onMouseDown,
            className:'menu-grid-scroll no-scrollbar h-scroll reveal',
          },
            createElement('div', {
              key: dayKeys[day],
              className:'menu-grid menu-grid--cards',
              style: {
                animation: slideDirection === 'left'
                  ? 'menuMealsSlideFromRight 260ms ease-out both'
                  : 'menuMealsSlideFromLeft 260ms ease-out both',
              },
            },
            meals.map((m,i)=>createElement('div', { key:i, className:'menucard-shell' },
              createElement('article', {
                className:'menucard',
                role:'button',
                tabIndex:0,
                onClick: menuGridScroll.guardClick(() => openMeal(m, i)),
                onKeyDown: (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openMeal(m, i);
                  }
                },
              },
                createElement('img', { className:'menucard-img', src:imgs[i%imgs.length], alt:'', loading:'lazy', draggable:false }),
                createElement('div', { className:'menucard-body' },
                  createElement('p', { className:'menucard-meta' },
                    createElement('span', { className:'menucard-meta-nutrition' }, `${meta[i].kcal} ccal • ${meta[i].g} g`),
                    createElement('span', { className:'menucard-meta-slot' }, t.menu.slots[i])),
                  createElement('p', { className:'menucard-title' }, m))
              )
            ))
          )
          )
        )
      ),

      createElement('div', { className:'wrap', style:{ height:'fit-content' } },
        createElement('p', { className:'menu-note muted reveal' },
          createElement(Icon.info, { size:18, style:{ color:'var(--green)', flexShrink:0, marginTop:1 } }),
          t.menu.note),
        createElement('style', null, `
          .menu-head-intro {
            width:100%;
          }
          .menu-eyebrow { margin-bottom:var(--space-24); }
          @media (max-width: 640px) {
            .menu-head-intro { text-align:center; }
          }
          .menu-head {
            display:flex;
            flex-wrap:wrap;
            gap:16px;
            align-items:flex-start;
            justify-content:space-between;
            margin-bottom:var(--section-intro-gap);
          }
          .menu-head-text {
            flex:1 1 0;
            min-width:0;
            width:100%;
          }
          .menu-head-title {
            margin:0 0 24px;
            width:100%;
          }
          .menucard-shell {
            flex:0 0 auto;
            align-self:stretch;
            display:flex;
            flex-direction:column;
            padding:32px;
            border-radius:50px;
            background:#fff;
            box-shadow:var(--shadow-sm);
            transition:box-shadow .2s var(--ease), transform .2s var(--ease);
            cursor:pointer;
          }
          .menucard {
            display:flex;
            flex-direction:column;
            flex:1;
            flex-shrink:0;
            gap:24px;
            min-height:0;
            cursor:pointer;
          }
          @media (min-width:641px) {
            .menucard-shell:hover {
              box-shadow:var(--shadow-lg);
              transform:translateY(-3px);
            }
          }
          .menucard-img {
            width:100%;
            aspect-ratio:4/3;
            object-fit:cover;
            border-radius:16px;
            transition:transform .4s var(--ease);
          }
          .menucard-body {
            flex:1;
            display:flex;
            flex-direction:column;
            min-height:0;
          }
          .menucard-shell:hover .menucard-img { transform:scale(1.03); }
          .menucard-meta {
            margin:0 0 16px;
            display:flex;
            flex-wrap:wrap;
            align-items:center;
            gap:0 0.35em;
            font-size:var(--fs-14);
            font-weight:500;
            color:var(--stone);
            line-height:1.4;
          }
          .menucard-title {
            margin:4px 0 0;
            flex:1;
            font-weight:600;
            font-size:var(--fs-16);
            line-height:1.35;
            color:var(--primary);
          }
          .menu-note {
            display:flex;
            align-items:flex-start;
            gap:8px;
            margin:0;
            font-size:var(--fs-14);
            text-align:left;
          }
        `)
      ),

      createElement(MealDetailModal, {
        meal: selectedMeal,
        onClose: () => setSelectedMeal(null),
      })
    )
  );
}

/* ---------------- Customers (testimonial.to embed) ---------------- */
function Customers({ t }) {
  const IFRAME_ID = 'testimonialto-18515f72-5509-4309-8a4f-cb37ce8b672c';
  const EMBED_ID = '18515f72-5509-4309-8a4f-cb37ce8b672c';
  useTestimonialIframe(IFRAME_ID);

  return (
    createElement('section', { className:'section section--yellow', id:'reviews', style:{ paddingBottom:'clamp(var(--space-48), 6vw, var(--space-80))' } },
      createElement('div', { className:'wrap' },
        createElement('div', { className:'center reveal section-intro--sm' },
          createElement('div', { className:'eyebrow', style:{ color:'var(--plum-700)' } }, t.customers.eyebrow),
          createElement('h2', { className:'h2', style:{ margin:0, color:'var(--plum-800)' } }, t.customers.title)
        ),
        createElement('div', { className:'testimonial-wrapper reveal' },
          createElement('iframe', {
            id:IFRAME_ID,
            src:`https://embed-v2.testimonial.to/carousel/all/themeal?id=${EMBED_ID}`,
            frameBorder:'0', scrolling:'no', width:'100%', height:'960',
            title:t.customers.title,
          })
        )
      )
    )
  );
}

/* ---------------- Fresh (+ inside-the-kitchen carousel) ---------------- */
function Fresh({ t }) {
  const ic = [Icon.snow, Icon.truck, Icon.shield, Icon.leaf];
  const shots = [
    '/landing-stas/assets/gallery/g1.png',
    '/landing-stas/assets/gallery/g2.png',
    '/landing-stas/assets/gallery/g3.png',
    '/landing-stas/assets/gallery/g4.png',
    '/landing-stas/assets/gallery/g5.png',
  ];
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);
  const touchStartXRef = useRef(null);
  const SWIPE_THRESHOLD = 48;
  const startAuto = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (shots.length < 2) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    timerRef.current = setInterval(() => setIdx(i => (i + 1) % shots.length), 3200);
  };
  useEffect(() => {
    startAuto();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);
  const go = (delta) => {
    if (shots.length < 2) return;
    setIdx(i => (i + delta + shots.length) % shots.length);
    startAuto();
  };
  const onCarouselTouchStart = (e) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  };
  const onCarouselTouchEnd = (e) => {
    const startX = touchStartXRef.current;
    touchStartXRef.current = null;
    if (startX == null) return;
    const endX = e.changedTouches[0]?.clientX;
    if (endX == null) return;
    const delta = endX - startX;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    go(delta > 0 ? -1 : 1);
  };
  return (
    createElement('section', { className:'section section--white', id:'fresh' },
      createElement('div', { className:'wrap' },
        createElement('div', { className:'fresh-grid', style:{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:'clamp(32px,5vw,72px)', alignItems:'start' } },
        /* carousel */
        createElement('div', { className:'reveal', style:{ position:'relative' } },
          createElement('div', {
            style: {
              position:'relative', borderRadius:'var(--r-2xl)', overflow:'hidden', boxShadow:'var(--shadow-lg)',
              aspectRatio:'4/5', background:'var(--cream-2)', touchAction:'pan-y',
            },
            onTouchStart: onCarouselTouchStart,
            onTouchEnd: onCarouselTouchEnd,
          },
            shots.map((src,i)=>
              createElement('img', { key:i, src, alt:'', loading:i?'lazy':'eager',
                style:{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:i===idx?1:0, transition:'opacity .8s var(--ease)' } })
            ),
            createElement('div', { style:{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(34,10,56,.55), transparent 45%)', pointerEvents:'none' } }),
            /* inside the kitchen caption */
            createElement('div', { className:'row', style:{ position:'absolute', top:16, insetInlineStart:16, gap:8, background:'rgba(34,10,56,.55)', backdropFilter:'blur(8px)', color:'#fff', borderRadius:'var(--r-pill)', padding:'8px 14px', fontSize:'var(--fs-12)', fontWeight:700, letterSpacing:'.04em', textTransform:'uppercase' } },
              createElement(Icon.flame,{size:15}), t.gallery.eyebrow),
            createElement('button', { type:'button', className:'fresh-carousel-nav fresh-carousel-nav--prev', 'aria-label':'Previous slide', onClick:()=>go(-1) },
              createElement('span', { className:'fresh-carousel-nav__icon' },
                createElement(Icon.arrow, { size:20, style:{ transform:'scaleX(-1)' } }))),
            createElement('button', { type:'button', className:'fresh-carousel-nav fresh-carousel-nav--next', 'aria-label':'Next slide', onClick:()=>go(1) },
              createElement('span', { className:'fresh-carousel-nav__icon' },
                createElement(Icon.arrow, { size:20 }))),
            /* dots */
            createElement('div', { className:'row', style:{ position:'absolute', bottom:16, insetInlineStart:16, gap:7 } },
              shots.map((_,i)=>createElement('button', { key:i, 'aria-label':`${i+1}`, onClick:()=>{ setIdx(i); startAuto(); },
                style:{ width:i===idx?22:8, height:8, borderRadius:'var(--r-pill)', background:i===idx?'var(--yellow)':'rgba(255,255,255,.55)', transition:'all .3s var(--ease)' } })))
          ),
          createElement('div', { className:'row', style:{ position:'absolute', insetInlineEnd:-14, bottom:24, gap:10, background:'#fff', borderRadius:'var(--r-pill)', padding:'12px 18px', boxShadow:'var(--shadow-lg)', color:'var(--blue)', fontWeight:700, fontSize:'var(--fs-16)' } },
            createElement('span', { style:{ width:10, height:10, borderRadius:'50%', background:'var(--blue-bright)', boxShadow:'0 0 0 4px var(--blue-soft)' } }), t.fresh.badge)
        ),
        createElement('div', { className:'fresh-copy' },
          createElement('div', { className:'eyebrow reveal' }, t.fresh.eyebrow),
          createElement('h2', { className:'h2 reveal', style:{ margin:'0 0 var(--section-intro-gap)' } }, t.fresh.title),
          createElement('ul', { className:'stack', style:{ listStyle:'none', margin:0, padding:0, gap:'var(--space-24)' } },
            t.fresh.items.map((it,i)=>createElement('li', { key:i, className:'row reveal', 'data-d':String((i%3)+1), style:{ gap:16, alignItems:'center' } },
              createElement('span', { style:{ flex:'0 0 auto', width:44, height:44, borderRadius:'var(--r-md)', background:'var(--brand-soft)', color:'var(--brand)', display:'grid', placeItems:'center' } }, createElement(ic[i], { size:22 })),
              createElement('p', { style:{ margin:0, fontSize:'var(--fs-16)', color:'var(--slate)', fontWeight:600, lineHeight:1.45, paddingTop:0 } }, it)))
          )
        )
        )
      )
    )
  );
}

/* ---------------- LeadCapture (WhatsApp) ---------------- */
function LeadTitleWhatsAppIcon() {
  return createElement('span', {
    className: 'lead-title-wa-icon',
    style: { flexShrink: 0, display: 'inline-flex', width: 22, height: 22 },
    'aria-hidden': true,
  },
    createElement('svg', {
      width: 22,
      height: 22,
      viewBox: '0 0 29 30',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
    },
      createElement('path', {
        d: 'M0.613321 14.9917C0.612649 17.4502 1.24654 19.8507 2.45188 21.9665L0.498047 29.1957L7.79858 27.2559C9.81782 28.3698 12.0802 28.9535 14.3793 28.9536H14.3853C21.9749 28.9536 28.153 22.6952 28.1563 15.0027C28.1577 11.2752 26.7266 7.77006 24.1263 5.13298C21.5265 2.49614 18.0688 1.04321 14.3847 1.0415C6.79424 1.0415 0.616566 7.29962 0.613433 14.9917',
        fill: '#25D366',
      }),
      createElement('path', {
        d: 'M0.119751 14.9882C0.118967 17.5351 0.775581 20.0215 2.0239 22.2131L0 29.7014L7.5623 27.692C9.64596 28.8433 11.992 29.4503 14.3791 29.4512H14.3853C22.2472 29.4512 28.6472 22.9676 28.6506 14.9998C28.6519 11.1383 27.1693 7.50716 24.4761 4.77561C21.7826 2.0444 18.2013 0.539185 14.3853 0.537598C6.52204 0.537598 0.122884 7.02028 0.119751 14.9882ZM4.62338 21.8356L4.34101 21.3814C3.15403 19.4688 2.52752 17.2586 2.52842 14.9891C2.53088 8.36637 7.84959 2.97824 14.3898 2.97824C17.557 2.9796 20.5335 4.23077 22.7723 6.50085C25.011 8.77114 26.2428 11.7891 26.242 14.9989C26.2391 21.6216 20.9203 27.0104 14.3853 27.0104H14.3806C12.2527 27.0093 10.1658 26.4302 8.34583 25.3359L7.91271 25.0756L3.42509 26.2679L4.62338 21.8356Z',
        fill: '#fff',
      }),
      createElement('path', {
        d: 'M10.8199 8.94697C10.5529 8.34554 10.2718 8.3334 10.0179 8.32286C9.80995 8.31378 9.57224 8.31446 9.33476 8.31446C9.09705 8.31446 8.71082 8.40508 8.38436 8.7663C8.05757 9.12786 7.13672 10.0016 7.13672 11.7787C7.13672 13.5557 8.41402 15.2732 8.59208 15.5145C8.77036 15.7553 11.0579 19.5187 14.6809 20.9666C17.6919 22.1698 18.3046 21.9305 18.9581 21.8701C19.6117 21.81 21.0671 20.9966 21.364 20.1532C21.6611 19.3098 21.6611 18.5869 21.572 18.4359C21.4829 18.2854 21.2452 18.195 20.8888 18.0144C20.5323 17.8339 18.7798 16.9599 18.4531 16.8394C18.1264 16.7189 17.8888 16.6588 17.651 17.0205C17.4133 17.3816 16.7308 18.195 16.5227 18.4359C16.3149 18.6773 16.1068 18.7074 15.7505 18.5267C15.3938 18.3455 14.2459 17.9645 12.884 16.7341C11.8243 15.7767 11.109 14.5944 10.901 14.2327C10.6931 13.8716 10.8788 13.6758 11.0575 13.4958C11.2176 13.334 11.4141 13.0741 11.5924 12.8632C11.7702 12.6523 11.8295 12.5018 11.9483 12.2609C12.0673 12.0198 12.0078 11.8088 11.9188 11.6282C11.8295 11.4475 11.1368 9.66113 10.8199 8.94697Z',
        fill: '#fff',
      }),
    ),
  );
}

function leadTitleWordSpans(title) {
  const words = title.split(/\s+/);
  return words.map((word, i) => {
    if (word === 'WhatsApp') {
      return createElement('span', {
        key: `wa-${i}`,
        className: 'lead-title-wa',
      },
        createElement('span', null, word),
        createElement(LeadTitleWhatsAppIcon),
      );
    }
    return createElement('span', { key: i }, word);
  });
}

function LeadCapture({ t, onWhatsAppClick, onContinue, onResetPhone, isPhoneVerified = false }) {
  const [error, setError] = useState('');
  const [phone, setPhone] = useState('');
  const l = t.lead;
  const handleResetPhone = () => {
    setPhone('');
    setError('');
    onResetPhone?.();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const result = validateUaePhone(phone);
    if (!result.isValid) {
      setError(result.error);
      return;
    }
    const normalized = normalizeUaePhone(phone);
    if (normalized && onWhatsAppClick) {
      onWhatsAppClick(normalized);
    }
  };
  return (
    createElement('section', { className:'section section--cream lead-section', id:'lead', style:{ paddingTop:0, paddingBottom:'clamp(var(--space-64), 8vw, var(--space-96))' } },
      createElement('div', { className:'wrap' },
        createElement('div', { className:'reveal lead-card', style:{
          position:'relative', overflow:'hidden', borderRadius:'var(--r-2xl)',
          backgroundColor:'var(--card)',
          boxShadow:'var(--shadow-md)', border:'none',
        } },
          createElement('div', { style:{ position:'absolute', top:-60, insetInlineEnd:-40, width:240, height:240, borderRadius:'50%', background:'radial-gradient(circle, rgba(154,56,239,.18), transparent 70%)', pointerEvents:'none' } }),
          createElement('div', { className:'lead-grid' },
            createElement('div', { className:'stack lead-text', style:{ gap:'var(--space-24)' } },
              createElement('div', { className:'stack lead-copy', style:{ gap:'var(--space-12)' } },
                createElement('h3', { className:'h3 row lead-title', style:{ margin:0, gap:4, width:'100%' } },
                  ...leadTitleWordSpans(l.title)),
                createElement('p', { className:'lead', style:{ margin:'0 0 var(--space-4)', width:'100%' } }, l.sub),
                createElement('span', { className:'muted', style:{ fontSize:'var(--fs-14)' } }, l.fine)),
              createElement('span', { className:'chip', style:{ alignSelf:'flex-start', background:'rgba(154,56,239,.12)', color:'var(--brand)', fontWeight:700, fontSize:'var(--fs-12)', letterSpacing:'.04em', textTransform:'uppercase', padding:'0 14px', height:32 } },
                l.eyebrow),
            ),

            createElement('div', { className:'stack', style:{ gap:12 } },
              isPhoneVerified
                ? createElement(Fragment, null,
                    createElement('div', { style:{ position:'relative', width:'100%' } },
                      createElement(TempPhoneResetButton, {
                        onClick: handleResetPhone,
                        style:{ position:'absolute', top:0, insetInlineEnd:0 },
                      }),
                      createElement('p', { className:'lead', style:{ margin:0, textAlign:'center', fontWeight:600, paddingInline:'32px' } }, l.done),
                      createElement('p', { className:'muted', style:{ fontSize:'var(--fs-14)', textAlign:'center', margin:'8px 0 0' } }, l.doneSub)),
                      createElement('button', { type:'button', className:'btn btn-primary lead-form-submit', style:{ minHeight:58 }, onClick: onContinue }, l.continueCta))
                : createElement(Fragment, null,
                    createElement('form', { className:'lead-form', onSubmit: handleSubmit },
                      createElement(PhoneInput, {
                        id: 'lead-phone',
                        value: phone,
                        onChange: (v) => { setPhone(formatUaePhoneInput(v)); setError(''); },
                        error: error,
                        placeholder: l.ph,
                      }),
                      createElement('button', { type:'submit', className:'btn btn-primary lead-form-submit', style:{ minHeight:58 } }, l.cta)),
                    createElement('span', { className:'muted', style:{ fontSize:'var(--fs-14)', textAlign:'center' } }, l.hint)))
          )
        )
      )
    )
  );
}


export { Menu, Customers, Fresh, LeadCapture };
