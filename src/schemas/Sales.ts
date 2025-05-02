import { z } from "zod";

export const salesSchema = z.object({
    id: z.string(),
    name: z.string(),
    discount_percentage: z.number(),
    expire_date: z.date(),
    product_id: z.number(),
    pack_id: z.number(),
});

export const salesInputSchema = z.object({
    name: z.string().min(1),
    discount_percentage: z.number().min(0).max(100),
    expire_date: z.date(),
    product_id: z.number().refine((val) => val !== 0, { message: "product_id cannot be 0" }).optional(),
    pack_id: z.number().refine((val) => val !== 0, { message: "pack_id cannot be 0" }).optional(),
});

export type Sales = z.infer<typeof salesSchema>;
export type SalesInput = z.infer<typeof salesInputSchema>;