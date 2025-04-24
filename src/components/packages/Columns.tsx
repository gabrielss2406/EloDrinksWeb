'use client'

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/shared/DataTable-Header"
import { Package } from "@/schemas/Packages"
import { PackageActions } from "./DataTable-Actions"

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
        accessorKey: "event_type",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tipo de evento" />,
        enableSorting: true,
    },
    {
        accessorKey: "guest_count",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Nº de convidados" />,
        enableSorting: true,
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const pack = row.original

            return (
                <PackageActions key={pack.id} pack={pack} />
            )
        },
    },
]

