'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import logo from '@/assets/images/logo-white.svg';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Grid, FileText, Users, Menu, LogOut } from 'lucide-react';
import Link from 'next/link';
import { SidebarProductsRoutes, SidebarRoutes } from './SidebarRoutes';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Sidebar: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();

    const handleLogout = () => {
        if (window.confirm('Tem certeza que deseja sair?')) {
            Cookies.remove('elodrinks_token');
            router.push('/login');
        }
    };

    return (
        <div className="sm:pr-64">
            <div className="sm:flex sm:flex-col sm:w-64 sm:h-full sm:bg-[#101820] sm:text-white fixed">
                {/* MOBILE SIDEBAR */}
                <div className="sm:hidden">
                    <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                        <SheetTrigger asChild>
                            <button aria-label="Abrir menu lateral" className="sm:hidden p-4">
                                <Menu className="w-6 h-6 transition-transform duration-200 hover:scale-110" />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-5 bg-[#101820] dark:bg-[#0C0C0C] text-white">
                            <SheetHeader className="items-center">
                                <SheetTitle className="text-xl font-bold mb-6">
                                    <Image src={logo} alt="Elo Drinks Eventos" />
                                </SheetTitle>
                            </SheetHeader>
                            <nav>
                                <div className="flex flex-col items-center justify-between w-full gap-3">
                                    <Link href="/" onClick={() => setIsSidebarOpen(false)}>Dashboard</Link>
                                    <Link href="/orcamentos" onClick={() => setIsSidebarOpen(false)}>Orçamentos</Link>
                                    <Link href="/produtos" onClick={() => setIsSidebarOpen(false)}>Produtos</Link>
                                    <Link href="/produtos/estrutura" onClick={() => setIsSidebarOpen(false)}>Estrutura</Link>
                                    <Link href="/produtos/pacotes" onClick={() => setIsSidebarOpen(false)}>Pacotes</Link>
                                    <Link href="/produtos/promocoes" onClick={() => setIsSidebarOpen(false)}>Promoções</Link>
                                    <Link href="/clientes" onClick={() => setIsSidebarOpen(false)}>Clientes</Link>
                                    <button
                                        onClick={handleLogout}
                                        className="mt-4 flex items-center gap-2 px-4 py-2 w-full justify-center bg-white text-black dark:bg-[#202020] dark:text-white rounded-lg hover:bg-slate-300 transition-all"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        Sair
                                    </button>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* DESKTOP SIDEBAR */}
                <div className="hidden sm:flex flex-col items-center p-5 h-screen overflow-y-auto dark:bg-[#0C0C0C]">
                    <Image src={logo} alt="Elo Drinks Eventos" />
                    <nav>
                        <div className="flex flex-col items-start justify-between w-full gap-3 mt-8">
                            <SidebarRoutes pageName="Painel" routeName="/" icon={Grid} />
                            <SidebarRoutes pageName="Orçamentos" routeName="/orcamentos" icon={FileText} />
                            <SidebarProductsRoutes />
                            <SidebarRoutes pageName="Clientes" routeName="/clientes" icon={Users} />
                            <div className="w-full">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 w-full px-8 py-2 rounded-lg 
                                    text-base font-medium transition-all bg-white dark:bg-[#202020] hover:bg-slate-300
                                    text-black dark:text-white"
                                >
                                    <LogOut className="w-6 h-6" />
                                    Sair
                                </button>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
