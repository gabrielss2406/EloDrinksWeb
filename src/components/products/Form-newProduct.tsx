import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { ProductInput, productInputSchema } from "@/schemas/Products";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useCreateProduct, useProductsCategories } from "@/hooks/useProduts";
import { toast } from "sonner";
import Loading from "../shared/Loading";

export const FormNewProduct: React.FC = () => {
    const [open, setOpen] = useState(false);

    const { data: categories = [], isLoading: isLoadingCategories, isError: isErrorCategories } = useProductsCategories();
    const { mutate: createProduct, isSuccess: isProductCreated, isError: isProductCreationError, isPending: isCreatingProduct } = useCreateProduct();

    const form = useForm<ProductInput>({
        resolver: zodResolver(productInputSchema),
        defaultValues: {
            name: "",
            price: 0,
            category: "",
            img_file: undefined,
        },
    });

    const onSubmit = (data: ProductInput) => {
        createProduct(data, {
            onSuccess: () => {
                form.reset();
                setOpen(false);
            },
        });
    };

    useEffect(() => {
        if (isProductCreated) {
            toast.success("Produto criado com sucesso!");
        }
        if (isProductCreationError) {
            toast.error("Ocorreu um erro ao criar o produto.");
        }
        if (isErrorCategories) {
            toast.error("Ocorreu um erro ao carregar as categorias.");
        }
    }, [isProductCreated, isProductCreationError, isErrorCategories]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button type="button" className="ml-1">Criar novo produto <Plus /></Button>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-[#202020] dark:text-white">
                <DialogHeader>
                    <DialogTitle>Criar novo produto</DialogTitle>
                    <DialogDescription>
                        Preencha os detalhes abaixo para adicionar um novo produto.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Nome do Produto</FormLabel>
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
                            name="category"
                            render={({ field, fieldState }) => {
                                const isOther = field.value && !categories.includes(field.value) && field.value !== "Outros";
                                return (
                                    <FormItem>
                                        <FormLabel>Categoria do Produto</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                {isLoadingCategories ? (
                                                    <Loading />
                                                ) : (
                                                    <>
                                                        <select
                                                            value={categories.includes(field.value) ? field.value : (isOther ? "Outros" : "")}
                                                            onChange={(e) => {
                                                                const value = e.target.value;
                                                                if (value !== "Outros") {
                                                                    field.onChange(value);
                                                                } else {
                                                                    field.onChange("");
                                                                }
                                                            }}
                                                            className={`bg-gray-200 w-full p-2 rounded-md dark:bg-[#252525] border border-input ${fieldState.invalid ? "border-red-500" : "border-gray-300"
                                                                }`}
                                                        >
                                                            <option value="Outros">Outros</option>
                                                            {categories.map((category) => (
                                                                <option key={category} value={category}>
                                                                    {category}
                                                                </option>
                                                            ))}
                                                        </select>

                                                        {(field.value === "" || isOther) && (
                                                            <Input
                                                                placeholder="Digite uma nova categoria"
                                                                className="mt-2 bg-gray-200"
                                                                value={field.value}
                                                                onChange={(e) => field.onChange(e.target.value)}
                                                            />
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                );
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="img_file"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Imagem do Produto</FormLabel>
                                    <FormControl>
                                        <div className="space-y-2">
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    field.onChange(file);
                                                }}
                                                className={`bg-gray-200 file:${fieldState.invalid ? 'border-red-500' : ''} file:text-black dark:file:text-white`}
                                            />
                                            {field.value && typeof field.value === "object" && (
                                                <Image
                                                    src={URL.createObjectURL(field.value)}
                                                    width={152}
                                                    height={152}
                                                    className="object-cover border rounded"
                                                    alt={"Image preview"}
                                                />
                                            )}
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => { setOpen(false); form.reset() }}>
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={isCreatingProduct}>Criar</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};