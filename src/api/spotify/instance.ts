import { SPOTIFY_WEB_API, VINYLIFY_TOKEN } from '@/constants';
import { API } from '@/constants/url';

import ky from 'ky';
import { handleError } from '../config/handleError';

const api = ky.extend({
  prefixUrl: API.SPOTIFY,
  hooks: {
    beforeRequest: [
      req => {
        const token =
          localStorage.getItem(VINYLIFY_TOKEN) ??
          SPOTIFY_WEB_API.getAccessToken();
        return req.headers.set('Authorization', `Bearer ${token}`);
      },
    ],
    beforeError: [handleError],
  },
});

SPOTIFY_WEB_API.setAccessToken(localStorage.getItem(VINYLIFY_TOKEN));
export default api;
