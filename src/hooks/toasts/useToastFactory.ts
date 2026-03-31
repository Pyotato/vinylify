import { useToastStore } from '@/store/toastStore';

const TOAST_FACTORY_KEY = 'vinylify-notification';

function useToastFactory({ id = TOAST_FACTORY_KEY }: { id: string }) {
  const { activeToasts, add, remove, dismiss, dismissAllExcept, dismissStack, dismissAll } =
    useToastStore();

  return {
    activeToastList: activeToasts,
    addActiveToastList: (toastId: string) => add(id, toastId),
    removeFromActiveToastList: (toastId: string) => remove(id, toastId),
    dismissToast: (toastId: string) => dismiss(id, toastId),
    dismissAllExcept: (keepIds: string[]) => dismissAllExcept(keepIds),
    dismissStack: (stackId: string) => dismissStack(id, stackId),
    dismissAll,
  };
}

export default useToastFactory;
