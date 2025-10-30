import { SearchResponse } from '@/models/Response';
import searchKeyword from '../search/searchKeyword';
import getTopTracks from './getTopTracks';

/**
 * top1 아티스트 기반 디폴트 검색
 */
export default async function searchFromMyTopOne({
  signal,
}: {
  signal?: AbortSignal;
}): Promise<{
  keyword: string;
  response: SearchResponse;
}> {
  const topArtistName = (await getTopTracks(1)).items[0]?.artists[0]?.name;
  if (!topArtistName) {
    throw new Error('top artist name is null');
  }
  const response = await searchKeyword(`${topArtistName}`, signal);
  return { keyword: topArtistName, response };
}
