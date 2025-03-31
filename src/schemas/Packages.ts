import { z } from "zod";
import { productSchema } from "./Products";

export const packageProductSchema = productSchema.extend({
    quantity: z.number().default(1)
});

export const packageSchema = z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    eventType: z.string(),
    productsList: z.array(packageProductSchema)
});

export const packageInputSchema = z.object({
    name: z.string().min(1),
    price: z.number().min(0.1),
    eventType: z.string().min(1),
    productsList: z.array(packageProductSchema)
});

export type Package = z.infer<typeof packageSchema>;
export type PackageProduct = z.infer<typeof packageProductSchema>;
export type PackageInput = z.infer<typeof packageInputSchema>;