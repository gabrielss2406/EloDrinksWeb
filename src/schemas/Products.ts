import { z } from "zod";

export const productSchema = z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    updatedAt: z.string().datetime().optional(),
});

export const productInputSchema = z.object({
    name: z.string().min(1),
    price: z.number()
});

export type Product = z.infer<typeof productSchema>;
export type ProductInput = z.infer<typeof productInputSchema>;