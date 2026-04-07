import { useLanguage } from '@/contexts/LanguageContext';
import { BotSettings } from '@/hooks/useWizardState';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface Props {
  settings: BotSettings;
  onChange: (data: Partial<BotSettings>) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepSettings = ({ settings, onChange, onNext, onBack }: Props) => {
  const { t } = useLanguage();

  return (
    <div className="glass-card animate-fade-in">
      <div className="flex items-center justify-between p-5 border-b border-border bg-muted/50 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
            3
          </div>
          <h2 className="text-base font-semibold text-foreground">{t('cardTitle3')}</h2>
        </div>
      </div>
      <div className="p-5 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t('delay')}</Label>
            <Input
              type="number"
              value={settings.delay}
              onChange={(e) => onChange({ delay: Number(e.target.value) })}
              className="font-mono"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t('timeout')}</Label>
            <Input
              type="number"
              value={settings.timeout}
              onChange={(e) => onChange({ timeout: Number(e.target.value) })}
              className="font-mono"
            />
          </div>
        </div>

        <div className="space-y-4">
          {([
            { key: 'headless' as const, label: t('headless') },
            { key: 'screenshots' as const, label: t('screenshots') },
            { key: 'retryFailed' as const, label: t('retryFailed') },
          ]).map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <Label className="text-sm font-medium text-foreground">{label}</Label>
              <Switch
                checked={settings[key]}
                onCheckedChange={(checked) => onChange({ [key]: checked })}
              />
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

export default StepSettings;
