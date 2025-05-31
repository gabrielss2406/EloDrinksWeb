'use client';

import { api } from "@/lib/api";
import { Order } from "@/schemas/Orders";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useOrders(page: number, pageSize: number, all: boolean = false) {
    return useQuery<Order[]>({
        queryKey: ['orders', page, pageSize, all],
        queryFn: async () => {
            try {
                const response = await api.get("/orders", {
                    params: {
                        page,
                        size: pageSize,
                        deleted: all
                    },
                });
                return response.data as Order[];
            } catch (error: unknown) {
                console.error("Error fetching orders:", error);
                throw error;
            }
        }
    });
}

export function useOrder(orderId: string) {
    return useQuery<Order>({
        queryKey: ["order", orderId],
        queryFn: async () => {
            try {
                const response = await api.get(`/orders/${orderId}`);
                return response.data as Order;
            } catch (error: unknown) {
                console.error("Error fetching order:", error);
                throw error;
            }
        }
    });
}

export function useSearchOrders(id: string) {
    const isValidId = /^\d+$/.test(id); // só aceita se for composto apenas por números

    return useQuery<Order[]>({
        queryKey: ["orders-search", id],
        queryFn: async () => {
            try {
                if (!isValidId) return [];
                const response = await api.get(`/orders/customer/${id}`);
                return response.data as Order[];
            } catch (error: unknown) {
                console.error("Error fetching orders customer:", error);
                throw error;
            }
        },
        enabled: isValidId,
    });
}

// export function useUpdateProduct() {
//     const queryClient = useQueryClient();

//     return useMutation<Product, unknown, { id: string; data: ProductInput }>({
//         mutationFn: async ({ id, data }) => {
//             try {
//                 const formData = new FormData();
//                 formData.append("name", data.name);
//                 formData.append("price", data.price.toString());
//                 formData.append("category", data.category);
//                 if (data.img_file) {
//                     formData.append("img_file", data.img_file);
//                 }

//                 const response = await apiFormData.put(`/product/${id}`, formData);

//                 return response.data as Product;
//             } catch (error: unknown) {
//                 console.error("Error updating product:", error);
//                 throw error;
//             }
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["products"] });
//             queryClient.invalidateQueries({ queryKey: ["products-search"] });
//             queryClient.invalidateQueries({ queryKey: ["products-categories"] });
//         }
//     });
// }


export function useConfirmOrder() {
    const queryClient = useQueryClient();

    return useMutation<void, unknown, string>({
        mutationFn: async (newOrderId: string) => {
            try {
                await api.patch(`/orders/${newOrderId}/confirm`);
            } catch (error: unknown) {
                console.error("Error confirm order:", error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            queryClient.invalidateQueries({ queryKey: ["orders-search"] });
        }
    });
}

export function useDeleteOrder() {
    const queryClient = useQueryClient();

    return useMutation<void, unknown, string>({
        mutationFn: async (newOrderId: string) => {
            try {
                await api.patch(`/orders/${newOrderId}/cancel`);
            } catch (error: unknown) {
                console.error("Error deleting order:", error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            queryClient.invalidateQueries({ queryKey: ["orders-search"] });
        }
    });
}
