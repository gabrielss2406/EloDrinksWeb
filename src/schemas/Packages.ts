import { z } from "zod";
// import { productSchema } from "./Products";

// export const packageProductSchema = productSchema.extend({
//     quantity: z.number().default(1)
// });

export const packageSchema = z.object({
    id: z.string(),
    name: z.string(),
    event_type: z.string(),
    guest_count: z.number(),
    price: z.number(),
    structure_id: z.number()
    // productsList: z.array(packageProductSchema)
});

export const packageInputSchema = z.object({
    name: z.string().min(1),
    event_type: z.string().min(1),
    guest_count: z.number().min(1).int(),
    price: z.number().min(0.1),
    structure_id: z.number().int()
    // productsList: z.array(packageProductSchema),
});

export type Package = z.infer<typeof packageSchema>;
// export type PackageProduct = z.infer<typeof packageProductSchema>;
export type PackageInput = z.infer<typeof packageInputSchema>;