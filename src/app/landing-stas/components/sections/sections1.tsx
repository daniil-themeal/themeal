// @ts-nocheck
import { createElement, Fragment, useState, useEffect, useRef } from 'react';
import { Icon, Logo, Stars, Social } from '../icons';
import { HeroStats } from '../HeroStats';

/* ---------------- Header (scroll + cursor reveal — Bender) ---------------- */
function Header({ t, lang, setLang, onOrder, dark }) {
  const [shown, setShown] = useState(true);
  const [solid, setSolid] = useState(false);
  const [hovered, setHovered] = useState(false);
  const last = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      if (y === 0) setShown(true);
      else setShown(y < last.current);
      last.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const visible = shown || hovered;
  const onDark = true;
  const txt = solid ? 'rgba(255,255,255,.82)' : 'rgba(255,255,255,.85)';
  const links = [['#menu', t.nav.menu], ['#delivery', t.nav.delivery], ['#qa', t.nav.qa]];

  return (
    createElement('div', { style:{ position:'fixed', insetInline:0, top:0, zIndex:50, pointerEvents:'none' } },
      createElement('div', {
        style:{ position:'absolute', insetInline:0, top:0, height:8, pointerEvents:'auto' },
        onMouseEnter:()=>setHovered(true),
      }),
      createElement('header', {
        onMouseEnter:()=>setHovered(true),
        onMouseLeave:()=>setHovered(false),
        style:{
          pointerEvents:'auto',
          transform: visible ? 'translateY(0)' : 'translateY(-105%)',
          transition:'transform .32s var(--ease), background .3s, box-shadow .3s',
          background: solid ? 'rgba(46,15,74,.82)' : 'transparent',
          backdropFilter: solid ? 'saturate(1.4) blur(14px)' : 'none',
          boxShadow: solid ? 'inset 0 -1px 0 rgba(255,255,255,.1)' : 'none',
        }
      },
      createElement('div', { className:'wrap row', style:{ height:64, gap:24, justifyContent:'space-between' } },
        createElement('a', { href:'#top', className:'row hdr-logo' },
          createElement(Logo, { tone: 'yellow' })
        ),
        createElement('nav', { className:'row hdr-nav', style:{ fontWeight:600, fontSize:'var(--fs-16)', color:txt } },
          links.map(([h, l]) => createElement('a', {
            key:h, href:h, className:'navlink',
            style:{ color:txt, transition:'color .15s' },
            onMouseEnter:(e)=>e.target.style.color = onDark ? '#fff' : 'var(--brand)',
            onMouseLeave:(e)=>e.target.style.color = txt,
          }, l))
        ),
        createElement('div', { className:'hdr-profile' },
          createElement('button', {
            type:'button',
            title:t.nav.signin, 'aria-label':t.nav.signin,
            className:'hdr-profile-btn',
          },
            createElement('span', { className:'hdr-profile-icon' },
              createElement(Icon.user,{size:20})
            )
          )
        )
      )
    )
    )
  );
}

