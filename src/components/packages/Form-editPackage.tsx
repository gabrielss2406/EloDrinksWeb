import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Package, PackageInput, packageInputSchema, PackageProduct } from "@/schemas/Packages";
import { ItemTable } from "./ItemTable";

interface FormEditPackageProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    pack: Package;
}

export const FormEditPackage: React.FC<FormEditPackageProps> = ({ open, setOpen, pack }) => {

    const form = useForm<PackageInput>({
        resolver: zodResolver(packageInputSchema),
        defaultValues: {
            name: pack.name,
            eventType: pack.eventType,
            price: pack.price,
            productsList: pack.productsList
        },
    });

    const addProduct = (product: PackageProduct) => {
        form.setValue("productsList", [...form.getValues("productsList"), product]);
    };

    const removeProduct = (id: string) => {
        const updatedList = form.getValues("productsList").filter((item) => item.id !== id);
        form.setValue("productsList", updatedList);
    };

    const updateQuantity = (id: string, quantity: number) => {
        const updatedList = form.getValues("productsList").map((item) =>
            item.id === id ? { ...item, quantity } : item
        );
        form.setValue("productsList", updatedList);
    };

    const onSubmit = (data: PackageInput) => {
        console.log("Dados enviados:", data);
        form.reset();
        setOpen(false);
    };

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
                            name="eventType"
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
                                                    onClick={() => field.onChange(pack.eventType)}
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

                        <ItemTable
                            items={form.watch("productsList")}
                            addProduct={addProduct}
                            removeProduct={removeProduct}
                            updateQuantity={updateQuantity}
                        />

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => { setOpen(false); form.reset() }}>
                                Cancelar
                            </Button>
                            <Button type="submit">Criar</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};