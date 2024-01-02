'use client'

import { SessionContext } from "@/lib/context/session.context"  
import { useContext } from "react"

export default function Navigator() {
    const { session } : any = useContext(SessionContext) 

    return <nav className="w-full flex items-center justify-between text-white">
        <div className="flex items-center gap-2 bg-slate-900 rounded-md px-4 py-2">
            <span
                className="material-symbols-outlined"
                style={{
                    fontSize: 18
                }}
            >
                search
            </span>

            <input
                className="bg-transparent focus:outline-none focus:ring-0 text-white w-96"
                placeholder="Search for a game"
            />
        </div>

        <section className="flex items-center gap-3">
            <div className="flex flex-col text-end select-none cursor-pointer">
                <h2 className="hover:text-indigo-500 transition-all">
                    {
                        session && session.name
                    }
                </h2>

                <small className="text-green-400">
                    {
                        session && session.balance + '€'
                    }
                </small>
            </div>

            <img 
                className="rounded-full mr-1 w-10 h-10"
                src="https://upload.wikimedia.org/wikipedia/commons/f/f5/Computer_developer.jpg"
                alt=""
            />

            <div className="pl-5 border-l border-l-slate-900">
                <button className="bg-slate-900 rounded flex items-center gap-2 py-2 px-5 select-none cursor-pointer hover:bg-green-500 hover:text-slate-950 transition-all">
                    <span className="material-symbols-outlined">
                        attach_money
                    </span>

                    Depositar
                </button>
            </div>

        </section>
    </nav>
}