import { ACCESS_TOKEN, SPOTIFY_WEB_API, VINYLIFY_TOKEN } from '@/constants';
import { API, PAGE } from '@/constants/url';
import { useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSpotifyAuth } from './query/useSpotifyAuth';

export const useAuth = () => {
  const [searchParams] = useSearchParams();

  const { data, error, isFetching, isLoading, isSuccess } = useSpotifyAuth(
    localStorage.getItem(VINYLIFY_TOKEN),
  );
  const navigate = useNavigate();

  if (!isFetching && error != null && window != null) {
    window.location.replace(API.LOGIN);
  }

  const logOut = useCallback(() => {
    if (SPOTIFY_WEB_API.getAccessToken()) {
      localStorage.removeItem(VINYLIFY_TOKEN);
      SPOTIFY_WEB_API.setAccessToken(null);
      navigate(PAGE.MAIN);
    }
  }, [navigate]);

  const logIn = useCallback(() => {
    if (isFetching || window == null) {
      return;
    }

    window.location.replace(API.LOGIN);
  }, [window, data, isFetching]);

  const signUp = useCallback(() => {
    if (isFetching || window == null) {
      return;
    }
    window.location.replace(PAGE.SPOTIFY);
  }, [window, data, isFetching]);

  // 로그인 경로(/me)에서 (?access_token=XXX)가 있을 경우 등록
  useEffect(() => {
    if (location.pathname == PAGE.LOGGED_IN && searchParams.has(ACCESS_TOKEN)) {
      const access_token = `${searchParams.get(ACCESS_TOKEN)}`;
      localStorage.setItem(VINYLIFY_TOKEN, access_token);
      SPOTIFY_WEB_API.setAccessToken(access_token);
    }
  }, [SPOTIFY_WEB_API, localStorage, searchParams]);

  return {
    logOut,
    logIn,
    signUp,
    isSuccess,
    isLoading,
    token: data.token,
  };
};
