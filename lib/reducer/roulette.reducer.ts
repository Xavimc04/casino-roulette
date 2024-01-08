import { Session } from "@/types/auth/types"
import { BetProps } from "@/types/casino/types"

export function reducer(state: any, dispatch: {
    type: string, 
    payload: any
}) {
    const { type, payload } = dispatch

    switch(type) {
        case "SET_JOINED":
            const {
                users, 
                betId
            } : {
                users: Session[], 
                betId: number
            } = payload
        
            return {
                ...state, 
                joined: true, 
                users: users, 
                betId: betId
            }
        case "SET_USERS": 
            return {
                ...state, 
                users: payload
            }
        case "ADD_HISTORY": 
            return {
                ...state, 
                history: state.history ? [...state.history, payload] : [payload], 
                bet: []
            }
        case "RESET_BET": 
            return {
                ...state, 
                bet: []
            }
        case "ADD_BET": 
            if(state.betStatus != 'Waiting') return state

            const {
                index, 
                value
            } = payload; 

            if(!index || !value) return state

            const converted = Number(value)

            if(!state.bet) return {
                ...state, 
                bet: {
                    [index]: converted
                }
            }

            if(state.bet[index]) {
                return {
                    ...state, 
                    bet: {
                        ...state.bet, 
                        [index]: state.bet[index] + converted
                    }
                }
            }

            return {
                ...state, 
                bet: {
                    ...state.bet, 
                    [index]: converted
                }
            }
        case "SET_BET_AMOUNT":
            return {
                ...state, 
                betAmount: payload
            }
        case "SET_BET_ID": 
            const {
                id, 
                status
            } : BetProps = payload

            return {
                ...state, 
                betId: id, 
                betStatus: status,
                bet: [], 
                betResult: false
            }
        case "FINISH_BET": 
            return {
                ...state, 
                bet: [], 
                betStatus: "Finished", 
                betResult: payload, 
                history: state.history ? [...state.history, payload] : [payload]
            }
        default: 
            return state
    }
}