import api from '../instance';

async function addToPlayQueue({ uri }: { uri: string }) {
  return await api.post(`me/player/queue?uri=spotify:track:${uri}`);
}

export default addToPlayQueue;
