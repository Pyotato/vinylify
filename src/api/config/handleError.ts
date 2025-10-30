import ERROR_MESSAGES from '@/config/ERROR_MESSAGES';
import ERROR_NAMES from '@/config/ERROR_NAMES';
import { VINYLIFY_TOKEN } from '@/constants';

import type { HTTPError } from 'ky';

export const handleError = (error: HTTPError): HTTPError => {
  const { response } = error;

  if (response && response.body) {
    switch (response.status) {
      case 4001:
      case 4002:
      case 4003:
      case 4004:
      case 4041:
      case 4042:
      case 408:
      case 429:
      case 4291:
      case 500:
      case 530:
        error.name = ERROR_NAMES[response.status];
        error.message = ERROR_MESSAGES[response.status];
        (error as any).handledSilently = true;
        return error;
      case 401:
      case 403:
      case 4032:
        localStorage.removeItem(VINYLIFY_TOKEN); // 스포티파이 인증 관련
        error.name = ERROR_NAMES[response.status];
        error.message = ERROR_MESSAGES[response.status];

        (error as any).handledSilently = true;
        return error;
      default:
        error.name = ERROR_NAMES.GENERIC_ERROR;
        error.message = `${ERROR_MESSAGES.GENERIC_ERROR}: ${error.message}`;
        (error as any).handledSilently = true;
        return error;
    }
  }

  return error;
};
