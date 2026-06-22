import { useState } from 'react';

type SiteLang = 'en' | 'ar';

const OPTIONS: { value: SiteLang; label: string }[] = [
  { value: 'en', label: 'EN' },
  { value: 'ar', label: 'عربي' },
];

export function SiteLangSwitcher() {
  const [lang, setLang] = useState<SiteLang>('en');

  return (
    <div className="hdr-lang-switcher" role="group" aria-label="Language">
      {OPTIONS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          className="hdr-lang-btn"
          aria-pressed={lang === value}
          aria-label={value === 'en' ? 'English' : 'Arabic'}
          onClick={() => setLang(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
