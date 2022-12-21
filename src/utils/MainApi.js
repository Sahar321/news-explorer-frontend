/*eslint-disable */
class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = { headers: headers };
  }
  customFetch = (url, options) => {
    const token = localStorage.getItem('jwt');
    options.headers.authorization = `Bearer ${token}`;

    return fetch(url, options).then(async (res) =>
      res.ok ? res.json() : Promise.reject(await res.json())
    );
  };

  signin = (data) => {
    return this.customFetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers.headers,
      body: JSON.stringify(data),
    });
  };
  signup = (data) => {
    return this.customFetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers.headers,
      body: JSON.stringify(data),
    });
  };

  checkToken = () => {
    return this.customFetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers.headers,
    });
  };
  getUserInfo() {
    return this.customFetch(`${this._baseUrl}/users/me`, this._headers);
  }
}

const mainApi = new MainApi({
  baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
export default mainApi;
