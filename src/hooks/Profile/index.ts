import { useQuery } from 'react-query';

import { getProfileByUsername } from 'services/ProfileService';
import { PayloadProfile } from 'types/profile';

import { KEY_GET_PROFILE } from './constants';

export const useGetProfile = (payload: PayloadProfile) =>
  useQuery([KEY_GET_PROFILE, payload], () => getProfileByUsername(payload));
