'use client'

import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Structure } from "@/schemas/Structures"

export function StructureActions({ structure }: { structure: Structure }) {
    // const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
    // const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white dark:bg-[#202020] dark:text-white">
                    <DropdownMenuLabel>Ações em {structure.options}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {/* <DropdownMenuItem
                        onClick={(e) => {
                            e.preventDefault();
                            setTimeout(() => setIsDialogEditOpen(true), 100);
                        }}
                        className="cursor-pointer"
                    >
                        Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem>Adicionar a pacote</DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.preventDefault();
                            setTimeout(() => setIsDialogDeleteOpen(true), 100);
                        }}
                        className="text-red-500 cursor-pointer"
                    >
                        Excluir
                    </DropdownMenuItem> */}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* <FormEditProduct open={isDialogEditOpen} setOpen={setIsDialogEditOpen} product={product} />
            <FormDeleteProduct open={isDialogDeleteOpen} setOpen={setIsDialogDeleteOpen} product={product} /> */}

        </>
    );
}