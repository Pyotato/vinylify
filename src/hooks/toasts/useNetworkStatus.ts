import ERROR_MESSAGES from '@/config/ERROR_MESSAGES';
import { SECOND } from '@/constants/time';
import TOAST_SETTINGS from '@/hooks/toasts/CONFIG';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const RESOLVED = (errorMsg: string) => errorMsg + '_RESOLVED';

function useNetworkStatus() {
  useEffect(() => {
    const showOfflineToast = () => {
      toast.error(ERROR_MESSAGES['408'], {
        ...TOAST_SETTINGS,
        toastId: ERROR_MESSAGES['408'],
      });
    };

    const dismissOfflineToast = () => {
      toast.dismiss(ERROR_MESSAGES['408']);
      toast.success(`Back online!`, {
        ...TOAST_SETTINGS,
        autoClose: 3 * SECOND,
        toastId: RESOLVED(ERROR_MESSAGES['408']),
      });
    };

    if (!navigator.onLine) {
      showOfflineToast();
    }

    window.addEventListener('offline', showOfflineToast);
    window.addEventListener('online', dismissOfflineToast);

    return () => {
      window.removeEventListener('offline', showOfflineToast);
      window.removeEventListener('online', dismissOfflineToast);
    };
  }, []);
}

export default useNetworkStatus;
