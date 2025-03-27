import { columns } from "@/components/structure/Columns"
import { DataTable } from "@/components/structure/DataTable"
import Header from "@/components/shared/Header";
import { Structure } from "@/schemas/Structures";

async function getData(): Promise<Structure[]> {
    return [
        {
            id: "1",
            options: "Option 1",
            price: 100,
            description: "Description for Structure 1",
        },
        {
            id: "2",
            options: "Option 2",
            price: 100,
            description: "Description for Structure 2",
        },
        {
            id: "3",
            options: "Option 3",
            price: 100,
            description: "Description for Structure 3",
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
