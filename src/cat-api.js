import request from 'superagent';

const URL = 'http://localhost:3000';

export function fetchCats() {
    try{
        return request.get(`${URL}/cats`);
    } catch(e) {
        return { error: e.message }
    }
}

export function fetchToys() {
    try{
        return request.get(`${URL}/toys`)
    } catch(e) {
        return { error: e.message }
    }
}

export function fetchCat(id) {
    return request.get(`${URL}/cats/${id}`);
}

export function createCat(catData) {
    return request.post(`${URL}/cats`, catData);
}

export function deleteCat(id) {
    return request.delete(`${URL}/cats/${id}`);
}

export function updateCat(id, updatedCat) {
    return request.put(`${URL}/cats/${id}`, updatedCat);
}