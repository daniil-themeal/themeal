// @ts-nocheck
import { createElement } from 'react';
import { Icon } from './icons';

export function HeroStats({ stats, className = 'hero-stats', style = {}, dataD, showChecks = true }) {
  const rootClassName = [className, showChecks && 'hero-stats--with-checks'].filter(Boolean).join(' ');
  return createElement('div', {
    className: rootClassName,
    'data-d': dataD,
    style:{
      display:'flex', gap:24, flexWrap:'nowrap', justifyContent:'center', width:'100%', whiteSpace:'nowrap',
      ...style,
    },
  },
    stats.map((s,i)=>createElement('div', { key:i, className:'row', style:{ alignItems:'center', gap:4, flexShrink:0, whiteSpace:'nowrap' } },
      showChecks ? createElement('span', { className:'hero-stats-check', style:{ flexShrink:0, display:'flex' } },
        createElement(Icon.check, { size:20, style:{ color:'var(--green-bright)' } })
      ) : null,
      createElement('span', { className:'row-text' },
        createElement('span', { style:{ fontFamily:'var(--font)', fontWeight:700, fontSize:20, letterSpacing:'-.01em', color:'#fff', whiteSpace:'nowrap' } }, s.v),
        createElement('span', { style:{ fontFamily:'var(--font)', fontSize:20, color:'#fff', fontWeight:600, letterSpacing:'-.01em', whiteSpace:'nowrap' } }, s.l))))
  );
}
