import { ApiResponse } from 'apisauce';

import type { Tags } from 'types/Tags';
import api from 'config/api';

const MAIN_PATH = '/tags';

export const tags = (): Promise<ApiResponse<Tags>> => api.get(MAIN_PATH);
