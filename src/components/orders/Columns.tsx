"use client"

import { ColumnDef } from "@tanstack/react-table"
import { getDaysSincePost } from "@/utils/days"
import { DataTableColumnHeader } from "@/components/shared/DataTable-Header"
import { Order } from "@/schemas/Orders"

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="ID" />
        ),
        enableSorting: true,
    },
    {
        accessorKey: "customer.email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Cliente" />
        ),
        enableSorting: true,
    },
    {
        accessorKey: "budget.total_value",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Preço" />
        ),
        enableSorting: true,
    },
    {
        accessorKey: "order_status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const status = row.getValue("order_status");
            const translated = {
                pending: "Pendente",
                canceled: "Cancelado",
                confirmed: "Confirmado",
            }[status as string] || status;

            return translated;
        },
    },
    {
        accessorKey: "date.start",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Inicio do evento" />
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const rawDate = row.original.date?.start;

            if (!rawDate) return "—";

            const date = new Date(rawDate);
            if (isNaN(date.getTime())) return "Data inválida";

            const formatted = date.toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            });

            return formatted;
        },
    },
    {
        accessorKey: "date.end",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Fim do evento" />
        ),
        enableSorting: true,
        cell: ({ row }) => {
            const rawDate = row.original.date?.end;

            if (!rawDate) return "—";

            const date = new Date(rawDate);
            if (isNaN(date.getTime())) return "Data inválida";

            const formatted = date.toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            });

            return formatted;
        },
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Criado" />
        ),
        cell: ({ row }) => {
            const createdAt = row.getValue<Date>("created_at")
            return <span>{getDaysSincePost(createdAt)} atrás</span>
        },
        enableSorting: true,
    },
]
