"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

async function fetchUsers() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error("Erro ao buscar usuários");
    return res.json();
}

export default function UserList() {
    const { data: users, isLoading, error } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
    });

    if (isLoading) return <Skeleton className="h-20 w-full" />;
    if (error) return <p className="text-red-500">Erro ao carregar usuários.</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {users.map((user: { id: number; name: string; email: string }) => (
                <Card key={user.id}>
                    <CardContent className="p-4">
                        <h2 className="text-lg font-semibold">{user.name}</h2>
                        <p className="text-gray-500">{user.email}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
