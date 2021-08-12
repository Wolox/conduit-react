import { ApiResponse } from 'apisauce';
import { UseQueryResult } from 'react-query';

import { Articles } from 'types/Article';

export interface Tab<T = void> {
  text: string;
  list: (data?: T) => UseQueryResult<ApiResponse<Articles>>;
}
