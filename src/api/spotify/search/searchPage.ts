import { VINYLIFY_TOKEN } from '@/constants';
import { API } from '@/constants/url';
import { SearchResult } from '@/models/Spotify';
import api from '../instance';

const controller = new AbortController();

const extendedApi = api.extend({
  hooks: {
    beforeRequest: [
      (
        req,
        //options
      ) => {
        const url = new URL(req.url);

        if (!url.searchParams.get('query')) {
          // console.log(url.searchParams.get('query'), options.signal);
          controller.abort();
          return;
        }

        return req.headers.set(
          'Authorization',
          `Bearer ${localStorage.getItem(VINYLIFY_TOKEN)}`,
        );
      },
    ],
  },
});

/**
 * 게시물 페이지 가져오기
 */
export default function searchPage(
  endpoint: string,
  signal?: AbortSignal,
): Promise<SearchResult> {
  return extendedApi
    .get(`${endpoint.replace(API.SPOTIFY, '')}`, { signal })
    .json();
}
