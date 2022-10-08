class MoviesApi {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
    }

    getMovies = () => {
        return fetch(this._url, {
            method: 'GET',
            headers: this._headers
        }).then(this._getResponseData);
    }
}
const api = new MoviesApi({
    url: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
      "Content-Type": "application/json",
    }
});

export default api;
