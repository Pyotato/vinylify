import { ACCESS_TOKEN, SPOTIFY_WEB_API, VINYLIFY_TOKEN } from '@/constants';
import { API, PAGE } from '@/constants/url';
import { useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSpotifyAuth } from './query/useAuth';

export const useAuth = () => {
  const [searchParams] = useSearchParams();
  const { data, error, isFetching } = useSpotifyAuth(
    localStorage.getItem(VINYLIFY_TOKEN),
  );
  const navigate = useNavigate();

  if (!isFetching && error != null && window != null) {
    window.location.replace(API.LOGIN);
  }

  const validToken = useMemo(() => {
    if (!SPOTIFY_WEB_API.getAccessToken()) {
      if (
        location.pathname == PAGE.LOGGED_IN &&
        searchParams.has(ACCESS_TOKEN)
      ) {
        const access_token = `${searchParams.get(ACCESS_TOKEN)}`;
        localStorage.setItem(VINYLIFY_TOKEN, access_token);
        SPOTIFY_WEB_API.setAccessToken(access_token);
        return access_token;
      }
    } else {
      if (
        location.pathname == PAGE.LOGGED_IN &&
        searchParams.has(ACCESS_TOKEN)
      ) {
        const access_token = `${searchParams.get(ACCESS_TOKEN)}`;
        localStorage.setItem(VINYLIFY_TOKEN, access_token);
        SPOTIFY_WEB_API.setAccessToken(access_token);
      }
      return SPOTIFY_WEB_API.getAccessToken();
    }
  }, [searchParams, navigate]);

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

  return { validToken, logOut, logIn, signUp };
};
