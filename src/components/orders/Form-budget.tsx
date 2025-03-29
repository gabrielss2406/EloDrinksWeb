// 'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Budget, BudgetProduct, budgetSchema } from "@/schemas/Orders";
import { X } from "lucide-react";
import { ItemTable } from "./ItemTable";
import { useRouter } from 'next/navigation';

interface FormBudgetProps {
    budget: Budget;
}

export const FormBudget: React.FC<FormBudgetProps> = ({ budget }) => {
    const router = useRouter();

    const form = useForm<Budget>({
        resolver: zodResolver(budgetSchema),
        defaultValues: {
            eventType: budget.eventType,
            items: budget.items || [],
            barStructure: budget.barStructure,
            structurePrice: budget.structurePrice,
            totalPrice: budget.totalPrice,
        },
    });

    const addProduct = (product: BudgetProduct) => {
        form.setValue("items", [...form.getValues("items"), product]);
    };

    const removeProduct = (id: string) => {
        const updatedList = form.getValues("items").filter((item) => item.id !== id);
        form.setValue("items", updatedList);
    };

    const updateQuantity = (id: string, quantity: number) => {
        const updatedList = form.getValues("items").map((item) =>
            item.id === id ? { ...item, quantity } : item
        );
        form.setValue("items", updatedList);
    };


    const onSubmit = (data: Budget) => {
        console.log("Dados enviados:", data);
        form.reset();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="eventType"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Tipo de evento</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        {...field}
                                        placeholder="Casamento, festa de 15 anos, etc"
                                        className={`bg-gray-200 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                    />
                                    {field.value && (
                                        <button
                                            type="button"
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            onClick={() => field.onChange("")}
                                        >
                                            <X />
                                        </button>
                                    )}
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <ItemTable
                    items={form.watch("items")}
                    addProduct={addProduct}
                    removeProduct={removeProduct}
                    updateQuantity={updateQuantity}
                />

                <FormField
                    control={form.control}
                    name="barStructure"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Estrutura do bar</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        {...field}
                                        placeholder="Bar comum ou premium"
                                        className={`bg-gray-200 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                    />
                                    {field.value && (
                                        <button
                                            type="button"
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            onClick={() => field.onChange("")}
                                        >
                                            <X />
                                        </button>
                                    )}
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="structurePrice"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Preço da estrutura</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        {...field}
                                        type="number"
                                        readOnly={true}
                                        className={`bg-gray-200 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                    />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="totalPrice"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Preço total</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        {...field}
                                        readOnly={true}
                                        className={`bg-gray-200 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                    />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={() => { form.reset(); router.back(); }}>
                        Cancelar
                    </Button>
                    <Button type="submit">Confirmar edição</Button>
                </div>
            </form>
        </Form>
    );
};
