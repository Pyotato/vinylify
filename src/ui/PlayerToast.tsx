import playTrack from '@/api/spotify/player/playTrack';
import { SECOND } from '@/constants/time';
import useActiveDevice from '@/hooks/query/useActiveDevice';
import { useDebounce } from '@/hooks/useDebounce';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { PlayButtonProps } from './Button/PlayPauseButton/PlayButton';
import PlayIcon from './Icons/Play';

const PlayerToast = ({
  context,
  setDeviceId,
  uri,
  position_ms,
  deviceId,
  title,
}: {
  context: string;
  setDeviceId?: Dispatch<SetStateAction<string | null>>;
} & PlayButtonProps) => {
  const { data, refetch } = useActiveDevice();
  const onPlayDebounceHandler = useDebounce(
    async () => {
      playTrack({
        offset: uri,
        position_ms,
        context_uris: context,
        active_device: deviceId,
      });
    },
    [],
    2 * SECOND,
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="inline-flex flex-col p-2">
      {!Array.isArray(data?.devices) ? (
        <>재생가능한 플레이어가 없어요😢</>
      ) : (
        <>
          <div className="font-bold mb-3">
            "<span className="text-gray-800">{title}</span>"를 재생할 디바이스를
            선택해주세요. 🎧
          </div>
          {data?.devices.map(device => (
            <button
              className="inline-flex items-center gap-2 w-max hover:underline hover:cursor-pointer hover:text-gray-300"
              key={device.id}
              onClick={() => {
                if (setDeviceId) {
                  setDeviceId(device.id);
                }
                onPlayDebounceHandler();
              }}
            >
              <PlayIcon /> {device.name}
            </button>
          ))}
        </>
      )}
    </div>
  );
};

export default PlayerToast;
