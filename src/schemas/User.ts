import { z } from 'zod';

export const loginSchema = z.object({
    email: z
        .string({ required_error: "Email obrigatório" })
        .min(1, { message: "Email não pode estar vazio" })
        .max(80, { message: "Email muito longo" }),
    password: z
        .string({ required_error: "Senha obrigatória" })
        .min(2, { message: "Senha não pode estar vazia" })
        .max(30, { message: "Senha muito longa" })
});

export type LoginType = z.infer<typeof loginSchema>