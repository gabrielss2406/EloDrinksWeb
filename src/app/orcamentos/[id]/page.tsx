"use client";

import OrderDetailsCards from '@/components/orders/OrderDetails';
import Header from '@/components/shared/Header';
import Loading from '@/components/shared/Loading';
import { useOrder } from '@/hooks/useOrders';
import { Order } from '@/schemas/Orders';
import { useParams } from 'next/navigation';

export default function OrderDetails() {
    const { id } = useParams() as { id: string };
    const { data, isLoading } = useOrder(id)

    return (
        <>
            <Header name={`Orçamento / ${id}`} />
            {isLoading
                ? <Loading />
                : <OrderDetailsCards order={data as Order} />
            }
        </>
    );
}
