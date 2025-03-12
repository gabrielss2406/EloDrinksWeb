import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";


export function useLogin() {
    return useMutation({
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            try {
                const response = await api.post("login", {
                    email,
                    password
                })

                localStorage.setItem("token", response.data.token);

                return true
            } catch (error: unknown) {
                console.log(error)
            }
        }
    })
}