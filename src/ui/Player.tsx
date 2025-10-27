import { useCurrentPlayingTrack } from '@/hooks/query/track/useCurrentPlayingTrack';

import { useQueryClient } from '@tanstack/react-query';
import { HtmlHTMLAttributes, useEffect, useMemo } from 'react';

import PauseButton from './Button/PlayPauseButton/PauseButton';
import PlayButton from './Button/PlayPauseButton/PlayButton';
import LoadingIcon from './Icons/Loading';

export interface PlayerProps extends HtmlHTMLAttributes<HTMLLIElement> {
  contextUri: string;
  id?: string;
  offset?: { uri: string } | { position: number };
  enabled?: boolean;
  variant?: 'white' | 'grey';
}

const Player = ({
  offset,
  contextUri,
  id,
  enabled = false,
  variant = 'white',
}: PlayerProps) => {
  const { data, isLoading } = useCurrentPlayingTrack({ enabled });
  const queryClient = useQueryClient();

  const isSame = useMemo(
    () =>
      data?.item?.id === id ||
      data?.item?.album?.id === id ||
      contextUri === data?.context?.uri,
    [data, id, contextUri],
  );

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

  return data?.is_playing && isSame ? (
    <PauseButton variant={variant} />
  ) : (
    <PlayButton
      context={contextUri}
      position_ms={0}
      uri={offset == null && contextUri != null ? { uri: contextUri } : offset}
    />
  );
};

export default Player;
