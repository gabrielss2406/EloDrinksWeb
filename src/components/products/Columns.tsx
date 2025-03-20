"use client"

import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { getDaysSincePost } from "@/utils/days"
import { DataTableColumnHeader } from "@/components/shared/DataTable-Header"
import { Product } from "@/schemas/Products"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
        enableSorting: true,
    },
    {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nome" />,
        enableSorting: true,
    },
    {
        accessorKey: "price",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Preço" />,
        enableSorting: true,
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Atualizado" />,
        cell: ({ row }) => {
            const updatedAt = row.getValue<Date>("updatedAt")
            return <span>{getDaysSincePost(updatedAt)} atrás</span>
        },
        enableSorting: true,
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const product = row.original

            return (
                <ProductActions product={product} />
            )
        },
    },
]

function ProductActions({ product }: { product: Product }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                    <DropdownMenuLabel>Ações em {product.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                    <DropdownMenuItem>Adicionar a pacote</DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.preventDefault();
                            setTimeout(() => setIsDialogOpen(true), 100); // Aguarda o dropdown fechar antes de abrir o diálogo
                        }}
                        className="text-red-500"
                    >
                        Excluir
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Dialog separado para evitar fechamento do Dropdown */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-white">
                    <DialogHeader>
                        <DialogTitle>Tem certeza que deseja excluir {product.name}?</DialogTitle>
                        <DialogDescription>
                            Esta ação não pode ser desfeita. Isso removerá permanentemente {product.name}.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button type="submit" variant={"outline"}>Cancelar</Button>
                        <Button type="submit">Excluir</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}