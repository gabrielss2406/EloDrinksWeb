import { apiFormData } from '@/lib/api'
import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'

type LoginInput = {
    email: string
    password: string
}

type LoginResponse = {
    access_token: string
    token_type: string
}

export function useLogin() {
    return useMutation<LoginResponse, unknown, LoginInput>({
        mutationFn: async ({ email, password }: LoginInput) => {
            const formData = new FormData()
            formData.append('username', email)
            formData.append('password', password)
            formData.append('scope', 'admin')

            const response = await apiFormData.post('/login', formData)
            const { access_token, token_type } = response.data

            Cookies.set('elodrinks_token', access_token)

            return { access_token, token_type }
        }
    })
}

export function useLogout() {
    Cookies.remove('elodrinks_token')
}
