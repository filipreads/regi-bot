import { useState, useCallback, useEffect } from 'react';

export interface UserData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phone: string;
}

export interface Site {
  id: string;
  name: string;
  url: string;
  type: 'generic' | 'wordpress' | 'custom';
}

export interface BotSettings {
  delay: number;
  timeout: number;
  headless: boolean;
  screenshots: boolean;
  retryFailed: boolean;
}

export type SiteStatus = 'pending' | 'running' | 'success' | 'error';

export interface SiteResult {
  siteId: string;
  status: SiteStatus;
  message?: string;
}

export interface WizardState {
  userData: UserData;
  sites: Site[];
  settings: BotSettings;
}

const STORAGE_KEY = 'autoreg-wizard';

const defaultState: WizardState = {
  userData: {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phone: '',
  },
  sites: [],
  settings: {
    delay: 500,
    timeout: 30,
    headless: true,
    screenshots: true,
    retryFailed: true,
  },
};

function loadState(): WizardState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...defaultState, ...JSON.parse(saved) };
  } catch {}
  return defaultState;
}

export function useWizardState() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<WizardState>(loadState);
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [siteResults, setSiteResults] = useState<SiteResult[]>([]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateUserData = useCallback((data: Partial<UserData>) => {
    setState(prev => ({ ...prev, userData: { ...prev.userData, ...data } }));
  }, []);

  const addSite = useCallback((type: Site['type'] = 'generic') => {
    const id = crypto.randomUUID();
    const names = { generic: 'New Site', wordpress: 'WordPress Site', custom: 'Custom Site' };
    setState(prev => ({
      ...prev,
      sites: [...prev.sites, { id, name: names[type], url: '', type }],
    }));
  }, []);

  const updateSite = useCallback((id: string, data: Partial<Site>) => {
    setState(prev => ({
      ...prev,
      sites: prev.sites.map(s => s.id === id ? { ...s, ...data } : s),
    }));
  }, []);

  const removeSite = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      sites: prev.sites.filter(s => s.id !== id),
    }));
  }, []);

  const updateSettings = useCallback((data: Partial<BotSettings>) => {
    setState(prev => ({ ...prev, settings: { ...prev.settings, ...data } }));
  }, []);

  const nextStep = useCallback(() => setStep(s => Math.min(s + 1, 3)), []);
  const prevStep = useCallback(() => setStep(s => Math.max(s - 1, 0)), []);
  const goToStep = useCallback((s: number) => setStep(s), []);

  const launchBot = useCallback(() => {
    const sites = state.sites;
    if (sites.length === 0) return;

    setIsRunning(true);
    setIsDone(false);
    setSiteResults(sites.map(s => ({ siteId: s.id, status: 'pending' as SiteStatus })));

    // Simulate sequential per-site registration
    sites.forEach((site, i) => {
      // Set to running
      setTimeout(() => {
        setSiteResults(prev =>
          prev.map(r => r.siteId === site.id ? { ...r, status: 'running' } : r)
        );
      }, i * 1500);

      // Set to success/error
      setTimeout(() => {
        const success = Math.random() > 0.2; // 80% success rate simulation
        setSiteResults(prev =>
          prev.map(r =>
            r.siteId === site.id
              ? { ...r, status: success ? 'success' : 'error', message: success ? undefined : 'Timeout' }
              : r
          )
        );

        // If last site, mark done
        if (i === sites.length - 1) {
          setTimeout(() => {
            setIsRunning(false);
            setIsDone(true);
          }, 500);
        }
      }, i * 1500 + 1200);
    });
  }, [state.sites]);

  return {
    step, nextStep, prevStep, goToStep,
    state, updateUserData, addSite, updateSite, removeSite, updateSettings,
    isRunning, isDone, siteResults, launchBot,
  };
}
