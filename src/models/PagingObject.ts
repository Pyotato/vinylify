/**
 * Paging Object wrapper used for retrieving collections from the Spotify API.
 * [](https://developer.spotify.com/web-api/object-model/#paging-object)
 */
export interface PagingObject<T> {
  href: string;
  items: T[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}
