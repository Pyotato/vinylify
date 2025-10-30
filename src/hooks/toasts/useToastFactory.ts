import ERROR_MESSAGES from '@/config/ERROR_MESSAGES';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const TOAST_FACTORY_KEY = 'vinylify-notification';

function useToastFactory({ id }: { id?: string }) {
  const [activeToastList, setActiveToastList] = useState<Set<string>>(
    new Set(),
  );

  /** safely parse localStorage */
  const getStoredToasts = (): Set<string> => {
    try {
      const raw = localStorage.getItem(TOAST_FACTORY_KEY);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch {
      return new Set();
    }
  };

  const saveStoredToasts = (set: Set<string>) => {
    localStorage.setItem(TOAST_FACTORY_KEY, JSON.stringify([...set]));
    setActiveToastList(new Set(set)); // sync local state
  };

  /** add toast ID to localStorage + state */
  const addActiveToastList = (toastId: string) => {
    if (!id) return;
    const newSet = getStoredToasts();
    newSet.add(toastId);
    saveStoredToasts(newSet);
  };

  /** remove toast ID from localStorage + state */
  const removeFromActiveToastList = (toastId: string) => {
    const newSet = getStoredToasts();
    newSet.delete(toastId);
    saveStoredToasts(newSet);
  };

  /** dismiss a toast and remove it from list */
  const dismissToast = (toastId: string) => {
    toast.dismiss(toastId);
    const newSet = getStoredToasts();
    newSet.delete(toastId);
    saveStoredToasts(newSet);
  };

  /** dismiss all except specific ones */
  const dismissAllExcept = (keepIds: string[]) => {
    const defaultKeepIds = [
      ERROR_MESSAGES['GENERIC_ERROR'],
      ERROR_MESSAGES['429'],
      ERROR_MESSAGES['408'],
    ];
    const totalKeepIds = new Set([...keepIds, ...defaultKeepIds]);

    const storedToasts = getStoredToasts();

    // dismiss everything *not* in keepIds
    storedToasts.forEach(toastId => {
      if (!totalKeepIds.has(toastId)) toast.dismiss(toastId);
    });

    // only keep the IDs we want
    const kept = new Set([...storedToasts].filter(id => totalKeepIds.has(id)));
    saveStoredToasts(kept);
  };

  /** dismiss all toasts and clear storage */
  const dismissAll = () => {
    toast.dismiss();
    localStorage.removeItem(TOAST_FACTORY_KEY);
    setActiveToastList(new Set());
  };

  /** load on mount */
  useEffect(() => {
    setActiveToastList(getStoredToasts());
  }, []);

  return {
    activeToastList,
    addActiveToastList,
    removeFromActiveToastList,
    dismissToast,
    dismissAllExcept,
    dismissAll,
  };
}

export default useToastFactory;
