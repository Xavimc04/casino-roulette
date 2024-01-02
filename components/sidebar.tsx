export default function Sidebar() {
    return <aside className="bg-slate-900 text-white flex flex-col gap-3 rounded-md p-3">
        <span className="material-symbols-outlined bg-slate-950 rounded p-3 select-none cursor-pointer hover:bg-indigo-500 hover:text-slate-950 transition-all">
            home
        </span>
        
        <span className="material-symbols-outlined bg-slate-950 rounded p-3 select-none cursor-pointer hover:bg-indigo-500 hover:text-slate-950 transition-all">
            apps
        </span>

        <span className="material-symbols-outlined bg-slate-950 rounded p-3 select-none cursor-pointer hover:bg-indigo-500 hover:text-slate-950 transition-all">
            local_fire_department
        </span>

        <span className="material-symbols-outlined bg-slate-950 rounded p-3 select-none cursor-pointer hover:bg-indigo-500 hover:text-slate-950 transition-all">
            schedule
        </span>

        <span className="material-symbols-outlined bg-slate-950 rounded p-3 select-none cursor-pointer hover:bg-indigo-500 hover:text-slate-950 transition-all">
            person
        </span>
    </aside>
}