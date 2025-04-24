'use client'

import { columns } from "@/components/packages/Columns"
import { DataTable } from "@/components/packages/DataTable"
import Header from "@/components/shared/Header";
import { usePackages } from "@/hooks/usePackages";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Products() {
    const [pageIndex, setPageIndex] = useState(0)
    const [pageSize, setPageSize] = useState(10)

    const { data = [], isLoading, isError } = usePackages(pageIndex + 1, pageSize)

    useEffect(() => {
        if (isError) {
            toast.error("Erro ao carregar pacotes.");
        }
    }, [isError]);

    return (
        <>
            <Header name={"Pacotes"} />
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
