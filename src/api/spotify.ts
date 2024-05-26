import { API, DEFAULT_PLAY_TRACK, PAGE, VINYLIFY_TOKEN } from '@/constants';
import { spotifyWebApi } from '@/contexts';
import ky, { HTTPError } from 'ky';

const api = ky.extend({
  prefixUrl: `${API.SPOTIFY}v1/`,
  hooks: {
    beforeRequest: [
      req =>
        req.headers.set(
          'Authorization',
          `Bearer ${localStorage.getItem(VINYLIFY_TOKEN)}`,
        ),
    ],
  },
});

spotifyWebApi.setAccessToken(localStorage.getItem(VINYLIFY_TOKEN));

/**
 * 토큰 만료하면 제거하고 메인페이지로 이동
 */
const notAuthorizedHandler = (status: number) => {
  if (status !== 401) return;
  console.log('invalid token');
  spotifyWebApi.setAccessToken('');
  localStorage.removeItem(VINYLIFY_TOKEN);
  window.location.replace(PAGE.MYPAGE);
};

/**
 *  활성화된 기기 ID 찾기
 */

export async function getActiveDevice() {
  return await spotifyWebApi.getMyDevices().then(v => {
    return v.devices.filter(device => {
      return device.is_active;
    })[0]?.id;
  });
}

/**
 * top5 청취기록
 */
export async function getTopTracks(limit = 5) {
  try {
    const getResponse = (await api
      .get(`me/top/tracks?time_range=long_term&limit=${limit}`, {})
      .json()) as Tracks;
    return getResponse;
  } catch (e: unknown) {
    const { response } = e as HTTPError;
    notAuthorizedHandler(response?.status);
  }
  return null;
}

/**
 * 트랙 재생하기
 */
export async function playTrack({
  context_uris = DEFAULT_PLAY_TRACK,
  active_device,
  offset = { position: 0 },
}: {
  context_uris: string;
  offset?: { uri?: string; position?: number };
  active_device?: string;
}) {
  try {
    (async () => {
      const postResponse = await ky
        .post(
          `me/player/play?device_id=${active_device || (await getActiveDevice())}`,
          {
            json: {
              context_uri: context_uris,
              offset,
              position_ms: 0,
            },
          },
        )
        .json();
      console.log(postResponse);

      return postResponse;
    })();
  } catch (e: unknown) {
    const { response } = e as HTTPError;
    notAuthorizedHandler(response?.status);
  }
}

// 현제 제셍 노래 정보
export async function getPlayingTrack() {
  try {
    const response = await spotifyWebApi.getMyCurrentPlayingTrack();
    return response?.item as unknown as CurrentlyPlaying;
  } catch (e: unknown) {
    const { response } = e as HTTPError;
    notAuthorizedHandler(response?.status);
  }
  return null;
}

// Top5 기반으로 추천리스트
export async function getRecommendations() {
  try {
    const myTopFive = await getTopTracks().then(v => {
      return v?.items.map(item => item.id).join(',');
    });
    const response = (await api
      .get(`recommendations?limit=5&seed_tracks=${myTopFive}`, {})
      .json()) as Recommendations;
    return response;
  } catch (e: unknown) {
    const { response } = e as HTTPError;
    notAuthorizedHandler(response?.status);
  }
  return null;
}

/**
 * 게시물 다음 페이지 가져오기
 */
export async function getNextPage(endpoint: string) {
  try {
    const getResponse = await api.get(`${endpoint}`, {}).json();
    return getResponse;
  } catch (e: unknown) {
    const { response } = e as HTTPError;
    notAuthorizedHandler(response?.status);
  }
}