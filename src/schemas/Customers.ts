import { z } from "zod";

export const customerSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    telephone: z.string(),
    ordersAccount: z.number().default(0)
});

export const customerInputSchema = z.object({
    name: z.string(),
    email: z.string(),
    telephone: z.string()
});

export type Customer = z.infer<typeof customerSchema>;
export type CustomerInput = z.infer<typeof customerInputSchema>;