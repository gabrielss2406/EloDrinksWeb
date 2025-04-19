import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Customer, CustomerInput, customerInputSchema } from "@/schemas/Customers";
import { useUpdateCustomer } from "@/hooks/useCustomers";
import { useEffect } from "react";
import { toast } from "sonner";

interface FormEditCustomerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    customer: Customer;
}

export const FormEditCustomer: React.FC<FormEditCustomerProps> = ({ open, setOpen, customer }) => {
    const { mutate, isSuccess, isError, isPending } = useUpdateCustomer();

    const form = useForm<CustomerInput>({
        resolver: zodResolver(customerInputSchema),
        defaultValues: {
            name: customer.name,
            email: customer.email,
            telephone: customer.telephone
        },
    });

    const onSubmit = (data: CustomerInput) => {
        mutate({
            id: customer.id,
            data
        }, {
            onSuccess: () => {
                form.reset();
                setOpen(false);
            }
        })
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Cliente editado com sucesso!");
        }
        if (isError) {
            toast.error("Ocorreu um erro ao editado o cliente.");
        }
    }, [isSuccess, isError]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-white dark:bg-[#202020] dark:text-white">
                <DialogHeader>
                    <DialogTitle>Editando {customer.name}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                placeholder="Nome do cliente"
                                                className={`bg-gray-200 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                            />
                                            {field.value && (
                                                <button
                                                    type="button"
                                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                    onClick={() => field.onChange(customer.name)}
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
                            name="email"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                placeholder="Email do cliente"
                                                className={`bg-gray-200 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                            />
                                            {field.value && (
                                                <button
                                                    type="button"
                                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                    onClick={() => field.onChange(customer.email)}
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
                            name="telephone"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Telefone</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                placeholder="Telefone do cliente"
                                                className={`bg-gray-200 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                            />
                                            {field.value && (
                                                <button
                                                    type="button"
                                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                    onClick={() => field.onChange(customer.telephone)}
                                                >
                                                    <X />
                                                </button>
                                            )}
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => { setOpen(false); form.reset() }}>
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={isPending}>
                                Editar
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};