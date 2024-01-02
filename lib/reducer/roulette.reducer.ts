export function reducer(state: any, dispatch: {
    type: string, 
    payload: any
}) {
    const { type, payload } = dispatch

    switch(type) {
        case "SET_JOINED": 
            return {
                ...state, 
                joined: true, 
                users: payload
            }
        case "SET_USERS": 
            return {
                ...state, 
                users: payload
            }
        default: 
            return state
    }
}