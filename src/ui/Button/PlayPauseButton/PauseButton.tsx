import pauseTrack from '@/api/spotify/player/pauseTrack';
import { useDebounce } from '@/hooks/useDebounce';
import PauseIcon from '../../Icons/Pause';
import Button from '../Button';

const PauseButton = () => {
  const onPauseDebounceHandler = useDebounce(() => pauseTrack({}));

  return (
    <Button onClick={onPauseDebounceHandler} name={'pause track'}>
      <PauseIcon />
    </Button>
  );
};
export default PauseButton;
