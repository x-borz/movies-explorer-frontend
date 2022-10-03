import {authParams} from "./constants";

class Auth {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  async register(name, email, password) {
    const response = await fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name, email, password})
    });

    const json = await response.json();

    switch (response.status) {
      case 200:
        return json;
      case 409:
        throw new Error(json.message);
      default:
        throw new Error('Что-то пошло не так');
    }
  }

  async authorize(email, password) {
    const response = await fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({email, password})
    });

    const json = await response.json();

    switch (response.status) {
      case 200:
        return json.token;
      case 401:
        throw new Error(json.message);
      default:
        throw new Error('Что-то пошло не так');
    }
  }

  async checkToken(token) {
    const headers = Object.assign({}, this._headers);
    headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers
    });

    const json = await response.json();

    switch (response.status) {
      case 200:
        return json;
      default:
        throw new Error('Что-то пошло не так');
    }
  }
}

const auth = new Auth(authParams);

export default auth;
