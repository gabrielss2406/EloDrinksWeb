'use client'

import { ColumnDef } from "@tanstack/react-table"
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
        accessorKey: "category",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nome" />,
        enableSorting: true,
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const product = row.original

            return (
                <ProductActions key={product.id} product={product} />
            )
        },
    },
]

