'use client'

import { columns } from "@/components/structure/Columns"
import { DataTable } from "@/components/structure/DataTable"
import Header from "@/components/shared/Header";
import { useStructures } from "@/hooks/useStructures";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Products() {
    const [pageIndex, setPageIndex] = useState(0)
    const [pageSize, setPageSize] = useState(10)

    const { data = [], isLoading, isError } = useStructures(pageIndex + 1, pageSize)

    useEffect(() => {
        if (isError) {
            toast.error("Erro ao carregar estruturas.");
        }
    }, [isError]);

    return (
        <>
            <Header name={"Estrutura"} />
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
