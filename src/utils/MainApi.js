import {headers, mainApiUrl} from "./constants";

class MainApi {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  async _getJson(response) {
    const contentType = response.headers.get("Content-Type");

    if (!contentType.includes('application/json')) {
      throw new Error('Что-то пошло не так');
    }

    return await response.json();
  }

  async getUser() {
    const headers = Object.assign({}, this._headers);
    headers["Authorization"] = `Bearer ${localStorage.getItem('token')}`;

    const response = await fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers
    });

    const json = await this._getJson(response);

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

    const json = await this._getJson(response);

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

  async createMovie({country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId}) {
    const headers = Object.assign({}, this._headers);
    headers["Authorization"] = `Bearer ${localStorage.getItem('token')}`;

    const response = await fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers,
      body: JSON.stringify({country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId})
    });

    const json = await this._getJson(response);

    switch (response.status) {
      case 200:
        return json;
      case 400:
      case 401:
      case 409:
        throw new Error(json.message);
      default:
        throw new Error('Что-то пошло не так');
    }
  }

  async deleteMovie(movieId) {
    const headers = Object.assign({}, this._headers);
    headers["Authorization"] = `Bearer ${localStorage.getItem('token')}`;

    const response = await fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers
    });

    const json = await this._getJson(response);

    switch (response.status) {
      case 200:
        return json;
      case 400:
      case 401:
      case 403:
      case 404:
        throw new Error(json.message);
      default:
        throw new Error('Что-то пошло не так');
    }
  }

  async getAllMovies() {
    const headers = Object.assign({}, this._headers);
    headers["Authorization"] = `Bearer ${localStorage.getItem('token')}`;

    const response = await fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers
    });

    const json = await this._getJson(response);

    switch (response.status) {
      case 200:
        return json;
      case 401:
        throw new Error(json.message);
      default:
        throw new Error('Что-то пошло не так');
    }
  }
}

const mainApi = new MainApi(mainApiUrl, headers);

export default mainApi;
