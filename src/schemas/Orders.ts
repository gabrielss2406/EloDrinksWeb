import { z } from 'zod';

export const orderTempSchema = z.object({
    id: z.string(),
    customer: z.string(),
    price: z.number(),
    status: z.enum(["pending", "accepted", "confirm", "payed"]),
    startDate: z.string(),
    endDate: z.string(),
    createdAt: z.string(),
});

export const orderSchema = z.object({
    id: z.string(),
    createdAt: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    local: z.string(),
    price: z.number(),
    guestNumber: z.number(),
    status: z.enum(["pending", "accepted", "confirm", "payed"]),
});

export const customerSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
});

export type OrderTemp = z.infer<typeof orderTempSchema>;
export type Order = z.infer<typeof orderSchema>;
export type CustomerInfo = z.infer<typeof customerSchema>;