import { useLanguage } from '@/contexts/LanguageContext';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

const StepIndicator = ({ currentStep, onStepClick }: StepIndicatorProps) => {
  const { t } = useLanguage();
  const steps = [t('step1'), t('step2'), t('step3'), t('step4')];

  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((label, i) => (
        <div key={i} className="flex items-center">
          <button
            onClick={() => onStepClick(i)}
            className="flex items-center gap-2 group"
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                i < currentStep
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : i === currentStep
                  ? 'border-2 border-primary text-primary shadow-sm shadow-primary/20'
                  : 'border-2 border-border text-muted-foreground'
              }`}
            >
              {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span
              className={`text-xs font-medium hidden sm:inline transition-colors ${
                i <= currentStep ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {label}
            </span>
          </button>
          {i < steps.length - 1 && (
            <div className="w-8 sm:w-12 h-0.5 mx-2 sm:mx-3 rounded-full overflow-hidden bg-border">
              <div
                className={`h-full bg-primary transition-transform duration-500 origin-left ${
                  i < currentStep ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
