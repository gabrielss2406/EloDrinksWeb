// 'use client';

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import { Budget, BudgetSchema } from "@/schemas/Orders";
import { Input } from "../ui/input";
import { X } from "lucide-react";
import { ItemTable } from "./ItemTable";

interface FormBudgetProps {
    budget: Budget;
}

export const FormBudget: React.FC<FormBudgetProps> = ({ budget }) => {
    const router = useRouter();

    const form = useForm<Budget>({
        resolver: zodResolver(BudgetSchema),
        defaultValues: {
            bar_structure: budget.bar_structure,
            items: budget.items,
            total_value: budget.total_value
        },
    });

    // const addProduct = (product: BudgetProduct) => {
    //     form.setValue("items", [...form.getValues("items"), product]);
    // };

    // const removeProduct = (id: string) => {
    //     const updatedList = form.getValues("items").filter((item) => item.id !== id);
    //     form.setValue("items", updatedList);
    // };

    // const updateQuantity = (id: string, quantity: number) => {
    //     const updatedList = form.getValues("items").map((item) =>
    //         item.id === id ? { ...item, quantity } : item
    //     );
    //     form.setValue("items", updatedList);
    // };

    console.log(budget.bar_structure.name)


    const onSubmit = (data: Budget) => {
        console.log("Dados enviados:", data);
        form.reset();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <ItemTable
                    items={form.watch("items")}
                />

                <FormField
                    control={form.control}
                    name="bar_structure.name"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Estrutura do bar</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        {...field}
                                        placeholder={budget.bar_structure.name}
                                        className={`bg-gray-200 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                    />
                                    {field.value && (
                                        <button
                                            type="button"
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            onClick={() => field.onChange(budget.bar_structure.name)}
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
                    name="bar_structure.price"
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
                    name="total_value"
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
