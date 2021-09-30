/* eslint-disable no-magic-numbers */
import { rest } from 'msw';

import api, { STATUS_CODES } from 'config/api';

import { MOCKED_ARTICLE_RESPONSE, MOCKED_ARTICLES } from './article';
import { MOCK_USER, userProfileMock } from './user';

const handlers = [
  rest.get('/articles', (_req, res, ctx) => res(ctx.status(STATUS_CODES.ok), ctx.json(MOCKED_ARTICLES))),
  rest.put('/users', (_req, res, ctx) => res(ctx.status(STATUS_CODES.ok), ctx.json(userProfileMock))),
  rest.post('/users', (_req, res, ctx) => res(ctx.status(STATUS_CODES.ok), ctx.json(userProfileMock))),
  rest.post('/users/login', (_req, res, ctx) => res(ctx.status(STATUS_CODES.ok), ctx.json(userProfileMock))),
  rest.post('/articles', (_req, res, ctx) =>
    res(ctx.status(STATUS_CODES.ok), ctx.json(MOCKED_ARTICLE_RESPONSE))
  ),
  rest.post('/articles/titleArticle/favorite', (req, res, ctx) =>
    res(ctx.status(STATUS_CODES.ok), ctx.json({ data: MOCKED_ARTICLE_RESPONSE }))
  ),
  rest.delete('/articles/titleArticle/favorite', (req, res, ctx) =>
    res(ctx.status(STATUS_CODES.ok), ctx.json({ data: MOCKED_ARTICLE_RESPONSE }))
  ),
  rest.get('/user', (_req, res, ctx) => res(ctx.status(STATUS_CODES.ok), ctx.json({ data: MOCK_USER })))
];

export { handlers, rest, api };
