import { useState, useRef, useEffect } from 'react';
import { Languages, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { languageLabels } from '../translations';
import { Language } from '../types';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-base-800 border border-base-700 text-xs font-medium text-ink-300 hover:text-ink-100 transition-colors focus-ring"
      >
        <Languages size={14} />
        {languageLabels[language]}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 card p-1.5 shadow-xl z-50">
          {(Object.keys(languageLabels) as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => {
                setLanguage(lang);
                setOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-ink-300 hover:bg-base-800 hover:text-ink-100 transition-colors"
            >
              {languageLabels[lang]}
              {language === lang && <Check size={14} className="text-signal-cyan" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
