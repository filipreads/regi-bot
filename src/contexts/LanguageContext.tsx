import React, { createContext, useContext, useState, useCallback } from 'react';

type Lang = 'cs' | 'en';

const translations = {
  cs: {
    heroTitle: 'Auto',
    heroTitleAccent: 'Reg',
    heroDesc: 'Vyplňte svá data, přidejte weby a spusťte automatickou registraci jedním klikem.',
    heroBadge: 'Registrační Bot',
    step1: 'Moje data',
    step2: 'Weby',
    step3: 'Nastavení',
    step4: 'Spustit',
    cardTitle1: 'Vaše registrační data',
    cardChip1: 'Vyplňte jednou, použijte všude',
    firstName: 'Jméno',
    lastName: 'Příjmení',
    username: 'Uživatelské jméno',
    email: 'E-mail',
    password: 'Heslo',
    phone: 'Telefon',
    cardTitle2: 'Weby k registraci',
    addSite: '+ Přidat web',
    genericForm: 'Obecný formulář',
    genericDesc: 'Standardní HTML registrace',
    wordpress: 'WordPress',
    wordpressDesc: 'WP registrační stránka',
    custom: 'Vlastní',
    customDesc: 'Nastavte selektory ručně',
    back: '← Zpět',
    continue: 'Pokračovat →',
    launch: 'Spustit registraci',
    siteUrl: 'URL webu',
    siteName: 'Název webu',
    removeSite: 'Odebrat',
    cardTitle3: 'Nastavení bota',
    delay: 'Prodleva mezi akcemi (ms)',
    timeout: 'Timeout (s)',
    headless: 'Režim bez okna',
    screenshots: 'Ukládat screenshoty',
    retryFailed: 'Opakovat neúspěšné',
    cardTitle4: 'Přehled a spuštění',
    summary: 'Souhrn',
    sitesCount: 'Počet webů',
    readyToLaunch: 'Vše je připraveno k registraci.',
    running: 'Probíhá registrace...',
    done: 'Hotovo!',
    requiredField: 'Povinné pole',
    invalidEmail: 'Neplatný e-mail',
    saved: 'Uloženo',
    templateApplied: 'Šablona použita',
    noSites: 'Zatím nemáte žádné weby. Přidejte je výše.',
    siteStatus: 'Stav registrace',
    statusPending: 'Čeká',
    statusRunning: 'Probíhá',
    statusSuccess: 'Úspěch',
    statusError: 'Chyba',
    successCount: 'Úspěšné',
    failedCount: 'Neúspěšné',
  },
  en: {
    heroTitle: 'Auto',
    heroTitleAccent: 'Reg',
    heroDesc: 'Fill in your data, add websites, and launch automatic registration with one click.',
    heroBadge: 'Registration Bot',
    step1: 'My Data',
    step2: 'Websites',
    step3: 'Settings',
    step4: 'Launch',
    cardTitle1: 'Your Registration Data',
    cardChip1: 'Fill once, use everywhere',
    firstName: 'First Name',
    lastName: 'Last Name',
    username: 'Username',
    email: 'Email',
    password: 'Password',
    phone: 'Phone',
    cardTitle2: 'Websites to Register',
    addSite: '+ Add Website',
    genericForm: 'Generic Form',
    genericDesc: 'Standard HTML registration',
    wordpress: 'WordPress',
    wordpressDesc: 'WP registration page',
    custom: 'Custom',
    customDesc: 'Set selectors manually',
    back: '← Back',
    continue: 'Continue →',
    launch: 'Launch Registration',
    siteUrl: 'Website URL',
    siteName: 'Website Name',
    removeSite: 'Remove',
    cardTitle3: 'Bot Settings',
    delay: 'Action Delay (ms)',
    timeout: 'Timeout (s)',
    headless: 'Headless Mode',
    screenshots: 'Save Screenshots',
    retryFailed: 'Retry Failed',
    cardTitle4: 'Review & Launch',
    summary: 'Summary',
    sitesCount: 'Number of Sites',
    readyToLaunch: 'Everything is ready for registration.',
    running: 'Registration in progress...',
    done: 'Done!',
    requiredField: 'Required field',
    invalidEmail: 'Invalid email',
    saved: 'Saved',
    templateApplied: 'Template applied',
    noSites: "You don't have any websites yet. Add them above.",
  },
} as const;

type TranslationKey = keyof typeof translations['cs'];

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('autoreg-lang');
    return (saved === 'en' || saved === 'cs') ? saved : 'cs';
  });

  const handleSetLang = useCallback((newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem('autoreg-lang', newLang);
  }, []);

  const t = useCallback((key: TranslationKey) => {
    return translations[lang][key] || key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
