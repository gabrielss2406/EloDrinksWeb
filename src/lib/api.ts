import axios, { InternalAxiosRequestConfig, AxiosError } from 'axios'
import Cookies from 'js-cookie'
import Router from 'next/router'

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.NEXT_PUBLIC_API_KEY,
    },
})

export const apiFormData = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        'X-API-Key': process.env.NEXT_PUBLIC_API_KEY,
    },
})

const attachToken = (request: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = Cookies.get('elodrinks_token')

    if (token && request.headers) {
        request.headers.Authorization = `Bearer ${token}`
    }

    return request
}

const handleResponseError = (error: AxiosError) => {
    if (error.response?.status === 401) {
        Cookies.remove('elodrinks_token')
        Router.push('/login')
    }
    return Promise.reject(error)
}

api.interceptors.request.use(attachToken)
api.interceptors.response.use(res => res, handleResponseError)

apiFormData.interceptors.request.use(attachToken)
apiFormData.interceptors.response.use(res => res, handleResponseError)
