export default function LabeledInput({
    label, 
    icon, 
    type, 
    value, 
    change
} : {
    label?: string, 
    icon?: string, 
    type?: string, 
    value?: any,
    change?: (e: any) => void
}) {
    return <label className="flex flex-col gap-2 mb-3 text-gray-400 cursor-pointer">
        <span className="text-xs">
            { label }
        </span>

        <section
            className="px-2 text-sm py-1.5 flex items-center gap-3 rounded-sm focus:outline-none focus:ring-0 bg-transparent border border-gray-400 text-white focus:text-indigo-500 focus:border-indigo-500 transition-all"
        >
            {
                icon && <span className="material-symbols-outlined">
                    { icon }
                </span>
            }

            <input 
                type={ type || "text" }
                value={ value }
                className="bg-transparent focus:outline-none focus:ring-0 flex-1"
                onChange={ e => change && change(e.target.value)}
            />
        </section>
    </label>
}