import { Artist } from '@/models/Profile';
import splitLengthyList from '@/utils/array/splitLengthyList';
import api from '../instance';

const MAX_ARTIST_COUNT = 50;

interface MultipleArtistsResponse {
  artists: Artist[];
}

/* 다수 아티스트 검색 */
export default async function getArtistList(artists: string[]) {
  if (artists.length > MAX_ARTIST_COUNT) {
    const results = await Promise.all(
      splitLengthyList(artists).map(list =>
        api.get(`artists?ids=${list.join(',')}`),
      ),
    );
    return results;
  } else {
    const res: MultipleArtistsResponse = await api
      .get(`artists?ids=${artists.join(',')}`)
      .json();
    return res.artists;
  }
}
