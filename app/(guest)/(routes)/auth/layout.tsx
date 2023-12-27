export default function AuthLayout({
    children
} : {
    children: React.ReactNode
}) {
    return <main
        className="flex-1 flex items-center justify-center flex-col gap-3 text-white"
    >
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_10%,transparent_100%)]">
        
        </div>

        { children }
    </main>
}