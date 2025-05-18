import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FormOrder } from './Form-order';
import { FormCustomer } from './Form-customer';
import { FormBudget } from './Form-budget';
import { Order } from '@/schemas/Orders';

interface OrderDetailsCardsProps {
    order: Order;
}

const OrderDetailsCards: React.FC<OrderDetailsCardsProps> = ({ order }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 mb-8">
            <div className="flex flex-col gap-4">
                <Card className='bg-white dark:bg-[#202020]'>
                    <CardContent>
                        <h1 className='mb-5 text-2xl font-bold'>Dados do pedido</h1>
                        <FormOrder order={order} />
                    </CardContent>
                </Card>
                <Card className='bg-white dark:bg-[#202020]'>
                    <CardContent>
                        <h1 className='mb-5 text-2xl font-bold'>Dados do cliente</h1>
                        <FormCustomer customer={order.customer} />
                    </CardContent>
                </Card>
            </div>
            <Card className='bg-white dark:bg-[#202020]'>
                <CardContent>
                    <h1 className='mb-5 text-2xl font-bold'>Detalhes do pedido</h1>
                    <FormBudget budget={order.budget} />
                </CardContent>
            </Card>
        </div>
    );
};

export default OrderDetailsCards;