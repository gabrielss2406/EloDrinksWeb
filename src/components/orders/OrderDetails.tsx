import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FormOrder } from './Form-order';
import { FormCustomer } from './Form-customer';
import { FormBudget } from './Form-budget';
import { Order } from '@/schemas/Orders';
import { toast } from 'sonner';
import { useConfirmOrder, useDeleteOrder } from '@/hooks/useOrders';
import { Button } from '../ui/button';

interface OrderDetailsCardsProps {
    order: Order;
}

const OrderDetailsCards: React.FC<OrderDetailsCardsProps> = ({ order }) => {
    const { mutate: mutateConfirm, isSuccess: isSuccessConfirm, isError: isErrorConfirm } = useConfirmOrder();
    const { mutate: mutateDelete, isSuccess: isSuccessDelete, isError: isErrorDelete } = useDeleteOrder();

    const handleDelete = async () => {
        try {
            mutateDelete(order._id);
        } catch (error) {
            console.error("Failed to delete order:", error);
        }
    };

    const handleConfirm = async () => {
        try {
            mutateConfirm(order._id);
        } catch (error) {
            console.error("Failed to confirm order:", error);
        }
    };

    useEffect(() => {
        if (isSuccessDelete || isSuccessConfirm) {
            toast.success("Pedido atualizado com sucesso!");
        }
        if (isErrorDelete || isErrorConfirm) {
            toast.error("Ocorreu um erro ao atualizar o pedido.");
        }
    }, [isSuccessDelete, isSuccessConfirm, isErrorDelete, isErrorConfirm]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 mb-8">
            <div className="flex flex-col gap-4">
                <Card className="bg-white dark:bg-[#202020]">
                    <CardContent>
                        <div className="flex flex-row justify-between items-start mb-5">
                            <h1 className="text-2xl font-bold">Dados do pedido</h1>
                            <div className="flex gap-2">
                                {order.order_status === 'pending' && (
                                    <>
                                        <Button
                                            className="bg-green-700"
                                            onClick={() => {
                                                if (window.confirm("Deseja realmente confirmar este pedido?")) {
                                                    handleConfirm();
                                                }
                                            }}
                                        >
                                            Confirmar
                                        </Button>
                                        <Button
                                            className="bg-red-600"
                                            onClick={() => {
                                                if (window.confirm("Deseja realmente cancelar este pedido?")) {
                                                    handleDelete();
                                                }
                                            }}
                                        >
                                            Cancelar
                                        </Button>
                                    </>
                                )}
                                {order.order_status === 'confirmed' && (
                                    <Button
                                        className="bg-red-600"
                                        onClick={() => {
                                            if (window.confirm("Deseja realmente cancelar este pedido confirmado?")) {
                                                handleDelete();
                                            }
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                )}
                                {order.order_status === 'canceled' && (
                                    <Button
                                        className="bg-green-700"
                                        onClick={() => {
                                            if (window.confirm("Deseja realmente reativar este pedido cancelado?")) {
                                                handleConfirm();
                                            }
                                        }}
                                    >
                                        Confirmar
                                    </Button>
                                )}
                            </div>
                        </div>

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