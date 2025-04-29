import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FormOrder } from './Form-order';
import { FormCustomer } from './Form-customer';
import { FormBudget } from './Form-budget';
import { Budget, CustomerInfo, Order } from '@/schemas/Orders';

interface OrderDetailsCardsProps {
    order: Order;
}

const exampleCustomer: CustomerInfo = {
    id: "12345",
    name: "John Doe",
    email: "example@email.com",
    phone: "123456789",
};

const exampleBudget: Budget = {
    eventType: "Wedding",
    items: [
        // { id: "1", name: "Beer", price: 5, quantity: 10 },
        // { id: "2", name: "Wine", price: 15, quantity: 5 },
    ],
    barStructure: "Open Bar",
    structurePrice: 200,
    totalPrice: 275,
};

const OrderDetailsCards: React.FC<OrderDetailsCardsProps> = ({ order }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 mb-8">
            <div className="flex flex-col gap-4">
                <Card className='bg-white dark:bg-[#202020]'>
                    <CardContent>
                        <FormOrder order={order} />
                    </CardContent>
                </Card>
                <Card className='bg-white dark:bg-[#202020]'>
                    <CardContent>
                        <FormCustomer customer={exampleCustomer} />
                    </CardContent>
                </Card>
            </div>
            <Card className='bg-white dark:bg-[#202020]'>
                <CardContent>
                    <FormBudget budget={exampleBudget} />
                </CardContent>
            </Card>
        </div>
    );
};

export default OrderDetailsCards;