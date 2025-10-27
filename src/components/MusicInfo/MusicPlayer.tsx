import PauseButton from '@/ui/Button/PlayPauseButton/PauseButton';
import PlayButton from '@/ui/Button/PlayPauseButton/PlayButton';
import { formatHHMMSS } from '@/utils/string/formatHHMMSS';
import ProgressBar from './ProgressBar';

function MusicPlayer({
  isPlaying,
  uri,
  contextUri,
  durationMs,
  progressMs,
}: Readonly<{
  isPlaying: boolean;
  progressMs: number;
  durationMs: number;
  contextUri: string;
  uri: string;
}>) {
  return (
    <div className="inline-flex w-full relative justify-center-safe align-middle">
      {isPlaying ? (
        <PauseButton />
      ) : (
        <PlayButton
          context={contextUri}
          uri={{ uri: uri }}
          position_ms={progressMs}
        />
      )}
      <ProgressBar progress={progressMs} duration={durationMs} />
      <div className="ml-2 py-1.5">{formatHHMMSS({ utcTime: durationMs })}</div>
    </div>
  );
}

export default MusicPlayer;
