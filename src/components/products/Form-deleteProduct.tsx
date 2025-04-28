import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/schemas/Products";
import { useDeleteProduct } from "@/hooks/useProduts";
import { useEffect } from "react";
import { toast } from "sonner";

interface FormDeleteProductProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    product: Product;
}

export const FormDeleteProduct: React.FC<FormDeleteProductProps> = ({ open, setOpen, product }) => {

    const { mutate, isSuccess, isError, isPending } = useDeleteProduct();

    const handleDelete = async () => {
        try {
            mutate(product.id);
            setOpen(false);
        } catch (error) {
            console.error("Failed to delete product:", error);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Estrutura excluída com sucesso!");
        }
        if (isError) {
            toast.error("Ocorreu um erro ao excluir a estrutura.");
        }
    }, [isSuccess, isError]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-white dark:bg-[#202020] dark:text-white">
                <DialogHeader>
                    <DialogTitle>Tem certeza que deseja excluir {product.name}?</DialogTitle>
                    <DialogDescription>
                        Esta ação não pode ser desfeita. Isso removerá permanentemente {product.name}.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="submit" variant={"outline"} onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button
                        type="submit"
                        className="bg-red-500"
                        disabled={isPending}
                        onClick={() => {
                            if (window.confirm("Você tem certeza que deseja excluir?")) {
                                handleDelete();
                            }
                        }}
                    >
                        Excluir
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};