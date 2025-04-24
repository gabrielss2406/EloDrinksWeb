import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Package } from "@/schemas/Packages";
import { useDeletePackage } from "@/hooks/usePackages";
import { useEffect } from "react";
import { toast } from "sonner";

interface FormDeletePackageProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    pack: Package;
}

export const FormDeletePackage: React.FC<FormDeletePackageProps> = ({ open, setOpen, pack }) => {
    const { mutate, isSuccess, isError, isPending } = useDeletePackage();

    const handleDelete = async () => {
        try {
            mutate(pack.id);
            setOpen(false);
        } catch (error) {
            console.error("Failed to delete structure:", error);
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
                    <DialogTitle>Tem certeza que deseja excluir {pack.name}?</DialogTitle>
                    <DialogDescription>
                        Esta ação não pode ser desfeita. Isso removerá permanentemente {pack.name}.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="submit" variant={"outline"} onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button type="submit" className="bg-red-500" onClick={handleDelete} disabled={isPending}>Excluir</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};