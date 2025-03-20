"use client";

import { ReactQueryProvider } from "@/lib/react-query";
import { Toaster } from "sonner";
import "@/assets/globals.css";
import SidebarWrapper from "@/components/ui/sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className="flex min-h-screen">
        <ReactQueryProvider>
          <SidebarWrapper />
          <div className="flex-1 bg-gray-100 dark:bg-slate-800 dark:text-white transition-colors duration-300">
            {children}
          </div>
          <Toaster richColors position="top-right" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}