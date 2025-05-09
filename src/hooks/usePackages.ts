'use client';

import { api } from "@/lib/api";
import { Package, PackageInput } from "@/schemas/Packages";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export function usePackages(page: number, pageSize: number) {
    return useQuery<Package[]>({
        queryKey: ["packages", page, pageSize],
        queryFn: async () => {
            try {
                const response = await api.get("/packs", {
                    params: {
                        page,
                        size: pageSize,
                    },
                });
                console.log(response.data)
                return response.data as Package[];
            } catch (error: unknown) {
                console.error("Error fetching packages:", error);
                throw error;
            }
        }
    });
}

export function useSearchPackages(name: string) {
    return useQuery<Package[]>({
        queryKey: ["packages-search", name],
        queryFn: async () => {
            try {
                const response = await api.get(`/packs/search/?name=${name}`);
                return response.data as Package[];
            } catch (error: unknown) {
                console.error("Error fetching packages:", error);
                throw error;
            }
        },
        enabled: !!name,
    });
}

export function useCreatePackage() {
    const queryClient = useQueryClient();

    return useMutation<Package, unknown, PackageInput>({
        mutationFn: async (newPackage: PackageInput) => {
            try {
                console.log(newPackage)
                const response = await api.post("/packs");
                return response.data as Package;
            } catch (error: unknown) {
                console.error("Error creating package:", error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["packages"] });
            queryClient.invalidateQueries({ queryKey: ["packages-search"] });
        }
    });
}

export function useUpdatePackage() {
    const queryClient = useQueryClient();

    return useMutation<Package, unknown, { id: string; data: PackageInput }>({
        mutationFn: async ({ id, data }) => {
            try {
                const response = await api.put(`/packs/${id}`, data);
                return response.data as Package;
            } catch (error: unknown) {
                console.error("Error updating structure:", error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["packages"] });
            queryClient.invalidateQueries({ queryKey: ["packages-search"] });
        }
    });
}

export function useDeletePackage() {
    const queryClient = useQueryClient();

    return useMutation<void, unknown, string>({
        mutationFn: async (packageId: string) => {
            try {
                await api.delete(`/packs/${packageId}`);
            } catch (error: unknown) {
                console.error("Error deleting package:", error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["packages"] });
            queryClient.invalidateQueries({ queryKey: ["packages-search"] });
        }
    });
}
