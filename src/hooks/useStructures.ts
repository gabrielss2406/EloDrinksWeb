'use client';

import { api } from "@/lib/api";
import { Structure, StructureInput } from "@/schemas/Structures";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export function useStructures(page: number, pageSize: number) {
    return useQuery<Structure[]>({
        queryKey: ["structures", page, pageSize],
        queryFn: async () => {
            try {
                const response = await api.get("/structure", {
                    params: {
                        page,
                        size: pageSize,
                    },
                });
                return response.data as Structure[];
            } catch (error: unknown) {
                console.error("Error fetching structures:", error);
                throw error;
            }
        }
    });
}

export function useSearchStructures(name: string) {
    const isEnabled = !!name && name.trim() !== "";

    return useQuery<Structure[]>({
        queryKey: ["structures-search", name],
        queryFn: async () => {
            try {
                if (!isEnabled) return [];
                const response = await api.get(`/structure/search/?name=${name}`);
                return response.data as Structure[];
            } catch (error: unknown) {
                console.error("Error fetching structures:", error);
                throw error;
            }
        },
        enabled: isEnabled
    });
}

export function useCreateStructure() {
    const queryClient = useQueryClient();

    return useMutation<Structure, unknown, StructureInput>({
        mutationFn: async (newStructure: StructureInput) => {
            try {
                const response = await api.post("/structure", newStructure);
                return response.data as Structure;
            } catch (error: unknown) {
                console.error("Error creating structure:", error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["structures"] });
            queryClient.invalidateQueries({ queryKey: ["structures-search"] });
        }
    });
}

export function useUpdateStructure() {
    const queryClient = useQueryClient();

    return useMutation<Structure, unknown, { id: string; data: StructureInput }>({
        mutationFn: async ({ id, data }) => {
            try {
                const response = await api.put(`/structure/${id}`, data);
                return response.data as Structure;
            } catch (error: unknown) {
                console.error("Error updating structure:", error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["structures"] });
            queryClient.invalidateQueries({ queryKey: ["structures-search"] });
        }
    });
}

export function useDeleteStructure() {
    const queryClient = useQueryClient();

    return useMutation<void, unknown, string>({
        mutationFn: async (structureId: string) => {
            try {
                await api.delete(`/structure/${structureId}`);
            } catch (error: unknown) {
                console.error("Error deleting structure:", error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["structures"] });
            queryClient.invalidateQueries({ queryKey: ["structures-search"] });
        }
    });
}
