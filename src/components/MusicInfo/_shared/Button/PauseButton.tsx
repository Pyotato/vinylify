import pauseTrack from '@/api/spotify/player/pauseTrack';
import { useDebounce } from '@/hooks/useDebounce';
import PauseIcon from '@/ui/Icons/Pause';
import { VARIANTS } from './VARIANTS';

const PauseButton = ({
  disabled = false,
  variant = 'white',
}: {
  disabled?: boolean;
  variant?: 'white' | 'grey';
}) => {
  const onPauseDebounceHandler = useDebounce(() => pauseTrack({}));

  return (
    <button
      className={`border-none hover:cursor-pointer ${VARIANTS[variant]} p-0 w-4 mr-1`}
      disabled={disabled}
      name={'pause button'}
      onClick={onPauseDebounceHandler}
    >
      <PauseIcon />
    </button>
  );
};
export default PauseButton;
