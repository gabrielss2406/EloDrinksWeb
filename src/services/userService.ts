import { z } from "zod";
import { useQuery } from "@tanstack/react-query";

const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
});

export async function fetchUsers() {
    const res = await fetch("/api/users");
    const data = await res.json();
    return userSchema.array().parse(data);
}

export function useUsers() {
    return useQuery({ queryKey: ["users"], queryFn: fetchUsers });
}
