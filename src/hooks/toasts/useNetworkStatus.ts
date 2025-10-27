import ERROR_MESSAGES from '@/config/ERROR_MESSAGES';
import ERROR_NAMES from '@/config/ERROR_NAMES';
import { SECOND } from '@/constants/time';
import TOAST_SETTINGS from '@/hooks/toasts/CONFIG';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

function useNetworkStatus() {
  useEffect(() => {
    const showOfflineToast = () => {
      toast.error(ERROR_MESSAGES[408], {
        ...TOAST_SETTINGS,
        toastId: ERROR_NAMES[408],
      });
    };

    const dismissOfflineToast = () => {
      toast.dismiss(ERROR_NAMES[408]);
      toast.success(`Back online!`, {
        ...TOAST_SETTINGS,
        autoClose: 5 * SECOND,
        hideProgressBar: false,
        toastId: ERROR_NAMES[408] + '_RESOLVED',
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
