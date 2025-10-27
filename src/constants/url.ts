export const API = {
  LOGIN: 'https://vinylify-express.vercel.app/',
  SPOTIFY: 'https://api.spotify.com/v1/',
  RECCOBEATS: import.meta.env.PROD
    ? 'https://api.reccobeats.com/v1'
    : 'api/reccobeats',
  GENIUS: import.meta.env.PROD ? 'https://api.genius.com' : 'api/genius',
  LYRICS: import.meta.env.PROD ? 'https://api.lyrics.ovh/v1' : 'api/lyrics',
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
