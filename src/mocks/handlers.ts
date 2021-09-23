/* eslint-disable no-magic-numbers */
import { rest } from 'msw';

import api, { STATUS_CODES } from 'config/api';

import { MOCKED_ARTICLE_RESPONSE, MOCKED_ARTICLES } from './article';
import { userProfileMock } from './user';

const handlers = [
  rest.get('/articles', (_req, res, ctx) => res(ctx.status(STATUS_CODES.ok), ctx.json(MOCKED_ARTICLES))),
  rest.put('/users', (_req, res, ctx) => res(ctx.status(STATUS_CODES.ok), ctx.json(userProfileMock))),
  rest.post('/users', (_req, res, ctx) => res(ctx.status(STATUS_CODES.ok), ctx.json(userProfileMock))),
  rest.post('/users/login', (_req, res, ctx) => res(ctx.status(STATUS_CODES.ok), ctx.json(userProfileMock))),
  rest.post('/articles', (_req, res, ctx) =>
    res(ctx.status(STATUS_CODES.ok), ctx.json(MOCKED_ARTICLE_RESPONSE))
  )
];

export { handlers, rest, api };
