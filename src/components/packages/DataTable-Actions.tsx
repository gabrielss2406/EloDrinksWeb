'use client'

import { useState } from "react"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Package } from "@/schemas/Packages"
import { FormDeletePackage } from "./Form-deletePackage"
import { FormEditPackage } from "./Form-editPackage"

export function PackageActions({ pack }: { pack: Package }) {
    const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
    const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);

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
                    <DropdownMenuLabel>Ações em {pack.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.preventDefault();
                            setTimeout(() => setIsDialogEditOpen(true), 100);
                        }}
                        className="cursor-pointer"
                    >
                        Editar
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem>Adicionar a pacote</DropdownMenuItem> */}
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.preventDefault();
                            setTimeout(() => setIsDialogDeleteOpen(true), 100);
                        }}
                        className="text-red-500 cursor-pointer"
                    >
                        Excluir
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <FormEditPackage open={isDialogEditOpen} setOpen={setIsDialogEditOpen} pack={pack} />
            {/* <FormAddProductPackage open={isDialogEditOpen} setOpen={setIsDialogEditOpen} /> */}
            <FormDeletePackage open={isDialogDeleteOpen} setOpen={setIsDialogDeleteOpen} pack={pack} />

        </>
    );
}