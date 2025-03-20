import React from 'react';
import ThemeToggle from './ThemeToogle';

interface HeaderProps {
    name: string;
}

const Header: React.FC<HeaderProps> = ({ name }) => {
    return (
        <div className='flex flex-row justify-between p-6'>
            <header className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold">{name}</h1>
                </div>
            </header>
            <div>
                <ThemeToggle />
            </div>
        </div>
    );
};

export default Header;