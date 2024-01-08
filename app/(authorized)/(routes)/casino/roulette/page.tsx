'use client'

import LabeledInput from "@/components/labeled-input"
import Roulette from "@/components/roulette"
import Spinner from "@/components/spinner"
import { RouletteContext, defaultState } from "@/lib/context/roulette.context"
import { SessionContext } from "@/lib/context/session.context"
import { reducer } from "@/lib/reducer/roulette.reducer"
import { wsConnect } from "@/lib/websockets/connection" 
import { Session } from "@/types/auth/types"
import { BetProps } from "@/types/casino/types"
import { useContext, useEffect, useReducer } from "react"

export default function Page() {
    const { session } = useContext(SessionContext)
    const [state, dispatch] = useReducer(reducer, defaultState)
    const socket : any = wsConnect()

    useEffect(() => { 
        if (typeof session != 'boolean') {
            socket.emit('join', session)

            socket.on('connected', (users: Session[], betId: number) => { 
                dispatch({
                    type: 'SET_JOINED',
                    payload: {
                        users, betId
                    }
                })
            })

            socket.on('emit_bet', (bet: BetProps) => {  
                dispatch({
                    type: 'SET_BET_ID', 
                    payload: bet
                })
            }) 

            socket.on('spin', (betResult: number) => {  
                dispatch({
                    type: 'FINISH_BET',
                    payload: betResult
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
        <main className="flex gap-7 flex-1">  
            {
                !state.joined ? <Spinner /> : <>
                    <section className="border-slate-900 border-r flex flex-col gap-3 pr-5 w-[300px]">
                        <div className="flex-1 overflow-y-scroll">
                            <div className="mb-7">
                                <p className="text-xs flex gap-2 items-center mt-2">
                                    <span className="h-[7px] w-[7px] rounded-full bg-green-500 animate-pulse"></span>

                                    Connected
                                </p>

                                <small className="text-gray-600 text-xs">
                                    { state.users.length } users online 
                                </small> 
                            </div>

                            <LabeledInput 
                                label="Bet ID"
                                type="text"
                                value={ `${ state.betId }` }
                                disabled={ true }
                            />

                            <LabeledInput 
                                label="Status"
                                type="text"
                                value={ state.betStatus }
                                disabled={ true }
                            />

                            <LabeledInput 
                                label="Balance"
                                type="text"
                                value={ typeof session != 'boolean' && session?.balance ? session?.balance + '€' : 0 + '€' }
                                disabled={ true }
                            />

                            <LabeledInput 
                                label="Current Bet"
                                type="text"
                                value={ Object.values(state.bet).reduce((res: number, value: number) => res + value, 0) + '€' }
                                disabled={ true }
                            />

                            <label className="flex flex-col gap-2 mb-3 text-gray-400 cursor-pointer">
                                <span className="text-xs">
                                    Bet amount
                                </span>

                                <section
                                    className="px-2 text-sm py-1.5 flex items-center gap-3 rounded-sm focus:outline-none focus:ring-0 bg-transparent border border-gray-400 text-white focus:text-indigo-500 focus:border-indigo-500 transition-all"
                                >  
                                    <select value={ state.betAmount } disabled={ state.betStatus != 'Waiting' } onChange={(e) => dispatch({
                                        type: 'SET_BET_AMOUNT',
                                        payload: e.target.value
                                    })} className="bg-transparent focus:outline-none focus:ring-0 flex-1">
                                        <option value="0.5">0.5</option>
                                        <option value="1">1</option>
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="50">50</option>
                                    </select>
                                </section>
                            </label>
                        </div>

                        <button 
                            disabled={ state.betStatus != 'Waiting' }
                            className={ `bg-green-500 text-white text-sm py-2 rounded-sm focus:outline-none focus:ring-0 transition-all hover:bg-green-600 ${ state.betStatus != 'Waiting' ? 'opacity-30' : 'opacity-100' }` } 
                        >
                            Publish bet
                        </button> 

                        <button 
                            disabled={ state.betStatus != 'Waiting' }
                            className={ `bg-indigo-500 text-white text-sm py-2 rounded-sm focus:outline-none focus:ring-0 transition-all hover:bg-indigo-600 ${ state.betStatus != 'Waiting' ? 'opacity-30' : 'opacity-100' }` } 
                            onClick={() => dispatch({
                                type: 'RESET_BET',
                                payload: 0
                            })}
                        >
                            Clear bet
                        </button>
                    </section>

                    <section className="w-[1150px]">
                        <Roulette />
                    </section>

                    <section className="border-slate-900 border-l flex justify-center items-center pl-5 flex-1">
                        Live chat
                    </section>
                </>
            }
        </main>
    </RouletteContext.Provider>
}