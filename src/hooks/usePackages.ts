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
                return response.data as Package[];
            } catch (error: unknown) {
                console.error("Error fetching packages:", error);
                throw error;
            }
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        staleTime: 1000 * 60 * 5
    });
}

export function usePackage(id: string) {
    return useQuery<Package>({
        queryKey: ["package", id],
        queryFn: async () => {
            try {
                const response = await api.get(`/packs/${id}`);
                return response.data as Package;
            } catch (error: unknown) {
                console.error("Error fetching package:", error);
                throw error;
            }
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        staleTime: 1000 * 60 * 5
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
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        staleTime: 1000 * 60 * 5,
        enabled: !!name,
    });
}

export function useCreatePackage() {
    const queryClient = useQueryClient();

    return useMutation<Package, unknown, PackageInput>({
        mutationFn: async (newPackage: PackageInput) => {
            try {
                const response = await api.post("/packs", newPackage);
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
