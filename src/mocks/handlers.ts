/* eslint-disable no-magic-numbers */
import { rest } from 'msw';

import api from 'config/api';

import { userProfileMock } from './user';

const handlers = [rest.post('/users', (req, res, ctx) => res(ctx.status(200), ctx.json(userProfileMock)))];

export { handlers, rest, api };
