class MainApi {
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

    getUserInfo = () => {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers,
            credentials: 'include'
        }).then(this._getResponseData);
    }

    getSavedMovies = () => {
        return fetch(`${this._url}/movies`, {
            method: 'GET',
            headers: this._headers,
            credentials: 'include'
        }).then(this._getResponseData);
    }

    saveMovie = (data) => {
        return fetch(`${this._url}/movies`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify(data)
        }).then(this._getResponseData);
    }

    deleteMovie = (data) => {
        return fetch(`${this._url}/movies/${data.movieId}`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: 'include'
        }).then(this._getResponseData);
    }
}

const mainApi = new MainApi({
    url: 'https://moviesexplorerdiploma.nomoredomains.sbs/api',
    headers: {
      "Content-Type": "application/json",
    }
});

export default mainApi;
