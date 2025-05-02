'use client'

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/shared/DataTable-Header"
import { Sales } from "@/schemas/Sales"
import { SalesActions } from "./DataTable-Actions"

export const columns: ColumnDef<Sales>[] = [
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
        accessorKey: "discount_percentage",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Desconto (%)" />,
        enableSorting: true,
        cell: ({ row }) => `${row.getValue<number>("discount_percentage")}%`,
    },
    {
        accessorKey: "expire_date",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Data de Expiração" />,
        enableSorting: true,
        cell: ({ row }) => new Date(row.getValue<string>("expire_date")).toLocaleDateString(),
    },
    {
        accessorKey: "promotion_type",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tipo de Promoção" />,
        enableSorting: false,
        cell: ({ row }) => {
            console.log(row.original)
            const productId = row.original.product_id;
            const packId = row.original.pack_id;
            return productId ? "Produto" : packId ? "Pacote" : "Indefinido";
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const sales = row.original

            return (
                <SalesActions key={sales.id} sales={sales} />
            )
        },
    },
]
