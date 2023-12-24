'use client'

import { useReducer, useState } from "react";
import reducer from "@/lib/reducers/auth.reducer"; 
import { registryValidation } from '@/services/auth/register.service'
import LabeledInput from "@/components/labeled-input";

export default function Page() {
    const [state, dispatch] = useReducer(reducer, {
        name: "", 
        email: "",
        password: "",
        password_confirmation: ""
    });

    const [error, handleError] = useState<string>(''); 

    const handleSubmit = () => {
        const {
            isValid, 
            message
        } = registryValidation(state);

        if(!isValid) handleError(message)
    }

    return <main className="w-[350px] flex flex-col gap-2">
        <h2 className="text-4xl text-indigo-500 font-extrabold">Eurovegas</h2>

        <small className="mb-3">
            Enjoy the best online casino games.
        </small>

        {
            error && <small className="text-xs text-red-500 mb-3">
                * { error }
            </small>
        }

        <LabeledInput
            label="Name"
            icon="person"
            type="text"
            value={ state.name }
            change={(value: string) => dispatch({
                type: "SET_NAME", 
                payload: value
            })}
        />

        <LabeledInput 
            label="Email"
            icon="mail"
            type="email"
            value={ state.email }
            change={(value: string) => dispatch({
                type: "SET_EMAIL", 
                payload: value
            })}
        />

        <LabeledInput
            label="Password"
            icon="key"
            type="password"
            value={ state.password }
            change={(value: string) => dispatch({
                type: "SET_PASSWORD", 
                payload: value
            })}
        /> 

        <LabeledInput
            label="Confirm password"
            icon="key"
            type="password"
            value={ state.password_confirmation }
            change={(value: string) => dispatch({
                type: "SET_PASSWORD_CONFIRMATION", 
                payload: value
            })}
        />

        <small
            className="text-xs text-gray-400 mb-3 text-end"
        >
            Already have an account? <a href="/auth/login" className="text-indigo-500">Login</a>
        </small>

        <button
            className="bg-indigo-500 text-white text-sm py-2 rounded-sm focus:outline-none focus:ring-0 transition-all hover:bg-indigo-600"
            onClick={() => handleSubmit()}
        >
            Complete register
        </button>
    </main>
}