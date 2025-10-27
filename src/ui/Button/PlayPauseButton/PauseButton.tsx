import pauseTrack from '@/api/spotify/player/pauseTrack';
import { useDebounce } from '@/hooks/useDebounce';
import { HtmlHTMLAttributes, lazy } from 'react';
import { VARIANTS } from './VARIANTS';

const PauseIcon = lazy(() => import('@/ui/Icons/Pause'));
export interface PauseButtonProps
  extends HtmlHTMLAttributes<HTMLButtonElement> {
  variant?: 'white' | 'grey';
  disabled?: boolean;
}

const PauseButton = ({
  disabled = false,
  variant = 'white',
}: PauseButtonProps) => {
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
