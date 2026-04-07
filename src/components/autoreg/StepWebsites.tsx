import { useLanguage } from '@/contexts/LanguageContext';
import { Site } from '@/hooks/useWizardState';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Globe, FileText, Settings, Trash2 } from 'lucide-react';

interface Props {
  sites: Site[];
  onAdd: (type: Site['type']) => void;
  onUpdate: (id: string, data: Partial<Site>) => void;
  onRemove: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const templates: { type: Site['type']; icon: React.ReactNode; nameKey: string; descKey: string }[] = [
  { type: 'generic', icon: <Globe className="w-5 h-5" />, nameKey: 'genericForm', descKey: 'genericDesc' },
  { type: 'wordpress', icon: <FileText className="w-5 h-5" />, nameKey: 'wordpress', descKey: 'wordpressDesc' },
  { type: 'custom', icon: <Settings className="w-5 h-5" />, nameKey: 'custom', descKey: 'customDesc' },
];

const StepWebsites = ({ sites, onAdd, onUpdate, onRemove, onNext, onBack }: Props) => {
  const { t } = useLanguage();

  return (
    <div className="glass-card animate-fade-in">
      <div className="flex items-center justify-between p-5 border-b border-border bg-muted/50 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
            2
          </div>
          <h2 className="text-base font-semibold text-foreground">{t('cardTitle2')}</h2>
        </div>
        <Button variant="outline" size="sm" onClick={() => onAdd('generic')}>
          {t('addSite')}
        </Button>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          {templates.map((tmpl) => (
            <button
              key={tmpl.type}
              onClick={() => onAdd(tmpl.type)}
              className="flex flex-col items-start gap-2 p-4 rounded-lg border border-border bg-background hover:border-primary hover:bg-accent transition-all text-left group"
            >
              <span className="text-primary">{tmpl.icon}</span>
              <span className="text-sm font-semibold text-foreground">{t(tmpl.nameKey as any)}</span>
              <span className="text-xs text-muted-foreground">{t(tmpl.descKey as any)}</span>
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {sites.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">{t('noSites')}</p>
          )}
          {sites.map((site, i) => (
            <div key={site.id} className="rounded-lg border border-border bg-background p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{t('siteName')}</Label>
                    <Input
                      value={site.name}
                      onChange={(e) => onUpdate(site.id, { name: e.target.value })}
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{t('siteUrl')}</Label>
                    <Input
                      value={site.url}
                      onChange={(e) => onUpdate(site.id, { url: e.target.value })}
                      placeholder="https://..."
                      className="font-mono text-sm"
                    />
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => onRemove(site.id)} className="text-destructive hover:text-destructive flex-shrink-0">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onBack}>{t('back')}</Button>
          <Button onClick={onNext}>{t('continue')}</Button>
        </div>
      </div>
    </div>
  );
};

export default StepWebsites;
