import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language } from './i18n';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');
  const [restored, setRestored] = useState(false);

  // Remember the visitor's language; the prerendered page is English, so the saved choice is applied after hydration
  useEffect(() => {
    try {
      if (window.localStorage.getItem('amara:lang') === 'ar') setLang('ar');
    } catch { /* storage unavailable */ }
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored) return;
    try { window.localStorage.setItem('amara:lang', lang); } catch { /* ignore */ }
  }, [lang, restored]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
