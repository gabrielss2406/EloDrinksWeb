import { z } from 'zod';

export const paymentSchema = z.object({
    id: z.string(),
    customer: z.string(),
    price: z.number(),
    status: z.enum(["pending", "accepted", "confirm", "payed"]),
    startDate: z.string(),
    endDate: z.string(),
    createdAt: z.string(),
});

export type Payment = z.infer<typeof paymentSchema>;