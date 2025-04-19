import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Customer } from "@/schemas/Customers";
import { useDeleteCustomer } from "@/hooks/useCustomers";
import { toast } from "sonner";
import { useEffect } from "react";

interface FormDeleteCustomerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    customer: Customer;
}

export const FormDeleteCustomer: React.FC<FormDeleteCustomerProps> = ({ open, setOpen, customer }) => {
    const { mutate, isSuccess, isError, isPending } = useDeleteCustomer();

    const handleDelete = async () => {
        try {
            mutate(customer.id);
            setOpen(false);
        } catch (error) {
            console.error("Failed to delete customer:", error);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Cliente excluído com sucesso!");
        }
        if (isError) {
            toast.error("Ocorreu um erro ao excluir o cliente.");
        }
    }, [isSuccess, isError]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-white dark:bg-[#202020] dark:text-white">
                <DialogHeader>
                    <DialogTitle>Tem certeza que deseja excluir {customer.name}?</DialogTitle>
                    <DialogDescription>
                        Esta ação não pode ser desfeita. Isso removerá permanentemente {customer.name} da base de dados.
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