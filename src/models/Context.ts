import { ExternalUrlObject } from './externalUrl';

export type ContextObjectType = 'artist' | 'playlist' | 'album';

export interface ContextObject {
  type: ContextObjectType;
  href: string | null;
  external_urls: ExternalUrlObject | null;
  uri: string;
}
