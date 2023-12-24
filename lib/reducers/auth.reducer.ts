import { Login, Register } from "@/types/auth/types";

interface AuthState extends Login, Register {};

type AuthAction =
    | { type: 'SET_EMAIL'; payload: string }
    | { type: 'SET_PASSWORD'; payload: string }
    | { type: 'SET_PASSWORD_CONFIRMATION'; payload: string }
    | { type: 'SET_NAME'; payload: string };

export default function reducer(
    state: AuthState,
    action: AuthAction
): AuthState {
    const { type, payload } = action;

    switch (type) {
        case 'SET_EMAIL':
            return {
                ...state,
                email: payload
            };
        case 'SET_PASSWORD':
            return {
                ...state,
                password: payload
            };
        case 'SET_PASSWORD_CONFIRMATION':
            return {
                ...state,
                password_confirmation: payload
            };
        case 'SET_NAME':
            return {
                ...state,
                name: payload
            };
        default:
            return state;
    }
}
