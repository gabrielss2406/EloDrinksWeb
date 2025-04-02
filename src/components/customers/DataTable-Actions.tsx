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
import { Customer } from "@/schemas/Customers"
import { FormEditCustomer } from "./Form-editCustomer"
import { FormDeleteCustomer } from "./Form-deleteCustomer"

export function CustomerActions({ customer }: { customer: Customer }) {
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
                    <DropdownMenuLabel>Ações em {customer.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.preventDefault();
                            setTimeout(() => setIsDialogEditOpen(true), 100);
                        }}
                        className="cursor-pointer"
                    >
                        Vizualizar / Editar
                    </DropdownMenuItem>
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

            <FormEditCustomer open={isDialogEditOpen} setOpen={setIsDialogEditOpen} customer={customer} />
            <FormDeleteCustomer open={isDialogDeleteOpen} setOpen={setIsDialogDeleteOpen} customer={customer} />

        </>
    );
}