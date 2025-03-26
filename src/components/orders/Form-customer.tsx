import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomerInfo, customerSchema } from "@/schemas/Orders";

interface FormCustomerProps {
    customer: CustomerInfo;
}

export const FormCustomer: React.FC<FormCustomerProps> = ({ customer }) => {
    const form = useForm<CustomerInfo>({
        resolver: zodResolver(customerSchema),
        defaultValues: {
            id: customer.id,
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
        },
    });

    const onSubmit = (data: CustomerInfo) => {
        console.log("Dados enviados:", data);
        form.reset();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="id"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>ID</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        {...field}
                                        placeholder="ID"
                                        className={`bg-gray-200 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                    />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />

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
                                        placeholder="ID"
                                        className={`bg-gray-200 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                    />
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
                                        placeholder="ID"
                                        className={`bg-gray-200 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                    />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        {...field}
                                        placeholder="ID"
                                        className={`bg-gray-200 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                    />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline">
                        Cancelar
                    </Button>
                    <Button type="submit">Enviar</Button>
                </div>
            </form>
        </Form>
    );
};
