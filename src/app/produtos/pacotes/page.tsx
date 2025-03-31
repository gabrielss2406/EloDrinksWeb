import { columns } from "@/components/packages/Columns"
import { DataTable } from "@/components/packages/DataTable"
import Header from "@/components/shared/Header";
import { Package } from "@/schemas/Packages";

async function getData(): Promise<Package[]> {
    return [
        {
            id: "1",
            name: "John Doe",
            price: 150,
            eventType: "Wedding",
            productsList: []
        },
        {
            id: "2",
            name: "Jane Smith",
            price: 200,
            eventType: "Wedding",
            productsList: []
        },
        {
            id: "3",
            name: "Alice Johnson",
            price: 300,
            eventType: "Wedding",
            productsList: []
        },
        {
            id: "4",
            name: "Bob Brown",
            price: 250,
            eventType: "Wedding",
            productsList: []
        },
        {
            id: "5",
            name: "Charlie Davis",
            price: 180,
            eventType: "Wedding",
            productsList: []
        },
    ];
}

export default async function Products() {
    const data = await getData()

    return (
        <>
            <Header name={"Pacotes"} />
            <div className="container mx-auto p-3">
                <DataTable columns={columns} data={data} />
            </div>
        </>
    )
}
