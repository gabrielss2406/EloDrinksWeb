import { api } from "@/lib/api";
import { NotificationInput } from "@/schemas/Notifications";
import { useMutation } from "@tanstack/react-query";

export function useCreateNotification() {
    return useMutation<unknown, unknown, NotificationInput>({
        mutationFn: async (newNotification: NotificationInput) => {
            try {
                const response = await api.post("/notifications", newNotification);
                return response.data;
            } catch (error: unknown) {
                console.error("Error creating Notifications:", error);
                throw error;
            }
        }
    });
}