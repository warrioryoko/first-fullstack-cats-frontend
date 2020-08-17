import request from 'superagent';

const URL = 'http://localhost:3000';

export function fetchCats() {
    return request.get(`${URL}/cats`);
}

export function fetchCat(id) {
    return request.get(`${URL}/cats/${id}`);
}

export function createCat(catData) {
    return request.post(`${URL}/cats`, catData);
}