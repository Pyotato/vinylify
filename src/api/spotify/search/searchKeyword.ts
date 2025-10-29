import api from '../instance';
/**
 * 앨범, 아티스트, 플레이리스, 트랙 영역에서 검색
 */
export default function searchKeyword(
  searchWord: string,
  signal?: AbortSignal,
  type = 'album,artist,playlist,track',
): Promise<SpotifyApi.SearchResponse> {
  return api
    .get(`search?q=${encodeURIComponent(searchWord)}&type=${type}`, {
      signal,
    })
    .json<SpotifyApi.SearchResponse>();
}
