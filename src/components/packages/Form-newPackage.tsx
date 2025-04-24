import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { PackageInput, packageInputSchema } from "@/schemas/Packages";
import { useForm } from "react-hook-form";
import { StructureSelector } from "./Form-StructureSelector";
import { useCreatePackage } from "@/hooks/usePackages";
import { toast } from "sonner";

export const FormNewPackage: React.FC = () => {
    const [open, setOpen] = useState(false);

    const { mutate, isSuccess, isError, isPending } = useCreatePackage();

    const form = useForm<PackageInput>({
        resolver: zodResolver(packageInputSchema),
        defaultValues: {
            name: "",
            price: 0,
            event_type: "",
            guest_count: 0,
            structure_id: 0,
            // productsList: [],
        },
    });

    // const addProduct = (product: PackageProduct) => {
    //     form.setValue("productsList", [...form.getValues("productsList"), product]);
    // };

    // const removeProduct = (id: string) => {
    //     const updatedList = form.getValues("productsList").filter((item) => item.id !== id);
    //     form.setValue("productsList", updatedList);
    // };

    // const updateQuantity = (id: string, quantity: number) => {
    //     const updatedList = form.getValues("productsList").map((item) =>
    //         item.id === id ? { ...item, quantity } : item
    //     );
    //     form.setValue("productsList", updatedList);
    // };

    const onSubmit = (data: PackageInput) => {
        mutate(data, {
            onSuccess: () => {
                form.reset();
                setOpen(false);
            },
        });
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Pacote criado com sucesso!");
        }
        if (isError) {
            toast.error("Ocorreu um erro ao criar o pacote.");
        }
    }, [isSuccess, isError]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button type="button" className="ml-1">Criar novo pacote <Plus /></Button>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-[#202020] dark:text-white max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Criar novo pacote</DialogTitle>
                    <DialogDescription>
                        Preencha os detalhes abaixo para adicionar um novo pacote.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Nome do pacote</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                placeholder="Nome do produto"
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
                                                placeholder="Tipo de evento"
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
                            name="guest_count"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Quantidade de convidados</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder="0"
                                            min={0}
                                            step="1"
                                            onChange={(e) => {
                                                const value = parseInt(e.target.value, 10);
                                                field.onChange(isNaN(value) ? '' : value);
                                            }}
                                            value={field.value || ''}
                                            className={`bg-gray-200 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* <ItemTable
                            items={form.watch("productsList")}
                            addProduct={addProduct}
                            removeProduct={removeProduct}
                            updateQuantity={updateQuantity}
                        /> */}

                        <StructureSelector form={form} />

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => { setOpen(false); form.reset() }}>
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={isPending}>Criar</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};