export const API = {
  LOGIN: 'https://vinylify-express.vercel.app/',
  SPOTIFY: 'https://api.spotify.com/v1/',
  RECCOBEATS: '/reccobeats/api',
  GENIUS: '/genius/api',
  LYRICS: 'lyrics/api',
  EXPRESS: 'https://vinylify-express.vercel.app/',
} as const;

export const API_TEST = 'api/test' as const;

export const PAGE = {
  MAIN: '/',
  ERROR: '/error',
  MYPAGE: '/mypage',
  SEARCH: '/search',
  MUSIC_INFO: '/music-info',
  LOGGED_IN: '/me',
  SPOTIFY: 'https://open.spotify.com/',
} as const;

export const URL_PARAMS = {
  KEYWORD: 'keyword',
  SCOPE: 'scope',
} as const;
