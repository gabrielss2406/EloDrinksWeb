import { useEffect, useState } from "react";

export function useTheme() {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        const prefersDark = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
        const storedTheme = typeof window !== "undefined" ? (localStorage.getItem("theme") as "light" | "dark") : null;
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
