import api from '../instance';

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
