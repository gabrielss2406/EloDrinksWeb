import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { SalesInput, salesInputSchema } from "@/schemas/Sales";
import { useCreateSales } from "@/hooks/useSales";
import { Calendar } from "@/components/ui/calendar"
import { getTemplateLocale } from "@/utils/locale";
import { PackageSelector } from "./Form-packageSelector";
import { ProductSelector } from "./Form-productSelector";

export const FormNewSales: React.FC = () => {
    const [open, setOpen] = useState(false);

    const { mutate: createSales, isSuccess: isSalesCreated, isError: isSalesCreationError, isPending: isCreatingSales } = useCreateSales();

    const form = useForm<SalesInput>({
        resolver: zodResolver(salesInputSchema),
        defaultValues: {
            name: "",
            discount_percentage: 0,
            expire_date: new Date(),
            product_id: -1,
            pack_id: -1
        },
    });

    const onSubmit = (data: SalesInput) => {
        createSales(data, {
            onSuccess: () => {
                form.reset();
                setOpen(false);
            },
        });
    };

    useEffect(() => {
        if (isSalesCreated) {
            toast.success("Promoção criada com sucesso!");
        }
        if (isSalesCreationError) {
            toast.error("Ocorreu um erro ao criar a promoção.");
        }
    }, [isSalesCreated, isSalesCreationError]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button type="button" className="ml-1">Criar nova promoção <Plus /></Button>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-[#202020] dark:text-white">
                <DialogHeader>
                    <DialogTitle>Criar novo produto</DialogTitle>
                    <DialogDescription>
                        Preencha os detalhes abaixo para adicionar uma nova promoção.
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
                                                placeholder="Nome do promoção"
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
                            name="discount_percentage"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Porcentagem do desconto (%)</FormLabel>
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
                                                selected={field.value ? new Date(field.value) : undefined}
                                                onSelect={field.onChange}
                                                className="rounded-md border bg-gray-200 dark:bg-[#2c2c2c]"
                                                locale={getTemplateLocale()}
                                            />
                                            {field.value && (
                                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                                    Data selecionada: {field.value.toLocaleDateString()}
                                                </p>
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
                            <Button type="submit" disabled={isCreatingSales || (form.watch("product_id") === -1 && form.watch("pack_id") === -1)}>Criar</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};