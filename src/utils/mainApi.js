import {headers, mainApiUrl} from "./constants";

class MainApi {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  async updateUser(name, email, token) {
    const headers = Object.assign({}, this._headers);
    headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(`${this._baseUrl}/users/me`, {
      method: 'POST',
      headers: this._headers,
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
