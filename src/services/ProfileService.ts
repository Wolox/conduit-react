import { ApiResponse } from 'apisauce';

import api from 'config/api';
import { PayloadProfile, ResponseProfile } from 'types/profile';

export interface PayloadToggleFollow {
  username: string;
  follow: boolean;
}

const MAIN_PATH = '/profiles';

export const getProfileByUsername = ({ username }: PayloadProfile): Promise<ApiResponse<ResponseProfile>> =>
  api.get(`${MAIN_PATH}/${username}`);

export const toggleFollow = ({
  username,
  follow
}: PayloadToggleFollow): Promise<ApiResponse<ResponseProfile>> =>
  follow ? api.delete(`${MAIN_PATH}/${username}/follow`) : api.post(`${MAIN_PATH}/${username}/follow`);
