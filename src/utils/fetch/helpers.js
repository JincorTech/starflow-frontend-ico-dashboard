import { isAuth, getToken, removeToken } from '../auth';

const { API_HOST } = process.env;

export class RequestError extends Error {
  constructor(error) {
    super(error.error);

    this.error = error.error;
    this.statusCode = error.statusCode;
  }
}

export function pathCreator(path) {
  const correctPath = path[0] === '/' ? path : `/${path}`;

  return `${API_HOST}${correctPath}`;
}

/**
 * Checks response status.
 * If status code is not between 200 and 300 throws an error
 *
 * @param  response - http Response object
 * @return            http Response object
 */

export const checkHttpStatus = (res) =>
  (res.ok ? res : res.json());

/**
 * Parse response body to json
 *
 * @param  response - http Response object
 * @return            http Response object
 */

export const parseJSON = (res) => {
  if (res instanceof Response) {
    return res.json();
  }

  if (res.statusCode === 401) {
    removeToken();
  }

  throw new RequestError(res);
};

export function authHeader() {
  return isAuth()
    ? { Authorization: `Bearer ${getToken()}` }
    : {};
}
