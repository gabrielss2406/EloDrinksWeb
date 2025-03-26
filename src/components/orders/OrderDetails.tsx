import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FormOrder } from './Form-order';
import { FormCustomer } from './Form-customer';
import { FormBudget } from './Form-budget';
import { CustomerInfo, Order } from '@/schemas/Orders';

interface OrderDetailsCardsProps {
    order: Order;
}

const exampleCustomer: CustomerInfo = {
    id: "12345",
    name: "John Doe",
    email: "example@email.com",
    phone: "123456789",
};

const OrderDetailsCards: React.FC<OrderDetailsCardsProps> = ({ order }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4">
            <div className="flex flex-col gap-4">
                <Card>
                    <CardContent>
                        <FormOrder order={order} />
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <FormCustomer customer={exampleCustomer} />
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardContent>
                    <FormBudget name={''} />
                </CardContent>
            </Card>
        </div>
    );
};

export default OrderDetailsCards;