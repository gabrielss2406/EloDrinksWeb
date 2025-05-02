'use client';

import { api } from "@/lib/api";
import { Sales, SalesInput } from "@/schemas/Sales";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useSales(page: number, pageSize: number) {
    return useQuery<Sales[]>({
        queryKey: ["sales", page, pageSize],
        queryFn: async () => {
            try {
                const response = await api.get("/sales", {
                    params: {
                        page,
                        size: pageSize,
                    },
                });
                return response.data as Sales[];
            } catch (error: unknown) {
                console.error("Error fetching sales:", error);
                throw error;
            }
        }
    });
}

export function useSearchSales(name: string) {
    return useQuery<Sales[]>({
        queryKey: ["sales-search", name],
        queryFn: async () => {
            try {
                const response = await api.get(`/sales/search/?name=${name}`);
                return response.data as Sales[];
            } catch (error: unknown) {
                console.error("Error fetching search sales:", error);
                throw error;
            }
        },
        enabled: !!name,
    });
}

export function useCreateSales() {
    const queryClient = useQueryClient();

    return useMutation<Sales, unknown, SalesInput>({
        mutationFn: async (newSales: SalesInput) => {
            try {
                const formattedData = {
                    ...newSales,
                    expire_date: new Date(newSales.expire_date).toISOString().split('T')[0],
                };

                console.log("Formatted Data:", formattedData);

                ["product_id", "pack_id"].forEach((key) => {
                    if (formattedData[key as keyof typeof formattedData] === -1) {
                        delete formattedData[key as keyof typeof formattedData];
                    }
                });

                const response = await api.post("/sales", formattedData);
                return response.data as Sales;
            } catch (error: unknown) {
                console.error("Error creating sales:", error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sales"] });
            queryClient.invalidateQueries({ queryKey: ["sales-search"] });
        }
    });

}

export function useUpdateSales() {
    const queryClient = useQueryClient();

    return useMutation<Sales, unknown, { id: string; data: SalesInput }>({
        mutationFn: async ({ id, data }) => {
            try {
                const formattedData = {
                    ...data,
                    expire_date: new Date(data.expire_date).toISOString().split('T')[0],
                };

                ["product_id", "pack_id"].forEach((key) => {
                    if (formattedData[key as keyof typeof formattedData] === -1) {
                        delete formattedData[key as keyof typeof formattedData];
                    }
                });

                const response = await api.put(`/sales/${id}`, formattedData);
                return response.data as Sales;
            } catch (error: unknown) {
                console.error("Error updating sales:", error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sales"] });
            queryClient.invalidateQueries({ queryKey: ["sales-search"] });
        }
    });
}

export function useDeleteSales() {
    const queryClient = useQueryClient();

    return useMutation<void, unknown, string>({
        mutationFn: async (salesId: string) => {
            try {
                await api.delete(`/sales/${salesId}`);
            } catch (error: unknown) {
                console.error("Error deleting sales:", error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sales"] });
            queryClient.invalidateQueries({ queryKey: ["sales-search"] });
        }
    });
}
