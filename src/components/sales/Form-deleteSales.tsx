import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { toast } from "sonner";
import { Sales } from "@/schemas/Sales";
import { useDeleteSales } from "@/hooks/useSales";

interface FormDeleteSalesProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    sales: Sales;
}

export const FormDeleteSales: React.FC<FormDeleteSalesProps> = ({ open, setOpen, sales }) => {

    const { mutate, isSuccess, isError, isPending } = useDeleteSales();

    const handleDelete = async () => {
        try {
            mutate(sales.id);
            setOpen(false);
        } catch (error) {
            console.error("Failed to delete sales:", error);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Produto excluído com sucesso!");
        }
        if (isError) {
            toast.error("Ocorreu um erro ao excluir o produto.");
        }
    }, [isSuccess, isError]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-white dark:bg-[#202020] dark:text-white">
                <DialogHeader>
                    <DialogTitle>Tem certeza que deseja excluir {sales.name}?</DialogTitle>
                    <DialogDescription>
                        Esta ação não pode ser desfeita. Isso removerá permanentemente {sales.name}.
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