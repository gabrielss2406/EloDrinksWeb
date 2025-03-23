'use client'

import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800">
            {theme === "dark" ? <Moon className="w-6 h-6 text-white" fill="#FFFFFF80" /> : <Sun className="w-6 h-6 text-yellow-400" fill="yellow" />}
        </button>
    );
}
