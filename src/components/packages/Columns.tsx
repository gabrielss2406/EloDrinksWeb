'use client'

import { ColumnDef } from "@tanstack/react-table"
import { getDaysSincePost } from "@/utils/days"
import { DataTableColumnHeader } from "@/components/shared/DataTable-Header"
import { Product } from "@/schemas/Products"
import { ProductActions } from "./DataTable-Actions"

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

