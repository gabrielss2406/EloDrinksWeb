'use client'

import { columns } from "@/components/products/Columns"
import { DataTable } from "@/components/products/DataTable"
import Header from "@/components/shared/Header";
import { useProducts } from "@/hooks/useProduts";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Products() {
    const [pageIndex, setPageIndex] = useState(0)
    const [pageSize, setPageSize] = useState(10)

    const { data = [], isLoading, isError } = useProducts(pageIndex + 1, pageSize)

    useEffect(() => {
        if (isError) {
            toast.error("Erro ao carregar produtos.");
        }
    }, [isError]);

    return (
        <>
            <Header name={"Produtos"} />
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
