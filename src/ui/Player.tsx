import { useCurrentPlayingTrack } from '@/hooks/query/track/useCurrentPlayingTrack';

import { useQueryClient } from '@tanstack/react-query';
import { HtmlHTMLAttributes, lazy, useEffect, useMemo } from 'react';

import AddToQueueButton from './AddToQueueButton';
import PauseButton from './Button/PlayPauseButton/PauseButton';
import PlayButton from './Button/PlayPauseButton/PlayButton';

const LoadingIcon = lazy(() => import('./Icons/Loading'));

export interface PlayerProps extends HtmlHTMLAttributes<HTMLLIElement> {
  contextUri: string;
  id?: string;
  offset?: { uri: string } | { position: number };
  enabled?: boolean;
  variant?: 'white' | 'grey';
  title: string;
}

const Player = ({
  offset,
  contextUri,
  id,
  enabled = false,
  variant = 'white',
  title,
  tab,
}: PlayerProps & { tab: string }) => {
  const { data, isLoading } = useCurrentPlayingTrack({ enabled });

  const queryClient = useQueryClient();

  const isSame = useMemo(() => {
    if (tab === 'track') {
      return data?.item?.id === id;
    }

    if (tab === 'playlist' || tab === 'album') {
      return contextUri === data?.context?.uri;
    }

    return (
      data?.item?.id === id ||
      data?.item?.album?.id === id ||
      contextUri === data?.context?.uri
    );
  }, [data, id, contextUri]);

  useEffect(() => {
    if (isSame) {
      queryClient.invalidateQueries({
        queryKey: useCurrentPlayingTrack.queryKey(),
      });
    }
  }, [isSame]);

  if (isLoading) {
    return <LoadingIcon />;
  }

  return (
    <>
      {tab == 'track' && <AddToQueueButton tab={tab} title={title} uri={id} />}
      {data?.is_playing && isSame ? (
        <PauseButton variant={variant} />
      ) : (
        <PlayButton
          id={tab}
          title={title}
          context={contextUri}
          position_ms={0}
          uri={
            offset == null && contextUri != null ? { uri: contextUri } : offset
          }
        />
      )}
    </>
  );
};

export default Player;
