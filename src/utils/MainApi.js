import {headers, mainApiUrl} from "./constants";

class MainApi {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  async getUser() {
    const headers = Object.assign({}, this._headers);
    headers["Authorization"] = `Bearer ${localStorage.getItem('token')}`;

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

  async updateUser(name, email) {
    const headers = Object.assign({}, this._headers);
    headers["Authorization"] = `Bearer ${localStorage.getItem('token')}`;

    const response = await fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({name, email})
    });

    const json = await response.json();

    switch (response.status) {
      case 200:
        return json;
      case 400:
      case 401:
      case 404:
      case 409:
        throw new Error(json.message);
      default:
        throw new Error('Что-то пошло не так');
    }
  }
}

const mainApi = new MainApi(mainApiUrl, headers);

export default mainApi;