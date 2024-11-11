import Navbar from "@/components/common/navbar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="">
            <div className="mx-auto w-1/2"> <Navbar /></div>
            {children}
        </main>

    );
}
