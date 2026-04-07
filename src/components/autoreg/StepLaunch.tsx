import { useLanguage } from '@/contexts/LanguageContext';
import { WizardState, SiteResult } from '@/hooks/useWizardState';
import { Button } from '@/components/ui/button';
import { Rocket, CheckCircle2, Loader2, Globe, User, Settings, XCircle, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  state: WizardState;
  isRunning: boolean;
  isDone: boolean;
  siteResults: SiteResult[];
  onLaunch: () => void;
  onBack: () => void;
}

const statusConfig = {
  pending: { icon: Clock, className: 'text-muted-foreground' },
  running: { icon: Loader2, className: 'text-primary animate-spin' },
  success: { icon: CheckCircle2, className: 'text-green-500' },
  error: { icon: XCircle, className: 'text-destructive' },
} as const;

const StepLaunch = ({ state, isRunning, isDone, siteResults, onLaunch, onBack }: Props) => {
  const { t } = useLanguage();

  const successCount = siteResults.filter(r => r.status === 'success').length;
  const errorCount = siteResults.filter(r => r.status === 'error').length;
  const hasResults = siteResults.length > 0;

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

        {/* Per-site status list */}
        {state.sites.length > 0 && (
          <div className="rounded-lg border border-border bg-background p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {hasResults ? t('siteStatus') : t('cardTitle2')}
              </p>
              {isDone && (
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-green-500 font-medium">{t('successCount')}: {successCount}</span>
                  {errorCount > 0 && (
                    <span className="text-destructive font-medium">{t('failedCount')}: {errorCount}</span>
                  )}
                </div>
              )}
            </div>
            <div className="space-y-2">
              {state.sites.map((site, i) => {
                const result = siteResults.find(r => r.siteId === site.id);
                const status = result?.status;
                const StatusIcon = status ? statusConfig[status].icon : ArrowRight;
                const statusClass = status ? statusConfig[status].className : 'text-muted-foreground';
                const statusLabel = status
                  ? t(status === 'pending' ? 'statusPending' : status === 'running' ? 'statusRunning' : status === 'success' ? 'statusSuccess' : 'statusError')
                  : '';

                return (
                  <div
                    key={site.id}
                    className={cn(
                      'flex items-center gap-3 text-sm rounded-md px-3 py-2 transition-colors',
                      status === 'running' && 'bg-primary/5',
                      status === 'success' && 'bg-green-500/5',
                      status === 'error' && 'bg-destructive/5',
                    )}
                  >
                    <span className="text-primary font-mono text-xs w-5">{i + 1}.</span>
                    <span className="font-medium text-foreground flex-1 truncate">{site.name}</span>
                    {site.url && !hasResults && (
                      <span className="text-muted-foreground font-mono text-xs truncate max-w-[120px]">
                        {site.url}
                      </span>
                    )}
                    {hasResults && (
                      <div className="flex items-center gap-1.5">
                        <StatusIcon className={cn('w-4 h-4', statusClass)} />
                        <span className={cn('text-xs font-medium', statusClass)}>{statusLabel}</span>
                        {result?.message && (
                          <span className="text-xs text-muted-foreground">({result.message})</span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Overall status */}
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
