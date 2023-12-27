'use client'

import { SessionContext } from "@/lib/context/session.context"  
import { useContext } from "react"

export default function Navigator() {
    const { session } : any = useContext(SessionContext) 

    return <nav className="w-screen p-4 flex items-center justify-between">
        <span className="material-symbols-outlined">
            menu
        </span>

        <section className="flex items-center gap-3">
            <div className="flex flex-col text-end">
                <h2>
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

            <span className="material-symbols-outlined bg-slate-900 rounded p-2">
                attach_money
            </span>
        </section>
    </nav>
}