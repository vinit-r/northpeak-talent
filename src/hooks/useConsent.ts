import { useCallback, useSyncExternalStore } from 'react';
import { storage } from '@/lib/utils';

/** "essential" = default; "embeds" also allows third-party embeds such as Google Maps. */
export type Consent = 'essential' | 'embeds';

const STORAGE_KEY = 'np-consent';
const listeners = new Set<() => void>();

const read = (): Consent | null => {
  const value = storage.get(STORAGE_KEY);
  return value === 'essential' || value === 'embeds' ? value : null;
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function useConsent() {
  const consent = useSyncExternalStore(subscribe, read, () => null);

  const setConsent = useCallback((value: Consent) => {
    storage.set(STORAGE_KEY, value);
    listeners.forEach((listener) => listener());
  }, []);

  return { consent, decided: consent !== null, setConsent };
}
