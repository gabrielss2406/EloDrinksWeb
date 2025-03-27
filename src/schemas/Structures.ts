import { z } from "zod";

export const structureSchema = z.object({
    id: z.string(),
    options: z.string(),
    price: z.number(),
    description: z.string()
});

export type Structure = z.infer<typeof structureSchema>;