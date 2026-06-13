// @ts-nocheck
import { createElement } from 'react';
import { Icon } from './icons';

export function HeroStats({ stats, className = 'hero-stats', style = {}, dataD }) {
  return createElement('div', {
    className,
    'data-d': dataD,
    style:{
      display:'flex', gap:32, flexWrap:'nowrap', justifyContent:'center', width:'100%', whiteSpace:'nowrap', paddingRight:25,
      ...style,
    },
  },
    stats.map((s,i)=>createElement('div', { key:i, className:'row', style:{ alignItems:'center', gap:'.45em', flexShrink:0, whiteSpace:'nowrap' } },
      createElement(Icon.check, { size:20, style:{ color:'var(--green-bright)', flexShrink:0 } }),
      createElement('span', { style:{ fontFamily:'var(--font)', fontWeight:700, fontSize:'clamp(14px,1.8vw,var(--fs-20))', letterSpacing:'-.01em', color:'#fff', whiteSpace:'nowrap' } }, s.v),
      createElement('span', { style:{ fontFamily:'var(--font)', fontSize:'clamp(14px,1.8vw,var(--fs-20))', color:'#fff', fontWeight:600, letterSpacing:'-.01em', whiteSpace:'nowrap' } }, s.l)))
  );
}
