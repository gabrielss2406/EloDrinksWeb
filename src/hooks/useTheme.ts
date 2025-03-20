import { useEffect, useState } from "react";

export function useTheme() {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        const storedTheme = localStorage.getItem("theme") as "light" | "dark";
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return storedTheme || (prefersDark ? "dark" : "light");
    });

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [theme]);

    return { theme, toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark") };
}
