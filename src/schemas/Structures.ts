import { z } from "zod";

export const structureSchema = z.object({
    id: z.string(),
    name: z.string(),
    price: z.coerce.number(),
});

export const structureInputSchema = z.object({
    name: z.string().min(1),
    price: z.coerce.number().min(0.1)
});

export type Structure = z.infer<typeof structureSchema>;
export type StructureInput = z.infer<typeof structureInputSchema>;