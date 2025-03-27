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
        accessorKey: "options",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Opções" />,
        enableSorting: true,
    },
    {
        accessorKey: "price",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Preço" />,
        enableSorting: true,
    },
    {
        accessorKey: "description",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Descrição" />,
        enableSorting: true,
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const structure = row.original

            return (
                <StructureActions structure={structure} />
            )
        },
    },
]

