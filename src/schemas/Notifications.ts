import { z } from "zod";

export const NotificationInputSchema = z.object({
    customer_id: z.number(),
    title: z.string(),
    content: z.string(),
    page: z.string(),
});

export type NotificationInput = z.infer<typeof NotificationInputSchema>;