"use client"

import { ColumnDef } from "@tanstack/react-table"
import { OrderTemp } from "@/schemas/Orders"
import { getDaysSincePost } from "@/utils/days"
import { DataTableColumnHeader } from "@/components/shared/DataTable-Header"

export const columns: ColumnDef<OrderTemp>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="ID" />
        ),
        enableSorting: true,
    },
    {
        accessorKey: "customer",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Cliente" />
        ),
        enableSorting: true,
    },
    {
        accessorKey: "price",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Preço" />
        ),
        enableSorting: true,
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        enableSorting: true,
    },
    {
        accessorKey: "startDate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Inicio do evento" />
        ),
        enableSorting: true,
    },
    {
        accessorKey: "endDate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Fim do evento" />
        ),
        enableSorting: true,
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Criado" />
        ),
        cell: ({ row }) => {
            const createdAt = row.getValue<Date>("createdAt")
            return <span>{getDaysSincePost(createdAt)} atrás</span>
        },
        enableSorting: true,
    },
]
