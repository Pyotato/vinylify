import { SECOND } from '@/constants/time';
import TOAST_SETTINGS from '@/hooks/toasts/CONFIG';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

export function useErrorNotifications({
  errorMsg,
  toastId,
  isError = true,
}: {
  errorMsg?: string;
  toastId?: string;
  isError?: boolean;
}) {
  const showErrorToast = useCallback(() => {
    if (errorMsg == null || toastId == null || !isError) {
      return;
    }
    toast.error(`${errorMsg}`, {
      ...TOAST_SETTINGS,
      position: 'bottom-right',
      autoClose: 5 * SECOND,
      hideProgressBar: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
      toastId,
    });
  }, [errorMsg, toastId, isError]);

  return { showErrorToast };
}
