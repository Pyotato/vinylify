import ERROR_MESSAGES from '@/config/ERROR_MESSAGES';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const TOAST_FACTORY_KEY = 'vinylify-notification';

const defaultKeepIds = [
  ERROR_MESSAGES['GENERIC_ERROR'],
  ERROR_MESSAGES['429'],
  ERROR_MESSAGES['408'],
];

const initial = { global: [...new Set(defaultKeepIds)] };

function useToastFactory({ id = TOAST_FACTORY_KEY }: { id: string }) {
  const [activeToastList, setActiveToastList] =
    useState<Record<string, Array<string>>>(initial);

  /** parse localStorage */
  const getStoredToasts = (): Record<string, Array<string>> => {
    const raw = localStorage.getItem(TOAST_FACTORY_KEY);
    const parsed = raw ? JSON.parse(raw) : initial;
    return parsed;
  };

  const saveStoredToasts = (set: Record<string, Array<string>>) => {
    const raw = localStorage.getItem(TOAST_FACTORY_KEY) ?? '{}';
    const parsed = JSON.parse(raw);
    parsed[id] = set[id];
    localStorage.setItem(TOAST_FACTORY_KEY, JSON.stringify(parsed));
    setActiveToastList(parsed);
  };

  /** add toast ID to localStorage + state */
  const addActiveToastList = (toastId: string) => {
    const newSet = getStoredToasts();
    const set = new Set(newSet?.[id]);
    set?.add(toastId);
    newSet[id] = [...set];
    saveStoredToasts(newSet);
  };

  /** remove toast ID from localStorage + state */
  const removeFromActiveToastList = (toastId: string) => {
    const newSet = getStoredToasts();
    const set = new Set(newSet?.[id]);
    set?.delete(toastId);
    newSet[id] = [...set];
    saveStoredToasts(newSet);
  };

  /** dismiss a toast and remove it from list */
  const dismissToast = (toastId: string) => {
    toast.dismiss(toastId);
    const newSet = getStoredToasts();
    const set = new Set(newSet?.[id]);
    set?.delete(toastId);
    newSet[id] = [...set];
    saveStoredToasts(newSet);
  };

  /** dismiss all except specific ones */
  const dismissAllExcept = (keepIds: string[]) => {
    const totalKeepIds = new Set([...keepIds, ...defaultKeepIds]);

    const storedToasts = getStoredToasts();
    if (!storedToasts) {
      return;
    }

    const kept = {} as Record<string, Array<string>>;

    Object.keys(storedToasts).forEach(notificationKey => {
      let temp = new Set();
      storedToasts[notificationKey].forEach(toastId => {
        if (!totalKeepIds.has(toastId)) {
          toast.dismiss(toastId);
        } else {
          temp.add(toastId);
        }
      });
      kept[notificationKey] = [...(temp ?? [])] as string[];
    });
    saveStoredToasts(kept);
  };

  /** dismiss notifications of same stackId only */
  const dismissStack = (stackId: string) => {
    const storedToasts = getStoredToasts();
    storedToasts[id].forEach(item => {
      if (item != stackId) {
        toast.dismiss(item);
      }
    });
    storedToasts[id] = [stackId];
    saveStoredToasts(storedToasts);
  };

  /** dismiss all toasts and clear storage */
  const dismissAll = () => {
    toast.dismiss();
    localStorage.removeItem(TOAST_FACTORY_KEY);
    setActiveToastList({});
  };

  /** load on mount */
  useEffect(() => {
    const toasts = getStoredToasts();
    if (toasts) {
      setActiveToastList(toasts);
    }
  }, []);

  return {
    activeToastList,
    addActiveToastList,
    removeFromActiveToastList,
    dismissToast,
    dismissAllExcept,
    dismissAll,
    dismissStack,
  };
}

export default useToastFactory;
