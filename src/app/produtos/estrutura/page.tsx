import { columns } from "@/components/structure/Columns"
import { DataTable } from "@/components/structure/DataTable"
import Header from "@/components/shared/Header";
import { Structure } from "@/schemas/Structures";

async function getData(): Promise<Structure[]> {
    return [
        {
            id: "1",
            name: "Option 1",
            price: 100
        },
        {
            id: "2",
            name: "Option 2",
            price: 100
        },
        {
            id: "3",
            name: "Option 3",
            price: 100
        },
    ];
}

export default async function Products() {
    const data = await getData()

    return (
        <>
            <Header name={"Estrutura"} />
            <div className="container mx-auto px-3">
                <DataTable columns={columns} data={data} />
            </div>
        </>
    )
}
