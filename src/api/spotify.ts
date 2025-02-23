import {
  DEFAULT_PLAY_TRACK,
  SPOTIFY_WEB_API,
  VINYLIFY_TOKEN,
} from '@/constants';
import { API } from '@/constants/url';
import { Artist } from '@/models/Profile';

import { SearchResult, TrackSearchResult } from '@/models/Spotify';
import { Track } from '@/models/Track';
import { chunks } from '@/utils/array';

import ky, { HTTPError } from 'ky';

SPOTIFY_WEB_API.setAccessToken(
  localStorage.getItem(VINYLIFY_TOKEN) ?? SPOTIFY_WEB_API.getAccessToken(),
);

const api = ky.extend({
  prefixUrl: API.SPOTIFY,
  hooks: {
    beforeRequest: [
      req =>
        req.headers.set(
          'Authorization',
          `Bearer ${localStorage.getItem(VINYLIFY_TOKEN)}`,
        ),
    ],
    afterResponse: [
      (_, __, res) => {
        if (res?.status === 401) {
          console.log('invalid token');
          SPOTIFY_WEB_API.setAccessToken(null);
          localStorage.removeItem(VINYLIFY_TOKEN);
          window.location.replace(API.LOGIN);
        } else if (res?.status === 429) {
          console.log('too many requests..');
        }
      },
    ],
  },
});

/**
 *  활성화된 기기 ID 찾기
 */

export async function getActiveDevice() {
  const currentActiveDevice = await SPOTIFY_WEB_API.getMyDevices().then(
    res =>
      res.devices.filter(device => {
        return device.is_active;
      })[0]?.id,
  );
  if (currentActiveDevice == null) {
    return SPOTIFY_WEB_API.getMyDevices().then(res => res?.devices[0]?.id);
  }
  return currentActiveDevice;
}

/**
 * top5 청취기록
 */
export async function getTopTracks(limit = 5) {
  return api
    .get(`me/top/tracks?time_range=short_term&limit=${limit}`, {})
    .json() as unknown as TrackSearchResult;
}

/**
 * 트랙 재생하기
 */
export async function playTrack({
  context_uris = DEFAULT_PLAY_TRACK,
  active_device,
  uri,
  offset = { position: 0 },
  position_ms = 0,
}: {
  context_uris?: string;
  offset?: { uri?: string; position?: number };
  active_device?: string;
  position_ms?: number;
  uri?: string;
}) {
  const data =
    uri == null
      ? {
          json: {
            context_uri: context_uris,
            offset,
            position_ms,
          },
        }
      : {
          json: {
            offset,
            uris: [uri],
            position_ms,
          },
        };
  return api
    .put(
      `me/player/play?device_id=${active_device ?? (await getActiveDevice())}`,
      { ...data },
    )
    .json();
}

/**
 * 트랙 중지하기
 */
export async function pauseTrack({
  active_device,
}: {
  active_device?: string | null;
}) {
  return api
    .put(`me/player/pause`, {
      json: {
        device_id: active_device ?? (await getActiveDevice()),
      },
    })
    .json();
}

/**
 * 현제 제셍 노래 정보
 */
export function getPlayingTrack() {
  return SPOTIFY_WEB_API.getMyCurrentPlayingTrack();
}

// Top5 기반으로 추천리스트
export async function getRecommendations(limit = 20) {
  try {
    const topFiveIds = (await getTopTracks()).items
      .map(item => item.id)
      .join(',');
    const response = await api
      .get(`recommendations?limit=${limit}&seed_tracks=${topFiveIds}`, {})
      .json<{ tracks?: Track[] }>();
    return response;
  } catch (e: unknown) {
    const { response } = e as HTTPError;
    throw new Error(`${response?.status}`);
  }
}

/**
 * 게시물 페이지 가져오기
 */
export async function getPage(endpoint: string) {
  return api
    .get(`${endpoint.replace(API.SPOTIFY, '')}`, {})
    .json() as unknown as SearchResult;
}

/**
 * 아티스트 정보 가져오기
 */
export async function getArtists(artists: string[]) {
  try {
    const removedDuplicateArtists = [...new Set(artists)];
    // 아티스트 id 요청이 너무 많으면 400 에러 => 20 개씩 나눠서 요청
    if (removedDuplicateArtists.length >= 20) {
      const artistGroupedBy20 = chunks(20)(removedDuplicateArtists);
      const res = await Promise.all(
        artistGroupedBy20.map((artists: string[]) =>
          SPOTIFY_WEB_API.getArtists(artists),
        ),
      ).then(v => v.flat());
      return res.map(v => v?.artists).flat();
    }

    const response = await SPOTIFY_WEB_API.getArtists(removedDuplicateArtists);
    if ('artists' in response) return response.artists as unknown as Artist[];
    else throw new Error('something went wrong...');
  } catch (e: unknown) {
    const { response } = e as HTTPError;
    throw new Error(`${response.status}`);
  }
}

/**
 * 아티스트 정보 가져오기
 */
export function searchKeyword(searchWord: string | null) {
  if (!searchWord) throw new Error(`no searchword provided`);
  const response = SPOTIFY_WEB_API.search(searchWord, [
    'album',
    'artist',
    'playlist',
    'track',
  ]);
  return response as unknown as SearchResult;
}

/**
 * top1 아티스트 기반 디폴트 검색
 */
export async function searchFromMyTopOne() {
  try {
    const topArtistName = (await getTopTracks(1)).items[0]?.artists[0]?.name;
    if (!topArtistName) throw new Error('something went wrong...');
    const response = searchKeyword(`${topArtistName}`);
    return { keyword: topArtistName, response } as unknown as {
      keyword: string;
      response: SearchResult;
    };
  } catch (e: unknown) {
    const { response } = e as HTTPError;
    throw new Error(`${response.status}`);
  }
}

/**
 * artist top tracks : 재생 중인 트랙의 아티스트의 top 10 tracks
 */
export async function getArtistTopTracks({ id }: { id: string }) {
  return api.get(`artists/${id}/top-tracks`, {}).json<{ tracks: Track[] }>();
}
