'use client';

import { api, apiFormData } from "@/lib/api";
import { Product, ProductInput } from "@/schemas/Products";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useProducts(page: number, pageSize: number) {
    return useQuery<Product[]>({
        queryKey: ["products", page, pageSize],
        queryFn: async () => {
            try {
                const response = await api.get("/product", {
                    params: {
                        page,
                        size: pageSize,
                    },
                });
                return response.data as Product[];
            } catch (error: unknown) {
                console.error("Error fetching products:", error);
                throw error;
            }
        }
    });
}

export function useProduct(productId: string) {
    return useQuery<Product>({
        queryKey: ["product", productId],
        queryFn: async () => {
            try {
                const response = await api.get(`/product/${productId}`);
                return response.data as Product;
            } catch (error: unknown) {
                console.error("Error fetching product:", error);
                throw error;
            }
        }
    });
}

export function useSearchProducts(name: string) {
    const isEnabled = !!name && name.trim() !== "";

    return useQuery<Product[]>({
        queryKey: ["products-search", name],
        queryFn: async () => {
            try {
                if (!isEnabled) return [];
                const response = await api.get(`/product/search?name=${name}`);
                return response.data as Product[];
            } catch (error: unknown) {
                console.error("Error fetching products:", error);
                throw error;
            }
        },
        enabled: isEnabled
    });
}

export function useProductsCategories() {
    return useQuery<string[]>({
        queryKey: ["products-categories"],
        queryFn: async () => {
            try {
                const response = await api.get("/product/categories");
                return response.data as string[];
            } catch (error: unknown) {
                console.error("Error fetching products:", error);
                throw error;
            }
        }
    });
}

export function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation<Product, unknown, ProductInput>({
        mutationFn: async (newProduct: ProductInput) => {
            try {
                const formData = new FormData();
                formData.append("name", newProduct.name);
                formData.append("price", newProduct.price.toString());
                formData.append("category", newProduct.category);
                if (newProduct.img_file) {
                    formData.append("img_file", newProduct.img_file);
                }

                const response = await apiFormData.post("/product", formData);
                return response.data as Product;
            } catch (error: unknown) {
                console.error("Error creating product:", error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["products-search"] });
            queryClient.invalidateQueries({ queryKey: ["products-categories"] });
        }
    });
}

export function useUpdateProduct() {
    const queryClient = useQueryClient();

    return useMutation<Product, unknown, { id: string; data: ProductInput }>({
        mutationFn: async ({ id, data }) => {
            try {
                const formData = new FormData();
                formData.append("name", data.name);
                formData.append("price", data.price.toString());
                formData.append("category", data.category);
                if (data.img_file) {
                    formData.append("img_file", data.img_file);
                }

                const response = await apiFormData.put(`/product/${id}`, formData);

                return response.data as Product;
            } catch (error: unknown) {
                console.error("Error updating product:", error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["products-search"] });
            queryClient.invalidateQueries({ queryKey: ["products-categories"] });
        }
    });
}

export function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation<void, unknown, string>({
        mutationFn: async (newProductId: string) => {
            try {
                await api.delete(`/product/${newProductId}`);
            } catch (error: unknown) {
                console.error("Error deleting product:", error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["products-search"] });
            queryClient.invalidateQueries({ queryKey: ["products-categories"] });
        }
    });
}
