import { z } from "zod";

export const productSchema = z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    updatedAt: z.string().datetime(),
});

export type Product = z.infer<typeof productSchema>;