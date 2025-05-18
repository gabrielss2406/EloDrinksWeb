import { columns } from "@/components/orders/Columns"
import { DataTable } from "@/components/orders/DataTable"
import Header from "@/components/shared/Header";
import { Order } from "@/schemas/Orders";

async function getData(): Promise<Order[]> {
    return [
        {
            id: "682924bc54866918009ec3fc",
            customer: {
                id: 1,
                name: "testing update customer",
                email: "teste@example.com",
                phone: 912345678,
            },
            date: {
                start: "2025-05-18T00:02:24.946Z",
                end: "2025-05-18T02:02:24.946Z",
            },
            guest_count: 213,
            location: "Ytghhuy",
            order_status: "pending",
            budget: {
                total_value: 566,
                bar_structure: {
                    id: 4,
                    name: "teste",
                    price: 99.99,
                },
                items: [
                    {
                        id: 3,
                        name: "pisco",
                        quantity: 9,
                        unit_price: 55,
                        img_url:
                            "https://res.cloudinary.com/duxmkrglm/image/upload/v1745630681/meu_projeto/cu5wiadtyksdztrpgc5t.jpg",
                        category: "tropical drinks",
                    },
                    {
                        id: 21,
                        name: "CPG 2024",
                        quantity: 1,
                        unit_price: 10,
                        img_url:
                            "https://res.cloudinary.com/duxmkrglm/image/upload/v1746828748/meu_projeto/fivihtu59gg1addzhayh.png",
                        category: "Nova categoria",
                    },
                    {
                        id: 2,
                        name: "pina colada",
                        quantity: 4,
                        unit_price: 50,
                        img_url:
                            "https://res.cloudinary.com/duxmkrglm/image/upload/v1745885693/meu_projeto/gaa08eswzec6uwaqxous.jpg",
                        category: "tropical drinks",
                    },
                ],
            },
            created_at: "2025-05-18T00:07:24.032Z",
            updated_at: "2025-05-18T00:07:24.032Z",
        },
    ];
}

export default async function Orders() {
    const data = await getData()

    return (
        <>
            <Header name={"Orçamentos"} />
            <div className="container mx-auto px-3">
                <DataTable columns={columns} data={data} />
            </div>
        </>
    )
}
