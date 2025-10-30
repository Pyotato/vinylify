import { ContextObject } from './Context';
import { Track } from './Track';
import { UserDevice } from './UserDevice';

export interface CurrentlyPlayingObject {
  timestamp: number;
  device: UserDevice;
  progress_ms: number | null;
  is_playing: boolean;
  item: Track | null;
  context: ContextObject | null;
}
