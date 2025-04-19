'use client';

import { api } from "@/lib/api";
import { Customer, CustomerInput } from "@/schemas/Customers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCustomers(page: number, pageSize: number) {
    return useQuery<Customer[]>({
        queryKey: ["customers", page, pageSize],
        queryFn: async () => {
            try {
                const response = await api.get("/costumer", {
                    params: {
                        page,
                        size: pageSize,
                    },
                });
                return response.data as Customer[];
            } catch (error: unknown) {
                console.error("Error fetching costumers:", error);
                throw error;
            }
        }
    });
}

export function useUpdateCustomer() {
    const queryClient = useQueryClient();

    return useMutation<Customer, unknown, { id: string; data: CustomerInput }>({
        mutationFn: async ({ id, data }) => {
            try {
                const response = await api.put(`/costumer/${id}`, data);
                return response.data as Customer;
            } catch (error: unknown) {
                console.error("Error updating costumer:", error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["customers"] });
        }
    });
}

export function useDeleteCustomer() {
    const queryClient = useQueryClient();

    return useMutation<void, unknown, string>({
        mutationFn: async (customerId: string) => {
            try {
                await api.delete(`/costumer/${customerId}`);
            } catch (error: unknown) {
                console.error("Error deleting customer:", error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["customers"] });
        }
    });
}
