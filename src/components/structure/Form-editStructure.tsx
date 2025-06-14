import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Structure, StructureInput, structureInputSchema } from "@/schemas/Structures";
import { useUpdateStructure } from "@/hooks/useStructures";
import { useEffect } from "react";
import { toast } from "sonner";

interface FormEditStructureProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    structure: Structure;
}

export const FormEditStructure: React.FC<FormEditStructureProps> = ({ open, setOpen, structure }) => {
    const { mutate, isSuccess, isError, isPending } = useUpdateStructure();

    const form = useForm<StructureInput>({
        resolver: zodResolver(structureInputSchema),
        defaultValues: {
            name: structure.name,
            price: structure.price
        },
    });

    const onSubmit = (data: StructureInput) => {
        mutate({
            id: structure.id,
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
            toast.success("Estrutura editada com sucesso!");
        }
        if (isError) {
            toast.error("Ocorreu um erro ao editar a estrutura.");
        }
    }, [isSuccess, isError]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-white dark:bg-[#202020] dark:text-white">
                <DialogHeader>
                    <DialogTitle>Editando {structure.name}</DialogTitle>
                    <DialogDescription>
                        Preencha os detalhes abaixo editar a estrutura.
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
                                                placeholder="Nome da opção"
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
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                type="number"
                                                placeholder="0.00"
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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