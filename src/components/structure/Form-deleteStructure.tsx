import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Structure } from "@/schemas/Structures";

interface FormDeleteStructureProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    structure: Structure;
}

export const FormDeleteStructure: React.FC<FormDeleteStructureProps> = ({ open, setOpen, structure }) => {

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-white dark:bg-[#202020] dark:text-white">
                <DialogHeader>
                    <DialogTitle>Tem certeza que deseja excluir {structure.options}?</DialogTitle>
                    <DialogDescription>
                        Esta ação não pode ser desfeita. Isso removerá permanentemente {structure.options}.
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