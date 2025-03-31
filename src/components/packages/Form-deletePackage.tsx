import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Package } from "@/schemas/Packages";

interface FormDeletePackageProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    pack: Package;
}

export const FormDeletePackage: React.FC<FormDeletePackageProps> = ({ open, setOpen, pack }) => {

    const handleDelete = () => {
        console.log("Dados enviados:", pack.id);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-white dark:bg-[#202020] dark:text-white">
                <DialogHeader>
                    <DialogTitle>Tem certeza que deseja excluir {pack.name}?</DialogTitle>
                    <DialogDescription>
                        Esta ação não pode ser desfeita. Isso removerá permanentemente {pack.name}.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="submit" variant={"outline"} onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button type="submit" className="bg-red-500" onClick={handleDelete}>Excluir</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};