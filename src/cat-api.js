/* eslint-disable */

import request from 'superagent';

const URL = process.env.REACT_APP_API_URL;

export function fetchCats() {
    return request.get(`${URL}/cats`);
}

export function fetchCat(id) {
    return request.get(`${URL}/cats/${id}`);
}

export function createCat(catData) {
    return request.post(`${URL}/cats`, catData);
}