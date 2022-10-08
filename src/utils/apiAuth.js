export const BASE_URL = 'https://moviesexplorerdiploma.nomoredomains.sbs/api';

const getResponseData = (res) => {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
}

export const register = (data) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(getResponseData);        
}

export const auth = (data) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(getResponseData);
}

export const logout = () => {
    return fetch(`${BASE_URL}/signout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(getResponseData)
  }