import { columns } from "@/components/orders/Columns"
import { DataTable } from "@/components/orders/DataTable"
import Header from "@/components/shared/Header";
import { Payment } from "@/schemas/Orders";

async function getData(): Promise<Payment[]> {
    return [
        {
            id: "1",
            customer: "John Doe",
            price: 150,
            status: "payed",
            startDate: "2023-01-01",
            endDate: "2023-01-05",
            createdAt: "2025-01-01T10:00:00Z",
        },
        {
            id: "2",
            customer: "Jane Smith",
            price: 200,
            status: "pending",
            startDate: "2023-02-01",
            endDate: "2023-02-10",
            createdAt: "2025-02-01T12:00:00Z",
        },
        {
            id: "3",
            customer: "Alice Johnson",
            price: 300,
            status: "accepted",
            startDate: "2023-03-01",
            endDate: "2023-03-15",
            createdAt: "2025-03-01T14:00:00Z",
        },
        {
            id: "4",
            customer: "Bob Brown",
            price: 250,
            status: "confirm",
            startDate: "2023-04-01",
            endDate: "2023-04-20",
            createdAt: "2025-03-01T16:00:00Z",
        },
        {
            id: "5",
            customer: "Charlie Davis",
            price: 180,
            status: "pending",
            startDate: "2023-05-01",
            endDate: "2023-05-10",
            createdAt: "2025-03-01T18:00:00Z",
        },
    ];
}

export default async function Orders() {
    const data = await getData()

    return (
        <>
            <Header name={"Orçamentos"} />
            <div className="container mx-auto p-3">
                <DataTable columns={columns} data={data} />
            </div>
        </>
    )
}
