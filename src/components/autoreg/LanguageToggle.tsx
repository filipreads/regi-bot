import { useLanguage } from '@/contexts/LanguageContext';

const LanguageToggle = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="inline-flex rounded-lg border border-border overflow-hidden text-sm">
      <button
        onClick={() => setLang('cs')}
        className={`px-3 py-1.5 font-medium transition-colors ${
          lang === 'cs'
            ? 'bg-primary text-primary-foreground'
            : 'bg-card text-muted-foreground hover:bg-muted'
        }`}
      >
        CZ
      </button>
      <button
        onClick={() => setLang('en')}
        className={`px-3 py-1.5 font-medium transition-colors ${
          lang === 'en'
            ? 'bg-primary text-primary-foreground'
            : 'bg-card text-muted-foreground hover:bg-muted'
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;
