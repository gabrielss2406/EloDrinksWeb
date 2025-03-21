import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/schemas/Products";

interface FormEditProductProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    product: Product;
}

export const FormDeleteProduct: React.FC<FormEditProductProps> = ({ open, setOpen, product }) => {

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>Tem certeza que deseja excluir {product.name}?</DialogTitle>
                    <DialogDescription>
                        Esta ação não pode ser desfeita. Isso removerá permanentemente {product.name}.
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