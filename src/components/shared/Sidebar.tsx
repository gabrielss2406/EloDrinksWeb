"use client"

import React, { useState, ElementType } from 'react';
import Image from 'next/image';
import logo from '@/assets/images/logo-white.svg'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Grid, FileText, Package, Users, Menu } from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation'

interface SidebarRoutesProps {
    pageName: string;
    routeName: string;
    icon?: ElementType;
}

const Sidebar: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className='sm:pr-64'>
            <div className="sm:flex sm:flex-col sm:w-64 sm:h-full sm:bg-[#101820] sm:text-white fixed">
                <div className="sm:hidden">
                    <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                        <SheetTrigger asChild>
                            <button className="sm:hidden">
                                <Menu className="w-6 h-6" />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-5 bg-[#101820] dark:bg-[#0C0C0C] text-white">
                            <SheetHeader className='items-center'>
                                <SheetTitle className="text-xl font-bold mb-6">
                                    <Image src={logo} alt="Elo Drinks Eventos" />
                                </SheetTitle>
                            </SheetHeader>
                            <nav>
                                <div className="flex flex-col items-center justify-between w-full gap-3">
                                    <Link href={''}>Dashboard</Link>
                                    <Link href={''}>Revenue</Link>
                                    <Link href={''}>Orders</Link>
                                    <Link href={''}>Products</Link>
                                    <Link href={''}>Customers</Link>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
                <div className="hidden sm:flex flex-col items-center p-5 h-screen overflow-y-auto dark:bg-[#0C0C0C]">
                    <Image src={logo} alt="Elo Drinks Eventos" />
                    <nav>
                        <div className="flex flex-col items-start justify-between w-full gap-3 mt-8">
                            <SidebarRoutes pageName={'Painel'} routeName={'/'} icon={Grid} />
                            <SidebarRoutes pageName={'Orçamentos'} routeName={'/orcamentos'} icon={FileText} />
                            <SidebarRoutes pageName={'Produtos'} routeName={'/produtos'} icon={Package} />
                            <SidebarRoutes pageName={'Clientes'} routeName={'/clientes'} icon={Users} />
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};

const SidebarRoutes: React.FC<SidebarRoutesProps> = ({ pageName, routeName, icon: Icon }) => {
    const pathname = usePathname();

    return (
        <Link
            href={routeName}
            className={`
                flex items-center gap-3 w-full px-8 py-2 rounded-lg 
                text-base font-medium transition-all bg-white dark:bg-[#202020] hover:bg-slate-300
                ${pathname === routeName ? 'text-yellow-500' : 'text-black dark:text-white'}
            `}
        >
            {Icon && <Icon className="w-6 h-6" />}
            {pageName}
        </Link>
    );
};

export default Sidebar;