/* eslint-disable no-magic-numbers */
import { rest } from 'msw';

import api, { STATUS_CODES } from 'config/api';

import { MOCKED_ARTICLE_RESPONSE } from './article';
import { userProfileMock } from './user';

const handlers = [
  rest.post('/users', (_req, res, ctx) => res(ctx.status(STATUS_CODES.ok), ctx.json(userProfileMock))),
  rest.post('/users/login', (_req, res, ctx) => res(ctx.status(STATUS_CODES.ok), ctx.json(userProfileMock))),
  rest.post('/articles', (_req, res, ctx) =>
    res(ctx.status(STATUS_CODES.ok), ctx.json(MOCKED_ARTICLE_RESPONSE))
  )
];

export { handlers, rest, api };