/* ---------------- TrayBelt: looping conveyor shaped as a fan ---------------- */
function TrayBelt({ meals }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const imgs = Array.from(track.querySelectorAll('img'));
    let metas = [], halfW = 1;
    const measure = () => {
      metas = imgs.map(im => ({ im, l: im.offsetLeft, w: im.offsetWidth }));
      halfW = track.scrollWidth / 2;
    };
    measure();
    imgs.forEach(im => {
      if (!im.complete) im.addEventListener('load', measure, { once: true });
    });
    window.addEventListener('resize', measure);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const speed = 26; // px per second
    let offset = 0, last = performance.now(), raf = 0, frames = 0;

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05); last = now;
      if (!reduced && halfW > 0) {
        offset += -speed * dt;
        if (offset <= -halfW) offset += halfW;
        track.style.transform = `translateX(${offset}px)`;
      }
      const rect = track.getBoundingClientRect();
      const cx = window.innerWidth / 2;
      for (const m of metas) {
        const x = rect.left + m.l + m.w / 2;
        let t = (x - cx) / cx;
        t = Math.max(-1.2, Math.min(1.2, t));
        m.im.style.transform = `translateY(${-3.6 + 25.2 * t * t}px) rotate(${6.75 * t}deg)`;
      }
      frames++;
      if (reduced && frames > 2) return; // static fan for reduced motion
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
      imgs.forEach(im => im.removeEventListener('load', measure));
    };
  }, [meals]);

  return (
    createElement('div', { 'aria-hidden':true, dir:'ltr', style:{ position:'relative', zIndex:1, height:'clamp(198px,25.2vh,270px)', marginTop:-6, overflow:'hidden' } },
      createElement('div', { ref:trackRef, style:{ position:'absolute', bottom:13, left:0, display:'flex', alignItems:'flex-end', width:'max-content', willChange:'transform' } },
        [0,1].map(half =>
          createElement('div', { key:half, style:{ display:'flex', alignItems:'flex-end', gap:'clamp(14px,2.16vw,32px)', paddingInlineEnd:'clamp(14px,2.16vw,32px)' } },
            Array.from({length:15}).map((_,i)=>
              createElement('img', {
                key:`${half}-${i}`, src:meals[i % meals.length], alt:'',
                style:{
                  width:'clamp(135px, 15.3vw, 225px)',
                  transform:`translateY(${[18,5,-2,5,18][i%5]}px) rotate(${[-6,-3,0,3,6][i%5]}deg)`,
                  filter:'drop-shadow(0 16px 27px rgba(0,0,0,.4))',
                }
              })
            )
          )
        )
      )
    )
  );
}

