import api from './instance';

async function getLyrics({
  artist,
  songTitle,
}: {
  artist: string;
  songTitle: string;
}): Promise<{ lyrics: string }> {
  return api
    .get(`${encodeURIComponent(artist)}/${encodeURIComponent(songTitle)}`)
    .json();
}

export default getLyrics;
