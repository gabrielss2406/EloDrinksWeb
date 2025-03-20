"use client"

import React, { useState } from 'react';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToogle';

interface SidebarRoutesProps {
    pageName: string;
    routeName: string;
}

const Sidebar: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="sm:flex sm:flex-col sm:w-64 sm:h-full sm:bg-black sm:text-white">
            <div className="sm:hidden">
                <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                    <SheetTrigger asChild>
                        <button className="sm:hidden">
                            <Menu className="w-6 h-6" />
                        </button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-5 bg-black text-white">
                        <SheetHeader>
                            <SheetTitle className="text-xl font-bold mb-6 text-center">ELO DRINKS</SheetTitle>
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
            <div className="hidden sm:block p-5 h-screen">
                <div className="text-xl font-bold mb-6 text-center">ELO DRINKS</div>
                <ThemeToggle />
                <nav>
                    <div className="flex flex-col items-center justify-between w-full gap-3">
                        <SidebarRoutes pageName={'Painel'} routeName={'/'} />
                        <SidebarRoutes pageName={'Receita'} routeName={'/receita'} />
                        <SidebarRoutes pageName={'Orçamentos'} routeName={'/orcamentos'} />
                        <SidebarRoutes pageName={'Produtos'} routeName={'/produtos'} />
                        <SidebarRoutes pageName={'Clientes'} routeName={'/clientes'} />
                    </div>
                </nav>
            </div>
        </div>

    );
};

const SidebarRoutes: React.FC<SidebarRoutesProps> = ({ pageName, routeName }) => {
    const pathname = usePathname()

    return (
        <Link href={routeName}
            className={`
                hover:text-[#cac7c7]
             ${pathname === routeName ? 'text-yellow-500' : ''}`}
        >
            {pageName}
        </Link>
    );
};

export default Sidebar;