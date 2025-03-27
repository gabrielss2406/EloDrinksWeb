'use client'

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/shared/DataTable-Header"
import { Package } from "@/schemas/Packages"

export const columns: ColumnDef<Package>[] = [
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
        accessorKey: "eventType",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tipo de evento" />,
        enableSorting: true,
    },
    // {
    //     id: "actions",
    //     cell: ({ row }) => {
    //         const product = row.original

    //         return (
    //             <ProductActions product={product} />
    //         )
    //     },
    // },
]

