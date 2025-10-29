import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

function useToastFactory({ id }: { id?: string }) {
  const [activeToastList, setActiveToastList] = useState<Set<string>>(
    new Set([]),
  );

  const localStorageKey = useMemo(() => useToastFactory.toastId(id), [id]);

  const addActiveToastList = (toastId: string) => {
    const prev = localStorage.getItem(localStorageKey);
    if (prev) {
      const preArr = Array.from(new Set([...prev.split(','), toastId]));
      localStorage.setItem(localStorageKey, preArr.join(','));
    } else {
      localStorage.setItem(
        localStorageKey,
        Array.from(activeToastList.add(toastId)).join(','),
      );
    }
  };

  const removeFromActiveToastList = (toastId: string) => {
    const prev = localStorage.getItem(localStorageKey);
    activeToastList.delete(toastId);
    if (prev) {
      const filtered = prev.split(',').filter(item => item === toastId);
      localStorage.setItem(localStorageKey, filtered.join(','));
    } else {
      localStorage.setItem(
        localStorageKey,
        Array.from(activeToastList).join(','),
      );
    }
  };

  const dismissToast = (toastId: string) => {
    toast.dismiss(toastId);
    const prev = localStorage.getItem(localStorageKey);
    if (prev) {
      const filtered = prev.split(',').filter(item => item === toastId);
      localStorage.setItem(localStorageKey, filtered.join(','));
    }
  };

  const dismissAllExcept = (keepIds: string[]) => {
    const prev = localStorage.getItem(localStorageKey);
    const newSet: string[] = [];
    if (prev) {
      prev.split(',').forEach(toastId => {
        if (!keepIds.includes(toastId)) {
          toast.dismiss(toastId);
        } else {
          newSet.push(toastId);
        }
      });

      localStorage.setItem(localStorageKey, newSet.join(','));
    }
  };

  const dismissAll = () => {
    const items = localStorage.getItem(localStorageKey);
    if (items) {
      items.split(',').forEach(id => toast.dismiss(id));
    }
    activeToastList.forEach(id => toast.dismiss(id));
    activeToastList.clear();
    localStorage.removeItem(localStorageKey);
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    const items = localStorage.getItem(localStorageKey);
    if (items) {
      setActiveToastList(new Set(items.split(',')));
    }
  }, [localStorage.getItem(localStorageKey)]);

  return {
    activeToastList,
    addActiveToastList,
    removeFromActiveToastList,
    dismissToast,
    dismissAllExcept,
    dismissAll,
  };
}

useToastFactory.toastId = (id?: string) => id + '-notifications';

export default useToastFactory;
