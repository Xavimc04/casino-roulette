'use client'

import Navigator from "@/components/navigator"
import { SessionContext } from '@/lib/context/session.context'
import { useEffect, useState } from 'react'
import { Session } from '@/types/auth/types'
import { getUser } from '@/services/user.service'
import Spinner from '@/components/spinner'
import Sidebar from "@/components/sidebar"

export default function AuthorizedLayout({
    children
} : {
    children: React.ReactNode
}) {
    const [session, setSession] = useState<Session | boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    const fetchSession = async () => {
        const user = await getUser();

        if (user) {
            setSession(user)
        }

        setLoading(false)
    }

    useEffect(() => {
        fetchSession()   
    }, [])

    if (loading) {
        return <Spinner />
    }

    return <main
        className="flex flex-col h-screen items-start p-4 gap-4"
    >
        <SessionContext.Provider
            value={{
                session,
                setSession
            }}
        > 
            <Navigator />

            <div className="flex-1 flex text-white w-full gap-5">
                <Sidebar />

                { children }
            </div>
        </SessionContext.Provider>
    </main>
}