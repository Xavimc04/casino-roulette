import { Session } from "../auth/types";

interface Bet {
    index: String, 
    value: Number
}

export interface BetProps {
    id: number, 
    status: String
}

export interface RouletteState {
    joined: boolean, 
    users: Session[], 
    history: number[], 
    bet: Bet[],
    betAmount: number, 
    betId: number, 
    betStatus: String, 
    betResult: number | boolean
}

export interface RouletteContextProps {
    state: RouletteState, 
    dispatch: Function
}
