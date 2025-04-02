import { columns } from "@/components/customers/Columns"
import { DataTable } from "@/components/customers/DataTable"
import Header from "@/components/shared/Header";
import { Customer } from "@/schemas/Customers";

async function getData(): Promise<Customer[]> {
    return [
        {
            id: "1",
            name: "John Doe",
            email: "john.doe@example.com",
            telephone: "123-456-7890",
            ordersAccount: 5,
        },
        {
            id: "2",
            name: "Jane Smith",
            email: "jane.smith@example.com",
            telephone: "987-654-3210",
            ordersAccount: 3,
        },
        {
            id: "3",
            name: "Alice Johnson",
            email: "alice.johnson@example.com",
            telephone: "555-123-4567",
            ordersAccount: 8,
        },
    ];
}

export default async function Products() {
    const data = await getData()

    return (
        <>
            <Header name={"Clientes"} />
            <div className="container mx-auto p-3">
                <DataTable columns={columns} data={data} />
            </div>
        </>
    )
}
