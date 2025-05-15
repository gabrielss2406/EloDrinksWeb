import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Package, PackageInput, packageInputSchema } from "@/schemas/Packages";
import { StructureSelector } from "./Form-StructureSelector";
import { usePackage, useUpdatePackage } from "@/hooks/usePackages";
import { useEffect } from "react";
import { toast } from "sonner";
import { ItemTable } from "./ItemTable";
import { Product } from "@/schemas/Products";
import Loading from "../shared/Loading";

interface FormEditPackageProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    pack: Package;
}

export const FormEditPackage: React.FC<FormEditPackageProps> = ({ open, setOpen, pack }) => {
    const { mutate, isSuccess, isError, isPending } = useUpdatePackage();
    const { data, isLoading } = usePackage(pack.id);

    const form = useForm<PackageInput>({
        resolver: zodResolver(packageInputSchema),
        defaultValues: {
            name: pack.name,
            price: pack.price,
            event_type: pack.event_type,
            guest_count: pack.guest_count,
            structure_id: pack.structure_id,
            products: pack.products
        },
    });

    useEffect(() => {
        if (data?.products) {
            const normalizedProducts = data.products.map((product) => ({
                ...product,
                id: product.id,
                quantity: product.quantity ?? 1,
            }));

            form.setValue("products", normalizedProducts);
        }
    }, [data?.products, form]);


    const addProduct = (product: Product) => {
        const currentProducts = form.getValues("products");

        const existingProduct = currentProducts.find((item) => Number(item.id) === Number(product.id));

        if (existingProduct) {
            const updatedProducts = currentProducts.map((item) =>
                Number(item.id) === Number(product.id)
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                        product,
                    }
                    : item
            );
            form.setValue("products", updatedProducts);
        } else {
            form.setValue("products", [
                ...currentProducts,
                {
                    id: Number(product.id),
                    quantity: 1
                },
            ]);
        }
    };

    const updateQuantity = (id: string, quantity: number) => {
        const currentProducts = form.getValues("products");

        const updatedList = currentProducts.map((item) => {
            if (String(item.id) === String(id)) {
                return {
                    ...item,
                    quantity,
                };
            }
            return item;
        });

        form.setValue("products", updatedList);
    };

    const removeProduct = (id: string) => {
        const numericId = Number(id);
        const currentList = form.getValues("products") || [];

        const updatedList = currentList.filter((item) => item.id !== numericId);

        form.setValue("products", updatedList, {
            shouldDirty: true,
            shouldValidate: true,
        });
    };

    const onSubmit = (data: PackageInput) => {
        mutate({
            id: pack.id,
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
            toast.success("Pacote editado com sucesso!");
        }
        if (isError) {
            toast.error("Ocorreu um erro ao editar o pacote.");
        }
    }, [isSuccess, isError]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-white dark:bg-[#202020] dark:text-white">
                <DialogHeader>
                    <DialogTitle>Editando {pack.name}</DialogTitle>
                    <DialogDescription>
                        Preencha os detalhes abaixo para editar o pacote.
                    </DialogDescription>
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
                                                placeholder="Nome do pacote"
                                                className={`bg-gray-200 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                            />
                                            {field.value && (
                                                <button
                                                    type="button"
                                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                    onClick={() => field.onChange(pack.name)}
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
                            name="event_type"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Tipo de evento</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                placeholder="Casamento, aniversário, etc"
                                                className={`bg-gray-200 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                            />
                                            {field.value && (
                                                <button
                                                    type="button"
                                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                    onClick={() => field.onChange(pack.event_type)}
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
                            name="price"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Preço</FormLabel>
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
                                    <FormMessage />
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
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder="0"
                                            min={0}
                                            step="1"
                                            onChange={(e) => {
                                                const value = parseFloat(e.target.value);
                                                field.onChange(isNaN(value) ? '' : value);
                                            }}
                                            value={field.value || ''}
                                            className={`bg-gray-200 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {isLoading ? (
                            <Loading />
                        ) : (
                            <ItemTable
                                items={form.watch("products")}
                                addProduct={addProduct}
                                removeProduct={removeProduct}
                                updateQuantity={updateQuantity}
                            />
                        )}

                        <StructureSelector form={form} />

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => { form.reset(); setOpen(false) }}>
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={isPending}>Criar</Button>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={async () => {
                                    const result = await form.trigger(); // dispara a validação
                                    console.log(form.getValues())

                                    if (!result) {
                                        console.group("❌ Erros de validação:");
                                        Object.entries(form.formState.errors).forEach(([key, error]) => {
                                            console.log(`${key}:`, error);
                                        });
                                        console.groupEnd();
                                    } else {
                                        console.log("✅ Dados válidos:", form.getValues());
                                    }
                                }}
                            >
                                Debug Schema
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};