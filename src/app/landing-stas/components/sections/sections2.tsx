// @ts-nocheck
import { createElement, Fragment, useState, useEffect, useRef } from 'react';
import { normalizeUaePhone, validateUaePhone } from '../../../components/checkout/phoneValidation';
import { MealDetailModal } from '../../../components/checkout/MealDetailModal';
import { buildMealDetail } from '../../../data/testMeals';
import { useTestimonialIframe } from '../../useTestimonialIframe';
import { useHorizontalScroll } from '../../useHorizontalScroll';
import { Icon, Logo, Stars, Social } from '../icons';

/* ---------------- Weekly menu ---------------- */
function Menu({ t, onOrder }) {
  const dayKeys = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const [day, setDay] = useState(0);
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

  useEffect(() => {
    menuGridScroll.resetScroll();
  }, [day]);

  useEffect(() => {
    setSelectedMeal(null);
  }, [day]);

  return (
    createElement('section', { className:'section section--cream menu-section', id:'menu', style:{ paddingBottom:'clamp(var(--space-48), 6vw, var(--space-80))' } },
      createElement('div', { className:'wrap' },
        createElement('div', { className:'eyebrow menu-eyebrow reveal' }, t.menu.eyebrow),
        createElement('div', { className:'menu-head reveal' },
          createElement('div', { className:'menu-head-text' },
            createElement('h2', { className:'h2 menu-head-title' }, t.menu.title),
            createElement('p', { className:'row menu-head-trusted', style:{ gap:8, margin:0, color:'var(--pink)', fontWeight:600, fontSize:'var(--fs-16)' } }, createElement(Icon.heart,{size:18,fill:'currentColor',sw:0}), t.menu.trusted)
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
      createElement('div', {
        ref: dayTabsScroll.ref,
        onMouseDown: dayTabsScroll.onMouseDown,
        className:'menu-days no-scrollbar h-scroll gutter-x reveal',
      },
        t.menu.days.map((d,i)=>createElement('button', {
          key:i,
          className:`menu-day-tab${i===day ? ' is-active' : ''}`,
          onClick: dayTabsScroll.guardClick(() => setDay(i)),
        }, d))
      ),

      /* meal cards — full-bleed scroll on mobile; grid in .wrap-width container on desktop */
      createElement('div', { className:'menu-grid-wrap reveal' },
        createElement('div', {
          ref: menuGridScroll.ref,
          onMouseDown: menuGridScroll.onMouseDown,
          className:'menu-grid-shell no-scrollbar h-scroll reveal',
        },
          createElement('div', { className:'menu-grid menu-grid--cards' },
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
                  createElement('p', { className:'menucard-meta' }, `${meta[i].kcal} ccal • ${meta[i].g} g ${t.menu.slots[i]}`),
                  createElement('p', { className:'menucard-title' }, m))
              )
            ))
          )
        )
      ),

      createElement('div', { className:'wrap', style:{ height:'fit-content' } },
        createElement('p', { className:'menu-note muted reveal' },
          createElement(Icon.check, { size:18, sw:2.6, style:{ color:'var(--green)', flexShrink:0, marginTop:1 } }),
          t.menu.note),
        createElement('style', null, `
          .menu-eyebrow { margin-bottom:var(--space-24); }
          @media (max-width: 640px) {
            .menu-eyebrow { text-align:center; }
          }
          .menu-head {
            display:flex;
            flex-wrap:wrap;
            gap:16px;
            align-items:flex-start;
            justify-content:space-between;
            margin-bottom:24px;
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
            padding:20px 24px 24px;
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
            gap:12px;
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
            margin:0;
            font-size:var(--fs-14);
            font-weight:500;
            color:var(--stone);
            line-height:1.4;
          }
          .menucard-title {
            margin:4px 0 0;
            flex:1;
            font-weight:700;
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
    '/landing-stas/assets/gallery/g3.avif',
    '/landing-stas/assets/production_2.avif',
    '/landing-stas/assets/gallery/g5.avif',
    '/landing-stas/assets/gallery/g6.avif',
    '/landing-stas/assets/production_1.avif',
  ];
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);
  const startAuto = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    timerRef.current = setInterval(() => setIdx(i => (i + 1) % shots.length), 3200);
  };
  useEffect(() => {
    startAuto();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);
  const go = (delta) => {
    setIdx(i => (i + delta + shots.length) % shots.length);
    startAuto();
  };
  return (
    createElement('section', { className:'section section--white', id:'fresh' },
      createElement('div', { className:'wrap' },
        createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:'clamp(32px,5vw,72px)', alignItems:'center' } },
        /* carousel */
        createElement('div', { className:'reveal', style:{ position:'relative' } },
          createElement('div', { style:{ position:'relative', borderRadius:'var(--r-2xl)', overflow:'hidden', boxShadow:'var(--shadow-lg)', aspectRatio:'4/5', background:'var(--cream-2)' } },
            shots.map((src,i)=>{
              const offset = i === 3 ? { top:0, left:-2 } : i === 4 ? { top:2, left:-201 } : { top:0, left:0 };
              return createElement('img', { key:i, src, alt:'', loading:i?'lazy':'eager',
                style:{ position:'absolute', top:offset.top, right:0, bottom:0, left:offset.left, width:'100%', height:'100%', objectFit:'cover', opacity:i===idx?1:0, transition:'opacity .8s var(--ease)' } });
            }),
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
        createElement('div', null,
          createElement('div', { className:'eyebrow reveal' }, t.fresh.eyebrow),
          createElement('h2', { className:'h2 reveal', style:{ margin:'0 0 var(--space-64)' } }, t.fresh.title),
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

/* ---------------- Gallery ---------------- */
function Gallery({ t }) {
  const imgs = ['/landing-stas/assets/gallery/g3.avif','/landing-stas/assets/production_2.avif','/landing-stas/assets/gallery/g5.avif','/landing-stas/assets/gallery/g6.avif','/landing-stas/assets/production_1.avif'];
  return (
    createElement('section', { className:'section section--cream2', id:'gallery' },
      createElement('div', { className:'wrap' },
        createElement('div', { className:'center reveal section-intro--sm' },
          createElement('div', { className:'eyebrow' }, t.gallery.eyebrow),
          createElement('h2', { className:'h2', style:{ margin:0 } }, t.gallery.title)
        )
      ),
      createElement('div', { className:'no-scrollbar reveal', style:{ display:'flex', gap:18, overflowX:'auto', paddingInline:'var(--gutter)', scrollSnapType:'x mandatory' } },
        imgs.map((src,i)=>createElement('div', { key:i, style:{ flex:'0 0 auto', width:'clamp(260px,40vw,440px)', aspectRatio:'16/10', borderRadius:'var(--r-xl)', overflow:'hidden', boxShadow:'var(--shadow-md)', scrollSnapAlign:'center' } },
          createElement('img', { src, alt:'', loading:'lazy', style:{ width:'100%', height:'100%', objectFit:'cover' } })))
      )
    )
  );
}

/* ---------------- LeadCapture (WhatsApp) ---------------- */
function LeadCapture({ t, onWhatsAppClick }) {
  const [error, setError] = useState('');
  const [phone, setPhone] = useState('');
  const l = t.lead;
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
        createElement('div', { className:'reveal', style:{
          position:'relative', overflow:'hidden', borderRadius:'var(--r-2xl)',
          backgroundColor:'var(--card)',
          padding:'clamp(var(--space-32), 4vw, var(--space-64))', boxShadow:'var(--shadow-md)', border:'none',
        } },
          createElement('div', { style:{ position:'absolute', top:-60, insetInlineEnd:-40, width:240, height:240, borderRadius:'50%', background:'radial-gradient(circle, rgba(154,56,239,.18), transparent 70%)', pointerEvents:'none' } }),
          createElement('div', { style:{ position:'relative', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'clamp(var(--space-24), 4vw, var(--space-64))', alignItems:'center' } },
            createElement('div', { className:'stack', style:{ gap:'var(--space-16)' } },
              createElement('span', { className:'chip', style:{ alignSelf:'flex-start', background:'rgba(154,56,239,.12)', color:'var(--brand)', fontWeight:700, fontSize:'var(--fs-12)', letterSpacing:'.04em', textTransform:'uppercase', padding:'7px 14px' } },
                createElement(Icon.whatsapp,{size:15}), l.eyebrow),
              createElement('h3', { className:'h3', style:{ margin:0 } }, l.title),
              createElement('p', { className:'lead', style:{ margin:0 } }, l.sub),
              createElement('span', { className:'muted', style:{ fontSize:'var(--fs-14)' } }, l.fine)),

            createElement('div', { className:'stack', style:{ gap:12 } },
                  createElement('form', { className:'lead-form', onSubmit: handleSubmit },
                    createElement('div', { className:'lead-form-fields' },
                      createElement('span', { className:'lead-form-prefix' },
                        createElement('span', { style:{ fontSize:'var(--fs-20)' } }, '🇦🇪'), l.cc),
                      createElement('input', { type:'tel', required:true, className:'lead-form-input', value:phone, onChange:(e)=>{ setPhone(e.target.value); setError(''); }, placeholder:l.ph, dir:'ltr' })),
                    createElement('button', { type:'submit', className:'btn btn-primary lead-form-submit', style:{ minHeight:58 } }, l.cta)),
                  error ? createElement('span', { style:{ fontSize:'var(--fs-14)', textAlign:'center', color:'var(--pink)' } }, error) : null,
                  createElement('span', { className:'muted', style:{ fontSize:'var(--fs-14)', textAlign:'center' } }, l.hint))
          )
        )
      )
    )
  );
}


export { Menu, Customers, Fresh, LeadCapture };
