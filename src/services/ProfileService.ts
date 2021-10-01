import { ApiResponse } from 'apisauce';

import api from 'config/api';
import { PayloadProfile, ResponseProfile } from 'types/profile';

export const getProfileByUsername = ({ username }: PayloadProfile): Promise<ApiResponse<ResponseProfile>> =>
  api.get(`/profiles/${username}`);
