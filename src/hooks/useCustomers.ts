'use client';

import { api } from "@/lib/api";
import { Customer, CustomerInput } from "@/schemas/Customers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCustomers(page: number, pageSize: number) {
    return useQuery<Customer[]>({
        queryKey: ["customers", page, pageSize],
        queryFn: async () => {
            try {
                const response = await api.get("/customer", {
                    params: {
                        page,
                        size: pageSize,
                    },
                });
                return response.data as Customer[];
            } catch (error: unknown) {
                console.error("Error fetching customers:", error);
                throw error;
            }
        }
    });
}

export function useSearchCustomers(email: string) {
    const isEnabled = !!email && email.trim() !== "";

    return useQuery<Customer[]>({
        queryKey: ["customers-search", email],
        queryFn: async () => {
            try {
                if (!isEnabled) return [];
                const response = await api.get(`/customer/search/?email=${email}`);
                return response.data as Customer[];
            } catch (error: unknown) {
                console.error("Error fetching customers:", error);
                throw error;
            }
        },
        enabled: email.trim() !== "",
    });
}

export function useUpdateCustomer() {
    const queryClient = useQueryClient();

    return useMutation<Customer, unknown, { id: string; data: CustomerInput }>({
        mutationFn: async ({ id, data }) => {
            try {
                const response = await api.put(`/customer/${id}`, data);
                return response.data as Customer;
            } catch (error: unknown) {
                console.error("Error updating customer:", error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["customers"] });
            queryClient.invalidateQueries({ queryKey: ["customers-search"] });
        }
    });
}

export function useDeleteCustomer() {
    const queryClient = useQueryClient();

    return useMutation<void, unknown, string>({
        mutationFn: async (customerId: string) => {
            try {
                await api.delete(`/customer/${customerId}`);
            } catch (error: unknown) {
                console.error("Error deleting customer:", error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["customers"] });
            queryClient.invalidateQueries({ queryKey: ["customers-search"] });
        }
    });
}
