/* eslint-disable no-magic-numbers */
import { rest } from 'msw';

import api, { STATUS_CODES } from 'config/api';

import { userProfileMock } from './user';

const handlers = [
  rest.post('/users', (req, res, ctx) => res(ctx.status(STATUS_CODES.ok), ctx.json(userProfileMock))),
  rest.post('/users/login', (req, res, ctx) => res(ctx.status(STATUS_CODES.ok), ctx.json(userProfileMock)))
];

export { handlers, rest, api };
