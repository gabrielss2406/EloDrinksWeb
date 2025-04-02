import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Customer } from "@/schemas/Customers";

interface FormDeleteCustomerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    customer: Customer;
}

export const FormDeleteCustomer: React.FC<FormDeleteCustomerProps> = ({ open, setOpen, customer }) => {

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
                    <Button type="submit" className="bg-red-500">Excluir</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};