/*eslint-disable */
import { BASE_URL } from '../constants/config.js';
import {Buffer} from 'buffer';
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
  signinWithGoogle = (data) => {
    return this.customFetch(`${this._baseUrl}/signin/google`, {
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

  saveArticle = (article) => {
    return this.customFetch(`${this._baseUrl}/articles`, {
      method: 'POST',
      headers: this._headers.headers,
      body: JSON.stringify(article),
    });
  };

  deleteArticle = (articleId) => {
    return this.customFetch(`${this._baseUrl}/articles/${articleId}`, {
      method: 'DELETE',
      headers: this._headers.headers,
    });
  };
  getAllArticles = () => {
    return this.customFetch(`${this._baseUrl}/articles`, this._headers);
  };
  getAllArticlesDate = (link) => {
    const linkObj = { link: link };
    return this.customFetch(`${this._baseUrl}/articles/data`, {
      method: 'POST',
      headers: this._headers.headers,
      body: JSON.stringify(linkObj),
    });
  };

  TESTgetAllArticlesDate = () => {
    return this.customFetch(`${this._baseUrl}/articles/data`, this._headers);
  };
  getUserInfo() {
    return this.customFetch(`${this._baseUrl}/users/me`, this._headers);
  }

  // cards
  saveCardReaction = (reactionId) => {
    return this.customFetch(`${this._baseUrl}/reaction`, {
      method: 'POST',
      headers: this._headers.headers,
      body: JSON.stringify(reactionId),
    });
  };

  getAllArticleComments = (articleId) => {
    /* Buffer.from(articleId).toString('base64'));
   Buffer.from("SGVsbG8gV29ybGQ=", 'base64').toString('utf8') */
    const articleIdBase64 = Buffer.from(articleId).toString('base64');
    return this.customFetch(
      `${this._baseUrl}/articles/${articleIdBase64}/comments`,
      this._headers
    );
  };
  saveComment = (comment) => {
    return this.customFetch(`${this._baseUrl}/comment`, {
      method: 'POST',
      headers: this._headers.headers,
      body: JSON.stringify(comment),
    });
  };
}

const mainApi = new MainApi({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
export default mainApi;