/* ---------------- Hero ---------------- */
function Hero({ t, onOrder }) {
  const meals = ['/landing-stas/assets/meals/meal-01.avif','/landing-stas/assets/meals/meal-03.avif','/landing-stas/assets/meals/meal-05.avif','/landing-stas/assets/meals/meal-07.avif','/landing-stas/assets/meals/meal-09.avif','/landing-stas/assets/meals/meal-11.avif'];
  return (
    createElement('section', { id:'top', style:{
      background:'radial-gradient(120% 90% at 50% -10%, #5A2487 0%, var(--plum-700) 45%, var(--plum-900) 100%)',
      color:'#fff', position:'relative', overflow:'hidden', minHeight:'100svh',
      display:'flex', flexDirection:'column', paddingTop:96,
    } },
      /* soft glow blobs */
      createElement('div', { style:{ position:'absolute', top:'-10%', insetInlineEnd:'-8%', width:480, height:480, borderRadius:'50%', background:'radial-gradient(circle, rgba(154,56,239,.5), transparent 70%)', filter:'blur(20px)', pointerEvents:'none' } }),
      createElement('div', { style:{ position:'absolute', bottom:'18%', insetInlineStart:'-10%', width:420, height:420, borderRadius:'50%', background:'radial-gradient(circle, rgba(240,41,168,.28), transparent 70%)', filter:'blur(20px)', pointerEvents:'none' } }),

      createElement('div', { className:'wrap', style:{ position:'relative', zIndex:2, flex:1, display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', justifyContent:'center', gap:'clamp(var(--space-12), 2vh, var(--space-24))', paddingBottom:'var(--space-20)' } },
        /* headline merged with the price offer */
        createElement('h1', { className:'hero-title reveal' },
          createElement('span', { className:'hero-title__line' }, t.hero.title),
          createElement('span', { className:'hero-title__offer' },
            createElement('span', { className:'hero-title__only' }, t.hero.only),
            createElement('span', { className:'hero-title__price' },
              createElement('span', { className:'hero-title__was mono' }, t.hero.was),
              createElement('span', { className:'hero-title__now' }, t.hero.now),
              createElement('span', { className:'hero-title__cur' }, t.hero.cur)))),

        /* cta + price-per-day */
        createElement('div', { className:'reveal', 'data-d':'2', style:{ marginTop:2 } },
          createElement('button', {
            className:'btn btn-primary menu-head-cta',
            onClick:onOrder,
            style:{
              flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'var(--space-8)',
              whiteSpace:'normal', textAlign:'center',
            },
          },
            createElement('span', { className:'stack', style:{ alignItems:'center', gap:'var(--space-8)' } },
              t.hero.cta,
              createElement('span', { className:'mono', style:{ fontSize:'var(--fs-14)', fontWeight:500, opacity:.92 } }, t.hero.ctaSub))
          )
        ),

        createElement(HeroStats, { stats:t.hero.stats, className:'reveal hero-stats', style:{ marginTop:24 }, dataD:'3' })
      ),

      /* conveyor of meal trays — seamless loop shaped as a fan/arc */
      createElement(TrayBelt, { meals }),
    )
  );
}

/* ---------------- Compare (problem / solution) ---------------- */
const compareIconSize = '40px';
const compareMarkSize = 26;
const compareMarkIcon = 16;

function CompareIcon({ src }) {
  return createElement('span', {
    style: {
      flex: '0 0 auto',
      width: compareIconSize,
      height: compareIconSize,
      display: 'block',
    },
  }, createElement('img', {
    src,
    alt: '',
    style: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  }));
}

function CompareMark({ kind }) {
  const isCheck = kind === 'check';
  return createElement('span', {
    style: {
      flex: '0 0 auto',
      width: compareMarkSize,
      height: compareMarkSize,
      borderRadius: '50%',
      background: isCheck ? 'var(--green-bright)' : '#EC221F',
      color: isCheck ? 'var(--plum-800)' : '#fff',
      display: 'grid',
      placeItems: 'center',
      boxShadow: isCheck ? 'none' : 'var(--shadow-sm)',
    },
  }, createElement(isCheck ? Icon.check : Icon.x, { size: isCheck ? compareMarkIcon : 15, sw: isCheck ? 2.4 : undefined }));
}

function Compare({ t }) {
  return (
    createElement('section', { className:'section section--cream', id:'why' },
      createElement('div', { className:'wrap' },
        createElement('div', { className:'center reveal section-intro', style:{ maxWidth:760, marginInline:'auto' } },
          createElement('div', { className:'eyebrow' }, t.compare.eyebrow),
          createElement('h2', { className:'h2', style:{ margin:0 } }, t.compare.title)
        ),
        createElement('div', { className:'grid-12 compare-cards', style:{ alignItems:'stretch' } },
          /* problems */
          createElement('div', { className:'card reveal', style:{ padding:'24px 32px 32px', background:'var(--cream-2)', boxShadow:'none' } },
            createElement('div', { className:'compare-card-head compare-card-head--problems' }, t.compare.problemsTitle),
            createElement('ul', { className:'stack', style:{ listStyle:'none', margin:0, padding:0, gap:16 } },
              t.compare.problems.map((p,i)=>createElement('li', { key:i, className:'row', style:{ gap:14, width:'100%', alignItems:'center', color:'var(--slate)', fontWeight:600, fontSize:'var(--fs-16)' } },
                createElement(CompareIcon, { src:p.icon }),
                createElement('span', { style:{ flex:1, minWidth:0 } }, p.text),
                createElement(CompareMark, { kind:'x' })
              ))
            ),
          ),
          /* solutions */
          createElement('div', { className:'card reveal', 'data-d':'1', style:{ padding:'24px 32px 32px', background:'var(--plum-700)', color:'#fff', boxShadow:'var(--shadow-lg)', position:'relative', overflow:'visible' } },
            createElement('div', { className:'compare-card-head compare-card-head--solutions' },
              createElement('span', { className:'compare-card-head__badge' }, t.compare.bestShort, ' 🔥'),
              createElement(Logo, { tone: 'yellow' })),
            createElement('ul', { className:'stack', style:{ listStyle:'none', margin:0, padding:0, gap:16 } },
              t.compare.solutions.map((s,i)=>createElement('li', { key:i, className:'row', style:{ gap:14, width:'100%', alignItems:'center', fontWeight:600, fontSize:'var(--fs-16)' } },
                createElement(CompareIcon, { src:s.icon }),
                createElement('span', { style:{ flex:1, minWidth:0 } }, s.text),
                createElement(CompareMark, { kind:'check' })
              ))
            )
          )
        ),
        /* price — cost per meal (compact) */
        t.compare.compare && createElement('div', { className:'card reveal', style:{ background:'#fff', padding:'clamp(var(--space-24), 3vw, var(--space-32))', paddingTop:'20px', marginTop:'var(--space-24)', height:'fit-content' } },
          createElement('div', { style:{ marginBottom:'var(--space-8)' } },
            createElement('span', { className:'label', style:{ color:'var(--stone)', fontSize:'14px', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase' } }, t.compare.costTitle)),
          createElement('div', { className:'compare-cost-grid' },
            t.compare.compare.map((c,i)=>createElement('div', { key:i, className:'stack' },
              createElement('span', { style:{ fontSize:'var(--fs-16)', fontWeight:600, color: c.hot?'var(--brand)':'#8A8694', display:'flex', alignItems:'center', gap:6 } },
                c.hot ? [createElement(Logo,{key:'l',height:16.8,color:'#9A38EF',accent:'#9A38EF'}), createElement('span',{key:'b',style:{color:'var(--pink)'}}, '★')] : c.k),
              createElement('span', { style:{ fontSize:'var(--fs-16)', fontWeight: c.hot ? 900 : 600, color: c.hot ? 'var(--brand)' : 'var(--slate)' } }, c.v)))
          )
        ),
        createElement('style', null, `
          #why .card {
            border-radius:50px;
          }
          #why .compare-card-head {
            display:flex;
            align-items:center;
            gap:10px;
            min-height:26px;
            margin-bottom:var(--space-24);
          }
          #why .compare-card-head--problems {
            color:var(--stone);
            font-weight:700;
            font-size:14px;
            line-height:1;
            letter-spacing:.08em;
            text-transform:uppercase;
          }
          #why .compare-card-head--solutions {
            justify-content:space-between;
          }
          #why .compare-card-head__badge {
            color:var(--yellow);
            font-weight:700;
            font-size:16px;
            line-height:1;
            text-align:start;
          }
        `)
      )
    )
  );
}

/* ---------------- How it works (themed SVG illustrations) ---------------- */
function HowIllu({ i }) {
  const S = (props, ...kids) => createElement('svg', Object.assign({ viewBox:'0 0 220 168', width:'72%', style:{ maxWidth:230, overflow:'visible' }, 'aria-hidden':true }, props), ...kids);
  const P = (d, o={}) => createElement('path', Object.assign({ d, fill:'none', strokeLinecap:'round', strokeLinejoin:'round' }, o));
  const C = (cx,cy,r,o={}) => createElement('circle', Object.assign({ cx,cy,r }, o));
  if (i === 0) { // We cook — pot + steam + flame
    return S(null,
      // steam
      P('M92 44 q -9 -12 0 -24', { stroke:'var(--brand)', strokeWidth:5, opacity:.45 }),
      P('M110 40 q -10 -13 0 -26', { stroke:'var(--brand)', strokeWidth:5, opacity:.55 }),
      P('M128 44 q -9 -12 0 -24', { stroke:'var(--brand)', strokeWidth:5, opacity:.45 }),
      // handles
      P('M58 104 a14 14 0 0 0 -16 14', { stroke:'var(--plum-700)', strokeWidth:9 }),
      P('M162 104 a14 14 0 0 1 16 14', { stroke:'var(--plum-700)', strokeWidth:9 }),
      // body
      createElement('rect', { x:60, y:86, width:100, height:60, rx:16, fill:'var(--plum-700)' }),
      createElement('rect', { x:60, y:104, width:100, height:8, fill:'rgba(255,255,255,.12)' }),
      // lid
      createElement('ellipse', { cx:110, cy:84, rx:58, ry:13, fill:'var(--brand)' }),
      C(110,70,7,{ fill:'var(--yellow)' }),
      // flame
      P('M110 150 c -10 -7 -10 -19 0 -26 c 3 7 7 7 7 14 a 7 7 0 0 1 -14 5 z', { fill:'var(--pink)', stroke:'none' })
    );
  }
  if (i === 1) { // We deliver — van + route + pin
    return S(null,
      // route
      P('M22 132 q 40 -28 80 -8 t 84 -34', { stroke:'var(--brand)', strokeWidth:4, strokeDasharray:'2 11', opacity:.5 }),
      // pin
      P('M176 36 c 13 0 22 10 22 22 c 0 14 -22 30 -22 30 s -22 -16 -22 -30 c 0 -12 9 -22 22 -22 z', { fill:'var(--green)', stroke:'none' }),
      C(176,58,7,{ fill:'#fff' }),
      // van body
      createElement('rect', { x:30, y:96, width:86, height:42, rx:8, fill:'var(--plum-700)' }),
      // cab
      P('M116 104 h26 l20 18 v16 h-46 z', { fill:'var(--brand)', stroke:'none' }),
      createElement('rect', { x:122, y:108, width:20, height:14, rx:3, fill:'rgba(255,255,255,.35)' }),
      // box on side
      createElement('rect', { x:44, y:104, width:26, height:26, rx:4, fill:'var(--yellow)' }),
      P('M44 117 h26 M57 104 v26', { stroke:'rgba(0,0,0,.18)', strokeWidth:2 }),
      // wheels
      C(58,142,12,{ fill:'#2A2230' }), C(58,142,5,{ fill:'#fff' }),
      C(140,142,12,{ fill:'#2A2230' }), C(140,142,5,{ fill:'#fff' })
    );
  }
  return S(null, // You eat — plate + cutlery + steam + heart
    // steam
    P('M96 40 q -8 -11 0 -22', { stroke:'var(--brand)', strokeWidth:4.5, opacity:.4 }),
    P('M124 40 q -8 -11 0 -22', { stroke:'var(--brand)', strokeWidth:4.5, opacity:.4 }),
    // heart
    P('M150 44 c 4 -7 16 -5 16 4 c 0 7 -10 13 -16 18 c -6 -5 -16 -11 -16 -18 c 0 -9 12 -11 16 -4 z', { fill:'var(--pink)', stroke:'none' }),
    // plate
    C(110,108,46,{ fill:'var(--plum-700)' }),
    C(110,108,33,{ fill:'none', stroke:'rgba(255,255,255,.35)', strokeWidth:2 }),
    C(110,108,18,{ fill:'var(--green-bright)' }),
    // fork
    P('M50 78 v60 M44 78 v16 a6 6 0 0 0 12 0 v-16', { stroke:'var(--plum-700)', strokeWidth:5 }),
    // knife
    P('M170 78 c 10 4 10 30 0 34 v26', { stroke:'var(--plum-700)', strokeWidth:5 })
  );
}

function HowItWorks({ t }) {
  const cardBg = ['#FDF3FF', '#F6FBEF', 'var(--input-background)'];
  const stepColors = ['var(--brand)', 'var(--green)', 'var(--plum-700)'];
  return (
    createElement('section', { className:'section section--white', id:'how' },
      createElement('div', { className:'wrap' },
        createElement('div', { className:'center reveal section-intro', style:{ maxWidth:680, marginInline:'auto' } },
          createElement('div', { className:'eyebrow' }, t.how.eyebrow),
          createElement('h2', { className:'h2', style:{ margin:0 } }, t.how.title)
        ),
        createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:16 } },
          t.how.steps.map((s,i)=>createElement('div', { key:i, className:'card reveal', 'data-d':String(i+1), style:{ overflow:'hidden', background:cardBg[i], borderRadius:'50px', boxShadow:'none', color:'rgba(42, 34, 48, 1)' } },
            createElement('div', { style:{ position:'relative', aspectRatio:'5/4', overflow:'hidden', display:'grid', placeItems:'center' } },
              createElement('span', { className:'mono', style:{ position:'static', fontSize:'12px', fontWeight:500, color:stepColors[i], opacity:.7, marginInline:0, paddingInline:32, width:'100%' } }, s.n),
              createElement(HowIllu, { i })
            ),
            createElement('div', { style:{ padding:'var(--space-24) var(--space-32) 36px' } },
              createElement('h3', { className:'h3', style:{ margin:'0 0 var(--space-12)', color:'var(--ink)' } }, s.t),
              createElement('p', { style:{ margin:0, color:'var(--slate)', fontSize:'var(--fs-16)', lineHeight:1.5 } }, s.d))
          ))
        )
      )
    )
  );
}


export { Header, Hero, Compare, HowItWorks };
