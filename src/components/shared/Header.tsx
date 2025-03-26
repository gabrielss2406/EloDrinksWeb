import React from 'react';
import ThemeToggle from './ThemeToogle';
import { Separator } from '@/components/ui/separator';

interface HeaderProps {
    name: string;
}

const Header: React.FC<HeaderProps> = ({ name }) => {
    return (
        <div className='p-6'>
            <div className='flex flex-row justify-between'>
                <header className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold">{name}</h1>
                    </div>
                </header>
                <div>
                    <ThemeToggle />
                </div>
            </div>
            <Separator orientation='horizontal' className='bg-gray-300 mt-6 dark:bg-[#202020]' />
        </div>
    );
};

export default Header;