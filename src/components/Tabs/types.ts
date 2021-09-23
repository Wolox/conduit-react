import { ApiResponse } from 'apisauce';
import { UseInfiniteQueryResult } from 'react-query';

import { Articles, DataEndpointArticles } from 'types/Article';

export interface Tab {
  text: string;
  list: (payload: DataEndpointArticles) => UseInfiniteQueryResult<ApiResponse<Articles>>;
}
