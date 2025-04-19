'use client'

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/shared/DataTable-Header"
import { Customer } from "@/schemas/Customers"
import { CustomerActions } from "./DataTable-Actions"

export const columns: ColumnDef<Customer>[] = [
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
        accessorKey: "email",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
        enableSorting: true,
    },
    {
        accessorKey: "telephone",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Telefone" />,
        enableSorting: true,
    },
    {
        accessorKey: "ordersAccount",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Orçamentos" />,
        enableSorting: true,
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const customer = row.original

            return (
                <CustomerActions key={customer.id} customer={customer} />
            )
        },
    },
]

