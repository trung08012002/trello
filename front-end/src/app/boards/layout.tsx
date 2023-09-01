import Navbar from "@/components/appbar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>
        <Navbar />
        <section>
            {children}
        </section>
    </>

}