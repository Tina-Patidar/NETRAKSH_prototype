import { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { loadJSON, saveJSON } from '../utils/storage';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => loadJSON<Language>('language', 'en'));

  function setLanguage(lang: Language) {
    setLanguageState(lang);
    saveJSON('language', lang);
  }

  function t(key: string): string {
    return translations[language][key] ?? translations.en[key] ?? key;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
