import { z } from 'zod';
import { productSchema } from './Products';

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
    guestNumber: z.number(),
    status: z.enum(["pending", "accepted", "confirm", "payed"]),
});

export const customerSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
});

export const budgetProductSchema = productSchema.extend({
    quantity: z.number().default(1)
});

export const budgetSchema = z.object({
    eventType: z.string(),
    items: z.array(budgetProductSchema),
    barStructure: z.string(),
    structurePrice: z.number(),
    totalPrice: z.number(),
});

export type OrderTemp = z.infer<typeof orderTempSchema>;
export type Order = z.infer<typeof orderSchema>;
export type CustomerInfo = z.infer<typeof customerSchema>;
export type BudgetProduct = z.infer<typeof budgetProductSchema>;
export type Budget = z.infer<typeof budgetSchema>;