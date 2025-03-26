import { columns } from "@/components/products/Columns"
import { DataTable } from "@/components/products/DataTable"
import Header from "@/components/shared/Header";
import { Product } from "@/schemas/Products";

async function getData(): Promise<Product[]> {
    return [
        {
            id: "1",
            name: "John Doe",
            price: 150,
            updatedAt: "2025-01-01T10:00:00Z",
        },
        {
            id: "2",
            name: "Jane Smith",
            price: 200,
            updatedAt: "2025-02-01T12:00:00Z",
        },
        {
            id: "3",
            name: "Alice Johnson",
            price: 300,
            updatedAt: "2025-03-01T14:00:00Z",
        },
        {
            id: "4",
            name: "Bob Brown",
            price: 250,
            updatedAt: "2025-03-01T16:00:00Z",
        },
        {
            id: "5",
            name: "Charlie Davis",
            price: 180,
            updatedAt: "2025-03-01T18:00:00Z",
        },
    ];
}

export default async function Products() {
    const data = await getData()

    return (
        <>
            <Header name={"Produtos"} />
            <div className="container mx-auto px-3">
                <DataTable columns={columns} data={data} />
            </div>
        </>
    )
}
