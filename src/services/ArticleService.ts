import { ApiResponse } from 'apisauce';

import api from 'config/api';
import { ArticleResponse } from 'types/Article';

const MAIN_PATH = '/articles';

interface NewPostPayload {
  body: string;
  description: string;
  tagList: string;
  title: string;
}

export const addNewPost = (payload: NewPostPayload): Promise<ApiResponse<ArticleResponse>> =>
  api.post(MAIN_PATH, payload);
