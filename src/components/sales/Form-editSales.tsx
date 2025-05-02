import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { toast } from "sonner";
import { Sales, SalesInput, salesInputSchema } from "@/schemas/Sales";
import { useUpdateSales } from "@/hooks/useSales";
import { getTemplateLocale } from "@/utils/locale";
import { Calendar } from "../ui/calendar";
import { PackageSelector } from "./Form-packageSelector";
import { ProductSelector } from "./Form-productSelector";

interface FormEditSalesProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    sales: Sales;
}

export const FormEditSales: React.FC<FormEditSalesProps> = ({ open, setOpen, sales }) => {
    const { mutate, isSuccess, isError, isPending } = useUpdateSales();

    const form = useForm<SalesInput>({
        resolver: zodResolver(salesInputSchema),
        defaultValues: {
            name: sales.name,
            discount_percentage: sales.discount_percentage,
            expire_date: sales.expire_date ? new Date(sales.expire_date) : new Date(),
            product_id: sales.product_id || -1,
            pack_id: sales.pack_id || -1,
        },
    });

    const onSubmit = (data: SalesInput) => {
        mutate({
            id: sales.id,
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
            toast.success("Produto editado com sucesso!");
        }
        if (isError) {
            toast.error("Ocorreu um erro ao editar o produto.");
        }
    }, [isSuccess, isError]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-white dark:bg-[#202020] dark:text-white max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Editando {sales.name}</DialogTitle>
                    <DialogDescription>
                        Preencha os detalhes abaixo para editar a promoção.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Nome da Promoção</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                placeholder="Nome da promoção"
                                                className={`bg-gray-200 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                            />
                                            {field.value && (
                                                <button
                                                    type="button"
                                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                    onClick={() => field.onChange(sales.name)}
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
                            name="discount_percentage"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Porcentagem de desconto</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder="0.00"
                                            min={0}
                                            step="0.01"
                                            onChange={(e) => {
                                                const value = parseFloat(e.target.value);
                                                field.onChange(isNaN(value) ? '' : value);
                                            }}
                                            value={field.value || ''}
                                            className={`bg-gray-200 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="expire_date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data de Expiração</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Calendar
                                                mode="single"
                                                selected={new Date(field.value)}
                                                onSelect={field.onChange}
                                                className="rounded-md border bg-gray-200 dark:bg-[#2c2c2c]"
                                                locale={getTemplateLocale()}
                                            />
                                            {field.value && (
                                                <div>
                                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                                        Data selecionada: {new Date(field.value).toLocaleDateString()}
                                                    </p>
                                                    <button
                                                        type="button"
                                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                        onClick={() => field.onChange(sales.expire_date)}
                                                    >
                                                        <X />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <div className="flex space-x-4">
                            <Button
                                type="button"
                                variant="default"
                                onClick={() => {
                                    form.setValue("pack_id", 0);
                                    form.setValue("product_id", -1);
                                }}
                                className={form.watch("pack_id") !== -1 ? "bg-primary text-white" : "bg-zinc-400"}
                            >
                                Escolher Pacote
                            </Button>

                            <Button
                                type="button"
                                variant="default"
                                onClick={() => {
                                    form.setValue("product_id", 0);
                                    form.setValue("pack_id", -1);
                                }}
                                className={form.watch("product_id") !== -1 ? "bg-primary text-white" : "bg-zinc-400"}
                            >
                                Escolher Produto
                            </Button>
                            <button
                                type="button"
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => {
                                    form.setValue("product_id", sales.product_id || -1);
                                    form.setValue("pack_id", sales.pack_id || -1);
                                }}
                            >
                                <X />
                            </button>
                        </div>

                        {form.watch("pack_id") !== -1 && (
                            <PackageSelector form={form} />
                        )}
                        {form.watch("product_id") !== -1 && (
                            <ProductSelector form={form} />
                        )}

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => { setOpen(false); form.reset() }}>
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={isPending}>Editar</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};