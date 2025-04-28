import { z } from "zod";

export const productSchema = z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    category: z.string(),
    img_url: z.string(),
});

export const productInputSchema = z.object({
    name: z.string().min(1),
    price: z.number(),
    category: z.string(),
    img_url: z.string().optional(),
    img_file: z.instanceof(File).optional(),
});

export type Product = z.infer<typeof productSchema>;
export type ProductInput = z.infer<typeof productInputSchema>;