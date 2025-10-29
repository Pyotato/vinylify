import { Track } from '@/models/Track';
import api from '../instance';

export type PlayQueueResponse = {
  currently_playing: Track;
  queue: Array<Track>;
};

/**
 * 유저의 현재 재생/ 재생 대기 목록
 */
function getPlayQueue() {
  return api.get(`me/player/queue`).json<PlayQueueResponse>();
}

export default getPlayQueue;
