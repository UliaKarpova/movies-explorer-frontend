import { connectionError } from "./messages_errors";

export const BASE_URL = 'https://moviesexplorerdiploma.nomoredomains.sbs/api';

const getResponseData = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return res.json()
            .then((data) => {
                console.log(data.validation?.body.message ? data.validation.body.message : data.message);
                return Promise.reject(data.validation?.body.message || data.message);
            })
    }
}


export const register = (data) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(getResponseData)
    .catch((err) => {
        return typeof err !== 'string' ? Promise.reject(connectionError) : Promise.reject(err);
    })
}

export const auth = (data) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
        }).then(getResponseData)
        .then((data) => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                return data;
            }
        }).catch((err) => {
            return typeof err !== 'string' ? Promise.reject(connectionError) : Promise.reject(err);
        })

}

export const getUserInfo = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
    }).then(getResponseData)
    .catch((err) => {
        return typeof err !== 'string' ? Promise.reject(connectionError) : Promise.reject(err);
    })}

export const patchtUserInfo = (token, data) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(data)
    }).then(getResponseData)
    .catch((err) => {
        return typeof err !== 'string' ? Promise.reject(connectionError) : Promise.reject(err);
    })}