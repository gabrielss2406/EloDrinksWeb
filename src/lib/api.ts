import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.NEXT_PUBLIC_API_KEY,
    },
});

// api.interceptors.request.use((request) => {
//     const headers = request.headers ?? {};
//     const token = localStorage.getItem('token');

//     if (token) {
//         headers.Authorization = `Bearer ${token}`;
//     }

//     request.headers = headers;
//     return request;
// });