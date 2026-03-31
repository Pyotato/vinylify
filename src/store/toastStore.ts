import ERROR_MESSAGES from '@/config/ERROR_MESSAGES';
import { toast } from 'react-toastify';
import { create } from 'zustand';

const DEFAULT_KEEP_IDS = [
  ERROR_MESSAGES['GENERIC_ERROR'],
  ERROR_MESSAGES['429'],
  ERROR_MESSAGES['408'],
];

type ToastStore = {
  activeToasts: Record<string, string[]>;
  add: (factoryId: string, toastId: string) => void;
  remove: (factoryId: string, toastId: string) => void;
  dismiss: (factoryId: string, toastId: string) => void;
  dismissAllExcept: (keepIds: string[]) => void;
  dismissStack: (factoryId: string, stackId: string) => void;
  dismissAll: () => void;
};

export const useToastStore = create<ToastStore>((set, get) => ({
  activeToasts: { global: [...new Set(DEFAULT_KEEP_IDS)] },

  add: (factoryId, toastId) =>
    set(state => ({
      activeToasts: {
        ...state.activeToasts,
        [factoryId]: [
          ...new Set([...(state.activeToasts[factoryId] ?? []), toastId]),
        ],
      },
    })),

  remove: (factoryId, toastId) =>
    set(state => ({
      activeToasts: {
        ...state.activeToasts,
        [factoryId]: (state.activeToasts[factoryId] ?? []).filter(
          id => id !== toastId,
        ),
      },
    })),

  dismiss: (factoryId, toastId) => {
    toast.dismiss(toastId);
    set(state => ({
      activeToasts: {
        ...state.activeToasts,
        [factoryId]: (state.activeToasts[factoryId] ?? []).filter(
          id => id !== toastId,
        ),
      },
    }));
  },

  dismissAllExcept: keepIds => {
    const totalKeepIds = new Set([...keepIds, ...DEFAULT_KEEP_IDS]);
    const { activeToasts } = get();

    const kept: Record<string, string[]> = {};
    Object.keys(activeToasts).forEach(factoryId => {
      kept[factoryId] = activeToasts[factoryId].filter(id => {
        if (!totalKeepIds.has(id)) {
          toast.dismiss(id);
          return false;
        }
        return true;
      });
    });

    set({ activeToasts: kept });
  },

  dismissStack: (factoryId, stackId) => {
    const { activeToasts } = get();
    (activeToasts[factoryId] ?? []).forEach(id => {
      if (id !== stackId) toast.dismiss(id);
    });
    set(state => ({
      activeToasts: { ...state.activeToasts, [factoryId]: [stackId] },
    }));
  },

  dismissAll: () => {
    toast.dismiss();
    set({ activeToasts: {} });
  },
}));
