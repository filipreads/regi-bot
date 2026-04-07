import { useLanguage } from '@/contexts/LanguageContext';
import { WizardState } from '@/hooks/useWizardState';
import { Button } from '@/components/ui/button';
import { Rocket, CheckCircle2, Loader2, Globe, User, Settings } from 'lucide-react';

interface Props {
  state: WizardState;
  isRunning: boolean;
  isDone: boolean;
  onLaunch: () => void;
  onBack: () => void;
}

const StepLaunch = ({ state, isRunning, isDone, onLaunch, onBack }: Props) => {
  const { t } = useLanguage();

  return (
    <div className="glass-card animate-fade-in">
      <div className="flex items-center justify-between p-5 border-b border-border bg-muted/50 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
            4
          </div>
          <h2 className="text-base font-semibold text-foreground">{t('cardTitle4')}</h2>
        </div>
      </div>
      <div className="p-5 space-y-5">
        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-lg border border-border bg-background p-4 flex items-center gap-3">
            <User className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">{t('firstName')}</p>
              <p className="text-sm font-semibold text-foreground">{state.userData.firstName} {state.userData.lastName}</p>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-background p-4 flex items-center gap-3">
            <Globe className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">{t('sitesCount')}</p>
              <p className="text-sm font-semibold text-foreground">{state.sites.length}</p>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-background p-4 flex items-center gap-3">
            <Settings className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">{t('delay')}</p>
              <p className="text-sm font-semibold text-foreground">{state.settings.delay}ms</p>
            </div>
          </div>
        </div>

        {/* Sites list */}
        {state.sites.length > 0 && (
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{t('cardTitle2')}</p>
            <div className="space-y-2">
              {state.sites.map((site, i) => (
                <div key={site.id} className="flex items-center gap-2 text-sm">
                  <span className="text-primary font-mono text-xs">{i + 1}.</span>
                  <span className="font-medium text-foreground">{site.name}</span>
                  {site.url && <span className="text-muted-foreground font-mono text-xs truncate">— {site.url}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Status */}
        <div className="rounded-lg border border-border bg-accent/50 p-4 text-center">
          {isDone ? (
            <div className="flex items-center justify-center gap-2 text-primary">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-semibold">{t('done')}</span>
            </div>
          ) : isRunning ? (
            <div className="flex items-center justify-center gap-2 text-primary">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="font-medium">{t('running')}</span>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{t('readyToLaunch')}</p>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onBack} disabled={isRunning}>{t('back')}</Button>
          <Button onClick={onLaunch} disabled={isRunning || isDone} className="gap-2">
            {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Rocket className="w-4 h-4" />}
            {t('launch')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepLaunch;
