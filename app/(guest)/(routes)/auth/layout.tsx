export default function AuthLayout({
    children
} : {
    children: React.ReactNode
}) {
    return <main
        className="flex-1 flex items-center justify-center flex-col gap-3 text-white"
    >
        { children }
    </main>
}