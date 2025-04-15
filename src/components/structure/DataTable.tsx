"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    SortingState,
    VisibilityState,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu"
import { DataTablePagination } from "./DataTable-Pagination"
import { FormNewStructure } from "./Form-newStructure"
import { Search, X } from "lucide-react"

interface DataTableProps<TData> {
    data: TData[]
    columns: ColumnDef<TData>[]
    pageIndex: number
    pageSize: number
    setPageIndex: (index: number) => void
    setPageSize: (size: number) => void
    isLoading?: boolean
}

export function DataTable<TData>({
    data,
    columns,
    pageIndex,
    pageSize,
    setPageIndex,
    setPageSize,
    isLoading,
}: DataTableProps<TData>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [searchQuery, setSearchQuery] = useState("")

    const table = useReactTable({
        data,
        columns,
        manualPagination: true,
        state: {
            pagination: {
                pageIndex,
                pageSize,
            },
            sorting,
            columnFilters,
            columnVisibility,
        },
        onPaginationChange: (updater) => {
            const next = typeof updater === "function"
                ? updater({ pageIndex, pageSize })
                : updater
            setPageIndex(next.pageIndex)
            setPageSize(next.pageSize)
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })

    const handleSearch = () => {
        table.getColumn("name")?.setFilterValue(searchQuery)
    }

    const clearSearch = () => {
        setSearchQuery("")
        table.getColumn("name")?.setFilterValue("")
    }

    return (
        <div className="bg-white dark:bg-[#202020] p-4 rounded-lg">
            <div className="flex items-center mb-4 gap-2">
                <Input
                    placeholder="Filtrar pela opção..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            handleSearch()
                        }
                    }}
                    className="max-w-sm"
                />
                <Button variant="outline" onClick={handleSearch}>
                    <Search className="w-5 h-5" />
                </Button>
                {searchQuery && (
                    <Button variant="outline" onClick={clearSearch}>
                        <X className="w-5 h-5" />
                    </Button>
                )}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Colunas
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="z-50 bg-white">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value: unknown) =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <FormNewStructure />
            </div>

            <div className="rounded-lg border mb-2">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="text-center">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center">
                                    Carregando...
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="text-lg text-center">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Sem resultados
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <DataTablePagination table={table} />
        </div>
    )
}
