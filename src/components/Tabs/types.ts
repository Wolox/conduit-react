import { ApiResponse } from 'apisauce';
import { UseQueryResult } from 'react-query';

import { Articles, DataEndpointArticles } from 'types/Article';

export interface Tab {
  text: string;
  list: (payload: DataEndpointArticles) => UseQueryResult<ApiResponse<Articles>>;
}
