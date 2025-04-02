"use client";

import OrderDetailsCards from '@/components/orders/OrderDetails';
import Header from '@/components/shared/Header';
import { Order } from '@/schemas/Orders';
import { useParams } from 'next/navigation';

const exampleOrder: Order = {
    id: "12345",
    createdAt: "2023-01-01T12:00:00Z",
    startDate: "2023-01-10T12:00:00Z",
    endDate: "2023-01-15T12:00:00Z",
    local: "New York",
    guestNumber: 50,
    status: "pending",
};

export default function OrderDetails() {
    const { id } = useParams();

    return (
        <>
            <Header name={`Orçamento / ${id}`} />
            <OrderDetailsCards order={exampleOrder} />
        </>
    );
}
