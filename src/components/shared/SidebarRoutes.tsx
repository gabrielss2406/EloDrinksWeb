import { ChevronDown, ChevronUp, Package } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { ElementType, useEffect, useState } from "react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface SidebarRoutesProps {
    pageName: string;
    routeName: string;
    icon?: ElementType;
}

export const SidebarRoutes: React.FC<SidebarRoutesProps> = ({ pageName, routeName, icon: Icon }) => {
    const pathname = usePathname();

    return (
        <Link
            href={routeName}
            className={`
                flex items-center gap-3 w-full px-8 py-2 rounded-lg 
                text-base font-medium transition-all bg-white dark:bg-[#202020] hover:bg-slate-300
                ${pathname === routeName ? 'text-[#ff7f00]' : 'text-black dark:text-white'}
            `}
        >
            {Icon && <Icon className="w-6 h-6" />}
            {pageName}
        </Link>
    );
};


export const SidebarProductsRoutes: React.FC = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (pathname === '/produtos' || pathname === '/produtos/estrutura' || pathname === '/produtos/pacotes') setIsOpen(true);
        else setIsOpen(false);
    }, [pathname]);

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className={`
                rounded-lg
                flex flex-col items-start w-full pt-2
                text-base font-medium transition-all 
                bg-white dark:bg-[#202020] hover:bg-slate-300
                ${pathname === '/produtos' || pathname === '/produtos/estrutura' || pathname === '/produtos/pacotes'
                    ? 'text-[#ff7f00]'
                    : 'text-black dark:text-white'}
        `}>
            <CollapsibleTrigger className="flex flex-row gap-3 pb-2 pl-8">
                <Package className="w-6 h-6" />
                Produtos
                {isOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="w-full">
                <SidebarRoutes pageName={'Produtos'} routeName={'/produtos'} />
                <SidebarRoutes pageName={'Estrutura'} routeName={'/produtos/estrutura'} />
                <SidebarRoutes pageName={'Pacotes'} routeName={'/produtos/pacotes'} />
            </CollapsibleContent>
        </Collapsible>
    );
};