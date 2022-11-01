const token = localStorage.getItem('token');

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

    getSavedMovies = () => {
        return fetch(`${this._url}`, {
            method: 'GET',
            headers: this._headers,
        }).then(this._getResponseData);
    }

    saveMovie = (data) => {
        return fetch(`${this._url}`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        }).then(this._getResponseData);
    }

    deleteMovie = (data) => {
        console.log(data);
        return fetch(`${this._url}/${data}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._getResponseData);
    }
} 

const mainApi = new MainApi({
    url: 'https://moviesexplorerdiploma.nomoredomains.sbs/api/movies',
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    }
});

export default mainApi;
