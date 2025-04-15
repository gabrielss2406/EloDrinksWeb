'use client'

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/shared/DataTable-Header"
import { Structure } from "@/schemas/Structures"
import { StructureActions } from "./DataTable-Actions"

export const columns: ColumnDef<Structure>[] = [
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
        id: "actions",
        cell: ({ row }) => {
            const structure = row.original

            return (
                <StructureActions key={structure.id} structure={structure} />
            )
        },
    },
]

