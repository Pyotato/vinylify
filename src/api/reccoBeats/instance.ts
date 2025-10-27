import { API } from '@/constants/url';
import ky from 'ky';
import { handleError } from '../config/handleError';

const api = ky.extend({
  prefixUrl: API.RECCOBEATS,
  hooks: {
    beforeRequest: [
      req => {
        return req.headers.set('Accept', `application/json`);
      },
    ],
    beforeError: [handleError],
  },
});
export default api;
