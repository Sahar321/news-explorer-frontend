/*eslint-disable */
import { BASE_URL } from '../constants/config.js';
class NewsApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = { headers: headers };
  }
  customFetch = (url, options) => {
    /*    const token = localStorage.getItem('jwt');
    options.headers.authorization = `Bearer ${token}`; */

    return fetch(url, options).then(async (res) =>
      res.ok ? res.json() : Promise.reject(await res.json())
    );
  };

  everything = (query) => {
    return this.customFetch(
      `${this._baseUrl}/v2/everything?q=${query}&from=${this.getLastDateFrom(
        7
      )}&to=${this.getLastDateFrom(0)}`,
      this._headers
    );
  };

  getLastDateFrom = (DaysAgo) => {
    const now = new Date();
    const result = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - DaysAgo
    );
    return `${result.getFullYear()}-${result.getMonth()}-${result.getDate()}`;
  };
}

const newsApi = new NewsApi({
  baseUrl: `${BASE_URL}/news`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
export default newsApi;
