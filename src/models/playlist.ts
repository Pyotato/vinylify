import { MetaInfo } from '@/models/shared_types';
import { UserProfile } from './profile';

export interface Playlist extends MetaInfo {
  collaborative: boolean;
  description: string;
  owner: UserProfile;
  primary_color?: null | string;
  public?: null | string;
  snapshot_id: string;
  tracks: { href: string; total: number };
}