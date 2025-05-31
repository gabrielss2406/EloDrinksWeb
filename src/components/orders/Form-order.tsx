import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Order, OrderSchema } from "@/schemas/Orders";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { getTemplateLocale } from "@/utils/locale";
import DatePicker from "react-datepicker";

interface FormOrderProps {
    order: Order;
}

export const FormOrder: React.FC<FormOrderProps> = ({ order }) => {
    const router = useRouter();

    const form = useForm<Order>({
        resolver: zodResolver(OrderSchema),
        defaultValues: {
            _id: order._id,
            created_at: order.created_at,
            location: order.location,
            date: order.date,
            guest_count: order.guest_count,
            order_status: order.order_status,
            details: order.details
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
                    name="_id"
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
                    name="created_at"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Data de criação</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        value={dayjs(field.value).format("DD/MM/YYYY HH:mm")}
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
                    name="date.start"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Início do evento</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <DatePicker
                                        selected={field.value ? new Date(field.value) : null}
                                        onChange={(date) => field.onChange(date?.toISOString())}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="dd/MM/yyyy HH:mm"
                                        placeholderText="dd/mm/yyyy - hh:mm"
                                        locale={getTemplateLocale()}
                                        className="dark:bg-[#2c2c2c] w-full bg-gray-200 px-3 py-2 rounded-md border border-input shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                                    />
                                    {field.value && (
                                        <button
                                            type="button"
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            onClick={() => field.onChange(order.date.start)}
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="date.end"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fim do evento</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <DatePicker
                                        selected={field.value ? new Date(field.value) : null}
                                        onChange={(date) => field.onChange(date?.toISOString())}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="dd/MM/yyyy HH:mm"
                                        placeholderText="dd/mm/yyyy - hh:mm"
                                        locale={getTemplateLocale()}
                                        className="dark:bg-[#2c2c2c] w-full bg-gray-200 px-3 py-2 rounded-md border border-input shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                                    />
                                    {field.value && (
                                        <button
                                            type="button"
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            onClick={() => field.onChange(order.date.end)}
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="location"
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
                                    {field.value !== order.location && (
                                        <button
                                            type="button"
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            onClick={() => field.onChange(order.location)}
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
                    name="guest_count"
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
                                    {field.value !== order.guest_count && (
                                        <button
                                            type="button"
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            onClick={() => field.onChange(order.guest_count)}
                                        >
                                            <X />
                                        </button>
                                    )}
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />

                {order.details && (
                    <FormField
                        control={form.control}
                        name="details"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel>Detalhes</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <textarea
                                            {...field}
                                            rows={4}
                                            placeholder="Detalhes do pedido..."
                                            className={`bg-gray-200 w-full rounded-md border p-2 shadow-sm text-sm resize-none dark:bg-[#2c2c2c] ${fieldState.invalid ? 'border-red-500' : ''
                                                }`}
                                        />
                                        {field.value !== order.details && (
                                            <button
                                                type="button"
                                                className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                                                onClick={() => field.onChange(order.details)}
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                )}

                <FormField
                    control={form.control}
                    name="order_status"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Status do pedido</FormLabel>
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
