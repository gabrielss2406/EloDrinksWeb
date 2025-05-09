import { z } from "zod";

export const packageProductSchema = z.object({
    id: z.number(),
    quantity: z.number().min(1)
});

export const packageProductViewSchema = z.object({
    id: z.number(),
    quantity: z.number().min(1)
});

export const packageSchema = z.object({
    id: z.string(),
    name: z.string(),
    event_type: z.string(),
    guest_count: z.number(),
    price: z.number(),
    structure_id: z.number(),
    products: z.array(packageProductSchema)
});

export const packageInputSchema = z.object({
    name: z.string().min(1),
    event_type: z.string().min(1),
    guest_count: z.number().min(1).int(),
    price: z.number().min(0.1),
    structure_id: z.number().int(),
    products: z.array(packageProductSchema),
});

export type Package = z.infer<typeof packageSchema>;
export type PackageProduct = z.infer<typeof packageProductSchema>;
export type PackageProductView = z.infer<typeof packageProductViewSchema>;
export type PackageInput = z.infer<typeof packageInputSchema>;