import { z } from "zod";
import { productSchema } from "./Products";

export const packageSchema = z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    eventType: z.string()
});

export const packageInputSchema = z.object({
    name: z.string().min(1),
    price: z.number().min(0.1),
    eventType: z.string().min(1),
    productsList: z.array(productSchema)
});

export type Package = z.infer<typeof packageSchema>;
export type PackageInput = z.infer<typeof packageInputSchema>;