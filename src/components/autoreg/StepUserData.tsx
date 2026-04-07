import { useLanguage } from '@/contexts/LanguageContext';
import { UserData } from '@/hooks/useWizardState';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, User } from 'lucide-react';
import { useState } from 'react';

interface Props {
  data: UserData;
  onChange: (data: Partial<UserData>) => void;
  onNext: () => void;
}

const StepUserData = ({ data, onChange, onNext }: Props) => {
  const { t } = useLanguage();
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!data.firstName.trim()) errs.firstName = t('requiredField');
    if (!data.lastName.trim()) errs.lastName = t('requiredField');
    if (!data.username.trim()) errs.username = t('requiredField');
    if (!data.email.trim()) errs.email = t('requiredField');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = t('invalidEmail');
    if (!data.password.trim()) errs.password = t('requiredField');
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  const fields: { key: keyof UserData; type: string }[] = [
    { key: 'firstName', type: 'text' },
    { key: 'lastName', type: 'text' },
    { key: 'username', type: 'text' },
    { key: 'email', type: 'email' },
    { key: 'password', type: showPass ? 'text' : 'password' },
    { key: 'phone', type: 'tel' },
  ];

  const labelMap: Record<keyof UserData, string> = {
    firstName: t('firstName'),
    lastName: t('lastName'),
    username: t('username'),
    email: t('email'),
    password: t('password'),
    phone: t('phone'),
  };

  return (
    <div className="glass-card animate-fade-in">
      <div className="flex items-center justify-between p-5 border-b border-border bg-muted/50 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
            1
          </div>
          <h2 className="text-base font-semibold text-foreground">{t('cardTitle1')}</h2>
        </div>
        <span className="text-xs text-muted-foreground bg-background border border-border rounded-full px-3 py-1 hidden sm:inline">
          {t('cardChip1')}
        </span>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map(({ key, type }) => (
            <div key={key} className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {labelMap[key]}
              </Label>
              <div className="relative">
                <Input
                  type={type}
                  value={data[key]}
                  onChange={(e) => onChange({ [key]: e.target.value })}
                  className={`font-mono text-sm ${errors[key] ? 'border-destructive' : ''}`}
                />
                {key === 'password' && (
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                )}
              </div>
              {errors[key] && (
                <p className="text-xs text-destructive">{errors[key]}</p>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-6">
          <Button onClick={handleNext}>{t('continue')}</Button>
        </div>
      </div>
    </div>
  );
};

export default StepUserData;
