import ERROR_MESSAGES from '@/config/ERROR_MESSAGES';
import { SECOND } from '@/constants/time';
import TOAST_SETTINGS from '@/hooks/toasts/CONFIG';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Slide, toast, ToastIcon, ToastTransitionProps } from 'react-toastify';
import useToastFactory from './useToastFactory';

export function useToast({
  msg,
  toastId,
  isError = true,
  theme,
  icon,
  draggable = true,
  progress = undefined,
  factoryId,
  stack = true,
  autoClose = false,
  transition = Slide,
  hideProgressBar = false,
}: {
  msg?: string | ReactNode;
  icon?: ToastIcon;
  toastId?: string;
  isError?: boolean;
  stack?: boolean;
  progress?: number;
  draggable?: boolean;
  hideProgressBar?: false;
  transition?: ({
    children,
    position,
    preventExitTransition,
    done,
    nodeRef,
    isIn,
    playToast,
  }: ToastTransitionProps) => React.JSX.Element;
  factoryId: string;
  autoClose?: false | number;
  theme?: 'light' | 'dark' | 'colored';
}) {
  const [isActiveToast, setIsActiveToast] = useState(
    toastId ? toast.isActive(toastId) : false,
  );
  const {
    activeToastList,
    addActiveToastList,
    removeFromActiveToastList,
    dismissToast,
    dismissAllExcept,
    dismissAll,
    dismissStack,
  } = useToastFactory({
    id: factoryId,
  });

  const showToast = useCallback(() => {
    if (!msg || !toastId) {
      return;
    }
    if (msg === ERROR_MESSAGES['403'] || msg === ERROR_MESSAGES['401']) {
      return;
    }

    if (stack === false) {
      setIsActiveToast(toast.isActive(toastId));
    }

    const show = isError ? toast.error : toast.success;

    show(msg, {
      ...TOAST_SETTINGS,
      position: 'bottom-right',
      autoClose: isError ? 5 * SECOND : autoClose,
      hideProgressBar,
      draggable,
      progress,
      theme,
      icon,
      toastId,
      transition,
      onOpen: () => {
        addActiveToastList(toastId);
        if (!stack) {
          dismissStack(toastId);
        }
      },
      onClose: () => {
        removeFromActiveToastList(toastId);
      },
    });
  }, [msg, toastId, isError, theme, icon]);

  const updateToast = (toastId: string, NewComponent: ReactNode) =>
    toast.update(toastId, {
      render: NewComponent,
    });

  useEffect(() => {
    setIsActiveToast(toastId ? toast.isActive(toastId) : false);
  }, [showToast, toastId]);

  return {
    dismissAllExcept,
    showToast,
    isActiveToast,
    activeToastList,
    updateToast,
    dismissToast,
    dismissAll,
    dismissStack,
  };
}
