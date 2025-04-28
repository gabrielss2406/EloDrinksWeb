import axios from 'axios';
import Cookies from 'js-cookie'

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.NEXT_PUBLIC_API_KEY,
    },
});

export const apiFormData = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        'X-API-Key': process.env.NEXT_PUBLIC_API_KEY,
    },
})

api.interceptors.request.use((request) => {
    const headers = request.headers ?? {};
    const token = Cookies.get('token');

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    request.headers = headers;
    return request;
});

apiFormData.interceptors.request.use((request) => {
    const headers = request.headers ?? {};
    const token = Cookies.get('token');

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    request.headers = headers;
    return request;
});