import ERROR_MESSAGES from '@/config/ERROR_MESSAGES';
import ERROR_NAMES from '@/config/ERROR_NAMES';
import { API } from '@/constants/url';

import ky, { HTTPError } from 'ky';

const api = ky.extend({
  prefixUrl: API.LYRICS,
  hooks: {
    beforeRequest: [
      req => {
        return req.headers.set('Accept', `application/json`);
      },
    ],
    beforeError: [
      (error: HTTPError): HTTPError => {
        const { response } = error;

        if (response && response.body) {
          if (response.status === 404 || response.status === 504) {
            (error as any).handledSilently = true;
            error.name = ERROR_NAMES[response.status];
            error.message = ERROR_MESSAGES[response.status];
            return error;
          }
        } else {
          error.name = ERROR_NAMES.GENERIC_ERROR;
          error.message = ERROR_MESSAGES.GENERIC_ERROR;
        }
        (error as any).handledSilently = true;
        return error;
      },
    ],
  },
});
export default api;
