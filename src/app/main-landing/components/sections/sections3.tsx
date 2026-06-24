// @ts-nocheck
import { createElement, Fragment, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { useHorizontalScroll } from '../../useHorizontalScroll';
import { landingFooterSocials } from '../../../config/socialLinks';
import { supportEmail } from '../../../config/siteLinks';
import { Icon, Logo, Stars, Social } from '../icons';
import { HeroStats } from '../HeroStats';

/* ---------------- Compare benefits ---------------- */
function Benefits({ t, onQuizClick }) {
  return (
    createElement('section', { className:'section section--cream', id:'benefits' },
      createElement('div', { className:'wrap' },
        createElement('div', { className:'section-stack' },
        createElement('div', { className:'center reveal section-intro', style:{ maxWidth:680, marginInline:'auto' } },
          createElement('div', { className:'eyebrow' }, t.benefits.eyebrow),
          createElement('h2', { className:'h2', style:{ margin:0 } }, t.benefits.title)
        ),
        createElement('div', { className:'grid-12 benefits-cards', style:{ alignItems:'stretch' } },
          t.benefits.cards.map((c,i)=>{
            const hot = c.k === 'meal';
            return createElement('div', { key:i, className:'card reveal', 'data-d':String(i+1), style:{
              padding:'var(--space-32) 28px var(--space-32)', display:'flex', flexDirection:'column', gap:'var(--space-40)',
              background: hot ? 'linear-gradient(155deg, #6E34A2 0%, #4C1F77 100%)' : '#fff', color: hot ? '#fff' : 'var(--ink)',
              boxShadow: hot ? 'var(--shadow-landing-lg)' : 'var(--shadow-landing-sm)',
              position:'relative', overflow:'hidden',
            } },
              hot && createElement('span', { className:'chip', style:{ position:'absolute', top:16, insetInlineEnd:16, background:'var(--pink)', color:'#fff', fontWeight:700, fontSize:'var(--fs-12)', padding:'6px 12px', whiteSpace:'nowrap', lineHeight:1, letterSpacing:'.02em' } }, t.benefits.bestL),
              createElement('div', null,
                createElement('h3', { className:'h3', style:{ margin:0, color: hot ? '#fff' : 'var(--ink)', display:'flex', alignItems:'baseline', gap:8, flexWrap:'wrap' } },
                  hot ? [c.t.replace(' theMeal',' ').trim(), createElement(Logo,{key:'l',height:'0.797em',style:{verticalAlign:'baseline',transform:'translateY(0.05em)'}})] : c.t),
                createElement('p', { style:{ margin:'var(--space-8) 0 0', fontSize:'var(--fs-14)', fontWeight:600, color: hot ? 'rgba(255,255,255,.7)' : 'var(--stone)' } }, c.s)),
              createElement('ul', { className:'stack', style:{ listStyle:'none', margin:0, padding:0, gap:20, flex:1 } },
                c.items.map((it,j)=>createElement('li', { key:j, className:'row', style:{ justifyContent:'space-between', gap:12, paddingBottom:12, borderBottom:`1px solid ${hot?'rgba(255,255,255,.14)':'var(--ash)'}`, fontSize:'var(--fs-16)' } },
                  createElement('span', { style:{ color: hot ? 'rgba(255,255,255,.8)' : 'var(--slate)', fontWeight:600 } }, it[0]),
                  createElement('span', { className:'mono', style:{ fontWeight:500, color: hot ? 'var(--yellow)' : 'var(--ink)', textAlign:'end' } }, it[1])))),
              createElement('div', { className:'row', style:{ justifyContent:'space-between', alignItems:'baseline', gap:8 } },
                createElement('span', { style:{ fontSize:'var(--fs-14)', fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em', color: hot ? 'var(--yellow)' : 'var(--stone)' } }, hot ? t.benefits.onlyL : t.benefits.avgL),
                createElement('span', { style:{ fontWeight:700, fontSize:hot?'var(--fs-25)':'var(--fs-20)', letterSpacing:'-.02em' } }, c.total, createElement('span',{style:{fontSize:'var(--fs-12)',fontWeight:600,opacity:.6}}, c.per)))
            );
          })
        ),
        ),
        createElement('div', { className:'center reveal' },
          createElement('p', { className:'lead', style:{ marginBottom:24 } }, t.benefits.bottom),
          createElement('button', { className:'btn btn-secondary btn-lg benefits-cta', onClick:onQuizClick }, t.benefits.cta, createElement(Icon.clock,{size:20})))
      )
    )
  );
}

/* ---------------- Delivery (full-bleed map) ---------------- */
function Delivery({ t, onOrder }) {
  const feats = [[Icon.clock,t.delivery.anyTime,t.delivery.anyTimeD],[Icon.calendar,t.delivery.twice,t.delivery.twiceD],[Icon.pin,t.delivery.anyPlace,t.delivery.anyPlaceD]];
  const featCards = feats.map(([ic,ti,de],i)=>createElement('div', { key:i, className:'row reveal delivery-feat-card', 'data-d':String(i+1), style:{ gap:16, backdropFilter:'blur(8px)', borderRadius:'var(--r-md)', padding:'var(--space-16) 18px' } },
    createElement('span', { style:{ flex:'0 0 auto', width:46, height:46, borderRadius:'var(--r-md)', background:'var(--yellow)', color:'var(--plum-900)', display:'grid', placeItems:'center' } }, createElement(ic,{size:22})),
    createElement('div', { className:'stack', style:{ gap:12 } },
      createElement('span', { style:{ fontWeight:700, fontSize:'var(--fs-16)' } }, ti),
      createElement('span', { className:'delivery-feat-desc', style:{ fontSize:'var(--fs-14)' } }, de))));
  return createElement('section', { id:'delivery', className:'delivery-section', style:{ position:'relative', overflow:'hidden', display:'flex', alignItems:'center' } },
    createElement('img', { src:'/main-landing/assets/map.jpg', alt:'', 'aria-hidden':true, className:'delivery-bg' }),
    createElement('div', { className:'wrap', style:{ position:'relative', paddingBlock:'clamp(var(--space-64), 9vw, var(--space-128))' } },
      createElement('div', { className:'stack delivery-wrap', style:{ gap:20, width:'100%' } },
        createElement('div', { className:'delivery-eyebrow eyebrow reveal' }, t.delivery.eyebrow),
        createElement('div', { className:'delivery-main' },
          createElement('div', { className:'stack delivery-left' },
            createElement('h2', { className:'h2 reveal delivery-title' }, t.delivery.title),
            createElement('button', { className:'btn btn-primary btn-lg reveal delivery-cta', onClick:onOrder }, t.delivery.cta, createElement(Icon.arrow,{size:20,className:'flip'}))),
          createElement('div', { className:'stack delivery-feats', style:{ gap:12 } }, featCards)))));
}

/* ---------------- FAQ ---------------- */
function FAQ({ t }) {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(0);
  const group = t.faq.groups[tab];
  const faqTabsScroll = useHorizontalScroll();
  return (
    createElement('section', { className:'section section--cream faq-section section-stack', id:'qa' },
      createElement('div', { className:'wrap' },
        createElement('div', { className:'center reveal section-intro', style:{ maxWidth:880, marginInline:'auto', width:'100%' } },
          createElement('div', { className:'eyebrow' }, t.faq.eyebrow),
          createElement('h2', { className:'h2', style:{ margin:0 } }, t.faq.title)
        )
      ),

      createElement('div', { className:'faq-content' },
        createElement('div', {
          ref: faqTabsScroll.ref,
          onMouseDown: faqTabsScroll.onMouseDown,
          className:'faq-tabs no-scrollbar h-scroll gutter-x gutter-x--center reveal',
        },
          t.faq.tabs.map((tb,i)=>createElement('button', {
            key:i,
            type:'button',
            className:`menu-day-tab${i===tab ? ' is-active' : ''}`,
            onClick: faqTabsScroll.guardClick(() => { setTab(i); setOpen(0); }),
          }, tb))
        ),

        createElement('div', { className:'wrap' },
          createElement('div', { className:'faq-body', style:{ maxWidth:880, marginInline:'auto', width:'100%' } },
            createElement('div', { className:'stack reveal', style:{ gap:12 } },
              group.map(([q,a],i)=>{
                const o = open === i;
                return createElement('div', { key:i, className:'card', style:{ background:'#fff', overflow:'hidden', boxShadow:o?'var(--shadow-landing-md)':'var(--shadow-landing-sm)' } },
                  createElement('button', { onClick:()=>setOpen(o?-1:i), className:'row',
                    style:{ width:'100%', textAlign:'start', gap:16, justifyContent:'space-between', padding:'20px 24px', fontWeight:700, fontSize:'20px', color:'var(--ink)' } },
                    q,
                    createElement('span', { style:{ flex:'0 0 auto', color:'var(--brand)', transform:o?'rotate(180deg)':'none', transition:'transform .25s var(--ease)' } }, createElement(Icon.chevron,{size:22}))),
                  createElement('div', { style:{ display:'grid', gridTemplateRows:o?'1fr':'0fr', transition:'grid-template-rows .28s var(--ease)' } },
                    createElement('div', { style:{ overflow:'hidden' } },
                      createElement('p', { style:{ margin:0, padding:'0 24px 24px', color:'var(--slate)', fontSize:'var(--fs-16)', lineHeight:1.55 } }, a)))
                );
              })
            )
          )
        )
      )
    )
  );
}

/* ---------------- Final offer ---------------- */
function FinalOffer({ t, onOrder }) {
  const trays = ['/main-landing/assets/meals/meal-02.avif','/main-landing/assets/meals/meal-04.avif','/main-landing/assets/meals/meal-06.avif','/main-landing/assets/meals/meal-08.avif','/main-landing/assets/meals/meal-10.avif','/main-landing/assets/meals/meal-12.avif','/main-landing/assets/meals/meal-14.avif'];
  const traySizes = [160,185,210,232,210,185,160];
  const trayOffsets = [90,46,16,0,16,46,90];
  const trayRotations = [-9,-6,-3,0,3,6,9];
  return createElement('section', { className:'section', style:{ color:'#fff', textAlign:'center', position:'relative', paddingBottom:0 } },
    createElement('div', { 'aria-hidden':true, style:{ position:'absolute', inset:0, overflow:'hidden', background:'radial-gradient(120% 120% at 50% 0%, #5A2487, var(--plum-700) 55%, var(--plum-900))' } },
      createElement('div', { style:{ position:'absolute', top:'-20%', insetInlineStart:'50%', transform:'translateX(-50%)', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle, rgba(240,41,168,.22), transparent 65%)' } })),
    createElement('div', { className:'wrap reveal', style:{ position:'relative', display:'flex', flexDirection:'column', alignItems:'center', gap:'var(--space-24)' } },
      createElement('h2', { className:'h2', style:{ margin:0, maxWidth:880, letterSpacing:'-0.05rem' } },
        t.final.pre, ' ', createElement('span', { style:{ color:'var(--yellow)' } }, t.final.hi)),
      createElement(HeroStats, { stats:t.hero.stats }),
      createElement('button', { className:'btn btn-secondary btn-lg', onClick:onOrder, style:{ marginTop:4 } }, t.final.cta, createElement(Icon.arrow,{size:20,className:'flip'}))),
    createElement('div', { 'aria-hidden':true, style:{ position:'relative', zIndex:1, width:'100%', height:'clamp(160px,18vw,220px)', marginTop:'var(--space-16)', marginBottom:0 } },
      createElement('div', { dir:'ltr', style:{ position:'absolute', left:-18, right:-18, top:0, display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'clamp(4px,.8vw,14px)' } },
        trays.map((src,i)=>createElement('img', {
          key:i, src, alt:'', className:'final-tray',
          style:{
            flex:'1 1 0', minWidth:0, maxWidth:`${traySizes[i]}px`,
            transform:`translateY(${trayOffsets[i]}px) rotate(${trayRotations[i]}deg)`,
            filter:'drop-shadow(0 16px 26px rgba(0,0,0,.4))',
          },
        })))),
    createElement('style', null, `@media (max-width:760px){ .final-tray:nth-child(1),.final-tray:nth-child(7){display:none} }`)
  );
}

/* ---------------- Footer ---------------- */
function Footer({ t, lang, setLang }) {
  const links = [[t.nav.menu,'/#menu'], [t.nav.delivery,'/#delivery'], [t.nav.qa,'/#qa'], [t.footer.privacy,'/privacy-policy'], [t.footer.terms,'/terms-and-conditions']];
  const socials = landingFooterSocials;
  return (
    createElement('footer', { className:'site-footer' },
      createElement('div', { className:'wrap' },
        createElement('div', { className:'footer-grid' },
          createElement('div', { className:'stack footer-brand' },
            createElement('a', { href:'#top', className:'footer-logo logo-top-link', 'aria-label':'Back to top' },
              createElement('span', { className:'hover-lift' },
                createElement(Logo, { height:28 }))),
            createElement('p', { style:{ margin:0, fontSize:'var(--fs-16)', lineHeight:1.5 } }, t.footer.tagline)),
          createElement('div', { className:'stack', style:{ gap:'var(--space-20)', width:'100%', alignItems:'flex-start' } },
            createElement('nav', { style:{ display:'flex', flexWrap:'wrap', gap:'12px 28px', fontWeight:600, fontSize:'var(--fs-16)', width:'100%' } },
              links.map(([l,href],i)=>{
                const linkStyle = { color:'rgba(255,255,255,.75)', transition:'color .15s' };
                const hover = {
                  onMouseEnter:e=>e.target.style.color='#fff',
                  onMouseLeave:e=>e.target.style.color='rgba(255,255,255,.75)',
                };
                if (href.startsWith('/')) {
                  const to = href.includes('#')
                    ? { pathname: href.split('#')[0] || '/', hash: `#${href.split('#')[1]}` }
                    : href;
                  return createElement(Link, { key:i, to, style:linkStyle, ...hover }, l);
                }
                return createElement('a', { key:i, href, style:linkStyle, ...hover }, l);
              })),
            createElement('div', { className:'row', style:{ gap:10, flexWrap:'wrap' } },
              socials.map(([k,href])=>createElement('a', { key:k, href, target:'_blank', rel:'noopener noreferrer', 'aria-label':k, title:k,
                className:'footer-social-link' },
                createElement(Social[k], { size:19 })))),
            createElement('a', {
              href:`mailto:${supportEmail}`,
              className:'footer-email-link',
            }, supportEmail))
        )
      ),
      createElement('div', { className:'wrap site-footer__legal' },
        createElement('p', { style:{ margin:0, fontSize:'var(--fs-12)', lineHeight:1.6, color:'rgba(255,255,255,.45)' } }, t.footer.legal))
    )
  );
}


export { Benefits, Delivery, FAQ, FinalOffer, Footer };
