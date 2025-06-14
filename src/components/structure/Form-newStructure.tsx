import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { StructureInput, structureInputSchema } from "@/schemas/Structures";
import { useCreateStructure } from "@/hooks/useStructures";
import { toast } from "sonner";

export const FormNewStructure: React.FC = () => {
    const [open, setOpen] = useState(false);

    const { mutate, isSuccess, isError, isPending } = useCreateStructure();

    const form = useForm<StructureInput>({
        resolver: zodResolver(structureInputSchema),
        defaultValues: {
            name: "",
            price: 0
        },
    });

    const onSubmit = (data: StructureInput) => {
        mutate(data, {
            onSuccess: () => {
                form.reset();
                setOpen(false);
            },
        });
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Estrutura criada com sucesso!");
        }
        if (isError) {
            toast.error("Ocorreu um erro ao criar a estrutura.");
        }
    }, [isSuccess, isError]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button type="button" className="ml-1">Criar nova opção de bar <Plus /></Button>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-[#202020] dark:text-white">
                <DialogHeader>
                    <DialogTitle>Criar nova estrutura de bar</DialogTitle>
                    <DialogDescription>
                        Preencha os detalhes abaixo para adicionar uma nova opção de bar.
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