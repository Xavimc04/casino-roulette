import { createContext } from "react";

export const defaultState = {
    state: null, 
    dispatch: () => {}
}

interface Context {
    state: any, 
    dispatch: (dispatch: {
        type: string, 
        payload: any
    }) => void
}

export const RouletteContext = createContext<Context>(defaultState)