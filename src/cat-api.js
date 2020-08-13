/* eslint-disable */

import request from 'superagent';

const URL = 'https://quiet-depths-77131.herokuapp.com';

export function fetchCats() {
    return request.get(`${URL}/cats`);
}

export function fetchCat(id) {
    return request.get(`${URL}/cats/${id}`);
}