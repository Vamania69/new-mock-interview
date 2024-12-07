import Navbar from "@/components/common/navbar";
import { QueryClientProvider, useQueryClient } from "@tanstack/react-query";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="">
            {children}
        </main>

    );
}
