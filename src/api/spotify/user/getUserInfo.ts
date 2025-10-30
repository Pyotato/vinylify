import { CurrentUsersProfileResponse } from '@/models/Response';
import api from '../instance';

export default function getUserInfo(): Promise<CurrentUsersProfileResponse> {
  return api.get(`me`).json();
}
