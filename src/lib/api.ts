import axios from 'axios';

export const api = axios.create({
    baseURL: "",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((request) => {
    const headers = request.headers ?? {};
    const token = localStorage.getItem('token');

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    request.headers = headers;
    return request;
});