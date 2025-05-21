'use client'

import { columns } from "@/components/orders/Columns"
import { DataTable } from "@/components/orders/DataTable"
import Header from "@/components/shared/Header";
import { useOrders } from "@/hooks/useOrders";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function Orders() {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [selectAll, setSelectAll] = useState(false);

    const { data = [], isLoading, isError } = useOrders(pageIndex + 1, pageSize, selectAll);

    useEffect(() => {
        if (isError) {
            toast.error("Erro ao carregar produtos.");
        }
    }, [isError]);

    return (
        <>
            <Header name={"Orçamentos"} />
            <div className="container mx-auto px-3">
                <div className="flex items-center space-x-2 my-4">
                    <Checkbox
                        id="selectAll"
                        checked={selectAll}
                        onCheckedChange={(checked) => setSelectAll(!!checked)}
                    />
                    <Label htmlFor="selectAll" className="text-sm">
                        Mostrar todos os orçamentos
                    </Label>
                </div>

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
