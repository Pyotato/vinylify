import ERROR_MESSAGES from '@/config/ERROR_MESSAGES';

export const retry = (failureCount: number, error: Error) => {
  if (
    error?.message == ERROR_MESSAGES[401] ||
    error?.message == ERROR_MESSAGES[403] ||
    error?.message == ERROR_MESSAGES[429]
  ) {
    return false;
  }

  if (failureCount < 3 || error?.message == ERROR_MESSAGES[408]) {
    return true;
  } else return false;
};

export const throwOnError = (error: Error) => {
  return (
    error?.message == ERROR_MESSAGES[401] ||
    error?.message == ERROR_MESSAGES[403]
  );
};

const CONFIG = { retry, throwOnError };

export default CONFIG;
