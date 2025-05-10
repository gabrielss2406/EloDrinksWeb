'use client'

import { columns } from "@/components/customers/Columns"
import { DataTable } from "@/components/customers/DataTable"
import Header from "@/components/shared/Header";
import { useCustomers } from "@/hooks/useCustomers";
import { useState } from "react";

export default function Customers() {
    const [pageIndex, setPageIndex] = useState(0)
    const [pageSize, setPageSize] = useState(10)

    const { data = [], isLoading } = useCustomers(pageIndex + 1, pageSize)

    return (
        <>
            <Header name={"Clientes"} />
            <div className="container mx-auto px-3">
                <DataTable
                    data={data}
                    columns={columns}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    setPageIndex={setPageIndex}
                    setPageSize={setPageSize}
                    isLoading={isLoading}
                />
            </div>
        </>
    )
}