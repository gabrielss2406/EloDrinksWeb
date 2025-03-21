import { useEffect, useState } from "react";

export function useTheme() {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;

            setTheme(storedTheme || (prefersDark ? "dark" : "light"));
            setIsHydrated(true);
        }
    }, []);

    useEffect(() => {
        if (isHydrated) {
            if (theme === "dark") {
                document.documentElement.classList.add("dark");
                localStorage.setItem("theme", "dark");
            } else {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("theme", "light");
            }
        }
    }, [theme, isHydrated]);

    return { theme, toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark") };
}
