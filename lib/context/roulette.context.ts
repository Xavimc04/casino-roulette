import { RouletteContextProps } from "@/types/casino/types";
import { createContext } from "react";

export const defaultState = {
    joined: false,
    users: [],
    history: [], 
    bet: [],
    betAmount: 0.5, 
    betId: 0, 
    betStatus: "Pending", 
    betResult: false
}

export const RouletteContext = createContext<RouletteContextProps>({
    state: defaultState, 
    dispatch: () => {}
})