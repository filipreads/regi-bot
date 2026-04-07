import { LanguageProvider } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/autoreg/LanguageToggle';
import StepIndicator from '@/components/autoreg/StepIndicator';
import StepUserData from '@/components/autoreg/StepUserData';
import StepWebsites from '@/components/autoreg/StepWebsites';
import StepSettings from '@/components/autoreg/StepSettings';
import StepLaunch from '@/components/autoreg/StepLaunch';
import { useWizardState } from '@/hooks/useWizardState';
import { useLanguage } from '@/contexts/LanguageContext';
import { Bot } from 'lucide-react';

const AutoRegContent = () => {
  const { t } = useLanguage();
  const wizard = useWizardState();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {t('heroBadge')}
            </span>
          </div>
          <LanguageToggle />
        </div>

        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            {t('heroTitle')}<span className="text-primary">{t('heroTitleAccent')}</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
            {t('heroDesc')}
          </p>
        </div>

        {/* Stepper */}
        <StepIndicator currentStep={wizard.step} onStepClick={wizard.goToStep} />

        {/* Steps */}
        {wizard.step === 0 && (
          <StepUserData
            data={wizard.state.userData}
            onChange={wizard.updateUserData}
            onNext={wizard.nextStep}
          />
        )}
        {wizard.step === 1 && (
          <StepWebsites
            sites={wizard.state.sites}
            onAdd={wizard.addSite}
            onUpdate={wizard.updateSite}
            onRemove={wizard.removeSite}
            onNext={wizard.nextStep}
            onBack={wizard.prevStep}
          />
        )}
        {wizard.step === 2 && (
          <StepSettings
            settings={wizard.state.settings}
            onChange={wizard.updateSettings}
            onNext={wizard.nextStep}
            onBack={wizard.prevStep}
          />
        )}
        {wizard.step === 3 && (
          <StepLaunch
            state={wizard.state}
            isRunning={wizard.isRunning}
            isDone={wizard.isDone}
            onLaunch={wizard.launchBot}
            onBack={wizard.prevStep}
          />
        )}
      </div>
    </div>
  );
};

const Index = () => (
  <LanguageProvider>
    <AutoRegContent />
  </LanguageProvider>
);

export default Index;
