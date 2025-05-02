'use client'

import { columns } from "@/components/sales/Columns";
import { DataTable } from "@/components/sales/DataTable";
import Header from "@/components/shared/Header";
import { useSales } from "@/hooks/useSales";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Products() {
    const [pageIndex, setPageIndex] = useState(0)
    const [pageSize, setPageSize] = useState(10)

    const { data = [], isLoading, isError } = useSales(pageIndex + 1, pageSize)

    useEffect(() => {
        if (isError) {
            toast.error("Erro ao carregar promoções.");
        }
    }, [isError]);

    return (
        <>
            <Header name={"Promoções"} />
            <div className="container mx-auto p-3">
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
