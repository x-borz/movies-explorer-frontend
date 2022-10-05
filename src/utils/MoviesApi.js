import {headers, moviesApiUrl} from "./constants";

class MoviesApi {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  async getMovies() {
    const response = await fetch(`${this._baseUrl}/beatfilm-movies`, {
      method: 'GET',
      headers: this._headers
    });

    switch (response.status) {
      case 200:
        return await response.json();
      default:
        throw new Error('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
    }
  }
}

const moviesApi = new MoviesApi(moviesApiUrl, headers);

export default moviesApi;
