import { z } from "zod";

export const structureSchema = z.object({
    id: z.string(),
    options: z.string(),
    price: z.coerce.number(),
    description: z.string()
});

export const structureInputSchema = z.object({
    options: z.string().min(1),
    price: z.coerce.number().min(0.1),
    description: z.string().min(1)
});

export type Structure = z.infer<typeof structureSchema>;
export type StructureInput = z.infer<typeof structureInputSchema>;