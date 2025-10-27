import { MetaInfo } from '@/models/MetaInfo';
import getTracks from '../spotify/track/getTracks';
import getTopTracks from '../spotify/user/getTopTracks';

import api from './instance';

export interface Artist extends MetaInfo {
  id: string;
  name: string;
  href: string;
}

export type Recommendation = {
  id: string;
  trackTitle: string;
  availableCountries: string[];
  isrc: string;
  durationMs: number;
  href: string;
  ean?: string;
  upc?: string;
  artists: Artist[];
  popularity: number;
};

export type RecommendationResponse = {
  content: Recommendation[];
};
// alternative to spotify recommendations since deprecation
async function getRecommendations(size: number = 20) {
  const seeds = (await getTopTracks(5)).items.map(item => item.id);
  const response = await api
    .get(`track/recommendation?size=${size}&seeds=${seeds.join(',')}`)
    .json();

  const data = getTracks({
    tracks: (response as RecommendationResponse).content.map(item => {
      const id = item.href.replace('https://open.spotify.com/track/', '');
      return id;
    }),
  });
  return data;
}

export default getRecommendations;
