import { create } from 'apisauce';

const baseURL = process.env.REACT_APP_BASE_URL;

if (baseURL === 'http://wolox.com' || !baseURL) {
  console.warn('API baseURL has not been properly initialized'); // eslint-disable-line no-console
}

export const STATUS_CODES = {
  ok: 200,
  unauthorized: 401,
  unprocessableEntity: 422
};

const api = create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// If you need to add more monitors consider calling api.addMonitor from your component
// eslint-disable-next-line no-unused-vars, prettier/prettier, @typescript-eslint/no-unused-vars
export const apiSetup = (unauthorizedCallback, networkErrorCallback) => {
  api.addMonitor((response) => {
    if (response.status === STATUS_CODES.unauthorized) {
      /*
       * TODO: These callbacks should only be called if no other callback was asigned for the response.
       * - i.e: unauthorizedCallback?.(response)
       */
    }
  });

  api.addMonitor((response) => {
    if (response.problem === 'NETWORK_ERROR') {
      /*
       * TODO: These callbacks should only be called if no other callback was asigned for the response.
       * - i.e: networkErrorCallback?.(response)
       */
    }
  });
};

export default api;
