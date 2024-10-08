import { API } from '@/constants/url';
import { CurrentTrackSearchParam } from '@/hooks/query/useCurrentPlayingTrackLyrics';
import ky from 'ky';
import { geniusSearchUrl } from './geniusLyricsUrl';
const api = ky.extend({
  prefixUrl: API.EXPRESS,
  hooks: {
    afterResponse: [
      (_, __, res) => {
        console.log(res?.status);
        if (res?.status === 401) {
          console.log('invalid token');
        } else if (res?.status === 429) {
          console.log('too many requests..');
        }
      },
    ],
  },
});

interface LyricsSearchResponse {
  params: string;
  result?: string;
}

export async function geniusSearch({
  search_artist_term,
  artist,
  term,
}: CurrentTrackSearchParam) {
  const url = await geniusSearchUrl({ search_artist_term, artist, term });
  console.log('geniusSearch', url);
  if (url == null) return null;
  const res: LyricsSearchResponse = await api
    .get(`lyrics`, {
      searchParams: { q: url },
    })
    .json();
  return res;
}
