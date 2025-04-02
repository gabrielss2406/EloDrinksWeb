import { z } from "zod";

export const customerSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    telephone: z.string(),
    ordersAccount: z.number()
});

export type Customer = z.infer<typeof customerSchema>;