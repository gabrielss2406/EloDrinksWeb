import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Order, orderSchema } from "@/schemas/Orders";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface FormOrderProps {
    order: Order;
}

export const FormOrder: React.FC<FormOrderProps> = ({ order }) => {
    const router = useRouter();

    const form = useForm<Order>({
        resolver: zodResolver(orderSchema),
        defaultValues: {
            id: order.id,
            createdAt: order.createdAt,
            startDate: order.startDate,
            endDate: order.endDate,
            local: order.local,
            guestNumber: order.guestNumber,
            status: order.status,
        },
    });

    const onSubmit = (data: Order) => {
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
                    name="createdAt"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Data de criação</FormLabel>
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

                <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Inicio do evento</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        {...field}
                                        placeholder="dd/mm/yyyy - hh:mm"
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
                    name="endDate"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Final do evento</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        {...field}
                                        placeholder="dd/mm/yyyy - hh:mm"
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
                    name="local"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Local</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        {...field}
                                        placeholder="Local do evento"
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
                    name="guestNumber"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Número de convidados</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        {...field}
                                        type="number"
                                        placeholder="Número de convidados do evento"
                                        className={`bg-gray-200 appearance-none [&::-webkit-inner-spin-button]:appearance-none ${fieldState.invalid ? 'border-red-500' : ''}`}
                                        onWheel={(e) => e.currentTarget.blur()}
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
                    name="status"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        {...field}
                                        placeholder="Pendente, aceito, confirmado, pago..."
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
