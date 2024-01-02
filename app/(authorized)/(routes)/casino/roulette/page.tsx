'use client'

import Spinner from "@/components/spinner"
import { RouletteContext, defaultState } from "@/lib/context/roulette.context"
import { SessionContext } from "@/lib/context/session.context"
import { reducer } from "@/lib/reducer/roulette.reducer"
import { wsConnect } from "@/lib/websockets/connection" 
import { Session } from "@/types/auth/types"
import { useContext, useEffect, useReducer } from "react"
import { Wheel } from "react-custom-roulette"

export default function Page() {
    const { session } = useContext(SessionContext)
    const [state, dispatch] = useReducer(reducer, defaultState)
    const socket : any = wsConnect()

    useEffect(() => {
        if (typeof session != 'boolean') {
            socket.emit('join', session)

            socket.on('spin', () => console.log('spinning...'))

            socket.on('connected', (users: Session[]) => { 
                dispatch({
                    type: 'SET_JOINED',
                    payload: users
                })
            })

            socket.on('update_users', (users: Session[]) => {
                dispatch({
                    type: 'SET_USERS',
                    payload: users
                })
            })
        }
    }, [])

    return <RouletteContext.Provider
        value={{
            state,
            dispatch
        }}
    >
        <main className="flex gap-3 flex-1">  
            {
                !state.joined ? <Spinner /> : <>
                    <section className="flex-1">
                        Hola
                    </section>

                    <section className="border-slate-900 border-l px-5">
                        Chat en vivo
                    </section>
                </>
            }
        </main>
    </RouletteContext.Provider>
}