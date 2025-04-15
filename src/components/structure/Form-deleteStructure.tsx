import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Structure } from "@/schemas/Structures";
import { useDeleteStructure } from "@/hooks/useStructures";
import { useEffect } from "react";
import { toast } from "sonner";

interface FormDeleteStructureProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    structure: Structure;
}

export const FormDeleteStructure: React.FC<FormDeleteStructureProps> = ({ open, setOpen, structure }) => {
    const { mutate, isSuccess, isError, isPending } = useDeleteStructure();

    const handleDelete = async () => {
        try {
            mutate(structure.id);
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
                    <DialogTitle>Tem certeza que deseja excluir {structure.name}?</DialogTitle>
                    <DialogDescription>
                        Esta ação não pode ser desfeita. Isso removerá permanentemente {structure.name}.
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